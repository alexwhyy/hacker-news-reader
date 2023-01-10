import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { useTheme } from "@geist-ui/react";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import moment from "moment";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

export default function User(props) {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>{props.user.id}</title>
        <meta property="og:title" content={props.user.id} />
      </Head>
      <Navbar />
      <Container>
        <header css={{ margin: "30px 0" }}>
          <h2>{props.user.id}</h2>
          <p>{props.user.karma} karma</p>
          <p>Created on {moment.unix(props.user.created).format("LLLL")}</p>
        </header>
        {props.user.about && (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.user.about) }}
            css={{ color: theme.palette.accents_5 }}
          ></div>
        )}
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user = await (
    await axios.get(
      `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${encodeURIComponent(
        String(context.query.id)
      )}.json`
    )
  ).data;
  if (!user) {
    return { notFound: true };
  }
  return {
    props: { user },
  };
};
