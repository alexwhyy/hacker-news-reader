import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import { useTheme } from "@geist-ui/react";
import axios from "axios";
import moment from "moment";

import Comment from "../components/Comment";
import UserLink from "../components/UserLink";
import Container from "../components/Container";
import Navbar from "../components/Navbar";

export default function Item(props) {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>{props.item.title}</title>
        <meta property="og:title" content={props.item.title} />
      </Head>
      <Navbar />
      <Container>
        <div css={{ margin: "30px 0" }}>
          <h1 css={{ color: "black" }}>
            <a href={props.item.url}>{props.item.title}</a>{" "}
            {props.item.url && (
              <span css={{ fontSize: "1rem", fontWeight: 400, color: "gray" }}>
                ({new URL(props.item.url).hostname})
              </span>
            )}
          </h1>
          <p>
            Posted by <UserLink name={props.item.by} /> on {moment.unix(props.item.time).format("LLLL")}
          </p>
          {props.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </Container>
    </div>
  );
}

// Recursive helper fucntion for getting comments
async function fetchItem(id: number) {
  let item = await (await axios.get(`${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${id}.json`)).data;
  if (item.kids) {
    item.kids = await Promise.all(item.kids.map((id: number) => fetchItem(id)));
  }
  return item;
}

export async function getServerSideProps(context) {
  const item = await (await axios.get(`${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${context.query.id}.json`)).data;
  let comments = [];
  if (item.kids) {
    comments = await Promise.all(item.kids.map(async (id: number) => await fetchItem(id)));
  }

  return {
    props: { item, comments },
  };
}
