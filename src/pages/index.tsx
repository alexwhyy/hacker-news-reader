import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import Post from "../components/Post";

const ITEMS_PER_PAGE = 30;

export default function Home(props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hacker News Reader</title>
        <meta property="og:title" content="Hacker News Reader" />
        <meta
          property="description"
          content="Yet another Hacker News clone built with Next.js and Tailwind."
        />
        <meta
          property="og:description"
          content="Yet another Hacker News clone built with Next.js and Tailwind."
        />
      </Head>
      <Layout>
        <div className="p-5 flex flex-col space-y-4">
          {props.topStories.map((story) => (
            <Post key={story.id} {...story} />
          ))}
        </div>
        <button
          className="ml-20 mt-4"
          onClick={() =>
            router.push({ href: "", query: { p: props.page + 1 } })
          }
        >
          More
        </button>
        <p className="py-3 text-center text-xs">
          Hacker News belongs to Y Combinator.
        </p>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let page: number;
  if (context.query.p) {
    page = parseInt(String(context.query.p));
  } else {
    page = 1;
  }

  let URL: string =
    `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/` + "topstories" + ".json";
  const res = await fetch(URL);
  const topStoriesIds: number[] = await res.json();
  const pointer: number = ITEMS_PER_PAGE * (page - 1);
  const topStories: any[] = await Promise.all(
    topStoriesIds.slice(pointer, pointer + ITEMS_PER_PAGE).map(async (id) => {
      const res = await fetch(
        `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${id}.json`
      );
      const story = await res.json();
      return story;
    })
  );

  if (topStories.length === 0) {
    return { notFound: true };
  }

  return {
    props: { topStories, page: page || 1 },
  };
};
