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

export async function getServerSideProps(context) {
  const user = await (await axios.get(`${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${context.query.id}.json`)).data;
  return {
    props: { user },
  };
}
