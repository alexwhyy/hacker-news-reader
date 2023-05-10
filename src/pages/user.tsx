import { GetServerSideProps } from "next";
import Head from "next/head";
import sanitizeHtml from "sanitize-html";

import Layout from "../components/Layout";
import dayjs from "dayjs";

export default function User(props) {
  return (
    <div>
      <Head>
        <title>{props.user.id}</title>
        <meta property="og:title" content={props.user.id} />
      </Head>
      <Layout>
        <div className="p-4 md:p-7 lg:p-10">
          <div>
            <div>{props.user.id}</div>
            <p>{props.user.karma} karma</p>
            <p>
              Account created on{" "}
              {dayjs.unix(props.user.created).toLocaleString()}
            </p>
          </div>
          {props.user.about && (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(props.user.about),
              }}
            ></div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let res = await fetch(
    `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${encodeURIComponent(
      String(context.query.id)
    )}.json`
  );
  let user = await res.json();

  if (!user) {
    return { notFound: true };
  }
  return {
    props: { user },
  };
};
