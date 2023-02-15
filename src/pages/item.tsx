import moment from "moment";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import Comment from "../components/Comment";
import Layout from "../components/Layout";

export default function Item(props) {
  const { item } = props;

  return (
    <>
      <Head>
        <title>{item.title}</title>
        <meta property="og:title" content={item.title} />
      </Head>
      <Layout>
        <div className="px-4 py-5 md:px-7">
          <div className="mb-1">
            <a className="text-lg hover:underline" href={item.url}>
              {item.title}
            </a>{" "}
            {item.url && (
              <span className="text-md text-gray-500">
                ({new URL(item.url).hostname})
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Posted by{" "}
            <Link href={`/user?id=${item.author}`}>{item.author}</Link> on{" "}
            {moment(item.created_at).format("LLLL")}
          </p>
          {item.text && (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(item.text),
              }}
            ></div>
          )}
          <div className="pt-10">
            {item.children.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.id) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://hn.algolia.com/api/v1/items/${context.query.id}`
  );
  const item = await res.json();

  if (!item) {
    return {
      notFound: true,
    };
  }

  return {
    props: { item },
  };
};
