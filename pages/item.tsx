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
      <div>
        <Container style={{ padding: "30px 0", borderBottom: "1px solid #eaeaea" }}>
          <h2 css={{ color: "black" }}>
            <a href={props.item.url}>{props.item.title}</a>{" "}
            {props.item.url && (
              <span css={{ fontSize: "1.5rem", fontWeight: 500, color: "gray" }}>
                ({new URL(props.item.url).hostname})
              </span>
            )}
          </h2>
          <h5>
            Posted by <UserLink name={props.item.by} /> on {moment.unix(props.item.time).format("LLLL")}
          </h5>
        </Container>
        <Container style={{ padding: "30px 0" }}>
          {props.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Container>
      </div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const item = await (
    await axios.get(
      `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${encodeURIComponent(String(context.query.id))}.json`
    )
  ).data;

  if (!item) {
    return {
      notFound: true,
    };
  }

  let comments = [];
  if (item.kids) {
    comments = await Promise.all(item.kids.map(async (id: number) => await fetchItem(id)));
  }

  return {
    props: { item, comments },
  };
};
