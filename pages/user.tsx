import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

import axios from "axios";
import moment from "moment";

import Container from "../components/Container";
import Navbar from "../components/Navbar";

export default function User(props) {
  return (
    <div>
      <Head>
        <title>{props.user.id}</title>
        <meta property="og:title" content={props.user.id} />
      </Head>
      <Navbar />
      <Container>
        <h2>{props.user.id}</h2>
        <p>{props.user.karma} karma</p>
        <p>Created on {moment.unix(props.user.created).format("LLLL")}</p>
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await (
    await axios.get(
      `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${encodeURIComponent(String(context.query.id))}.json`
    )
  ).data;

  if (!user) {
    return { notFound: true };
  }

  return {
    props: { user },
  };
};
