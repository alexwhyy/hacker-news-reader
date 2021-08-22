import { useState, useCallback } from "react";

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Pagination, Card, Button, Tooltip, useTheme } from "@geist-ui/react";

import axios from "axios";
import moment from "moment";

import Post from "../components/Post";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ITEMS_PER_PAGE = 30;

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Prettier Hacker News</title>
        <meta property="og:title" content="Prettier Hacker News" />
      </Head>
      <Navbar />
      <div css={{ margin: "20px 0" }}>
        <Container>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
            {props.topStories.map((story) => (
              <Post key={story.id} {...story} />
            ))}
          </div>
          <div css={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
            <Pagination
              count={Math.ceil(props.ids.length / ITEMS_PER_PAGE)}
              initialPage={props.page}
              onChange={(page) => router.push(`?p=${page}`)}
            />
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  var page: number;
  if (context.query.p) {
    page = parseInt(String(context.query.p));
  } else {
    page = 1;
  }
  let URL: string = `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/` + "topstories" + ".json";
  const topStoriesIds: number[] = await (await axios.get(URL)).data;
  const pointer: number = ITEMS_PER_PAGE * (page - 1);
  const topStories: any[] = await Promise.all(
    topStoriesIds
      .slice(pointer, pointer + ITEMS_PER_PAGE)
      .map(async (id) => await (await axios.get(`${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${id}.json`)).data)
  );

  if (topStories.length === 0) {
    return { notFound: true };
  }

  return {
    props: { ids: topStoriesIds, topStories, page: page || 1 },
  };
};
