import { Pagination, useTheme } from "@geist-ui/core";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

const ITEMS_PER_PAGE = 30;

export default function Home(props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Prettier Hacker News</title>
        <meta property="og:title" content="Prettier Hacker News" />
        <meta
          property="description"
          content="Read Hacker News in a clean, slick, and modern interface."
        />
        <meta
          property="og:description"
          content="Read Hacker News in a clean, slick, and modern interface."
        />
      </Head>
      <Navbar />
      <div style={{ margin: "20px 0" }}>
        <Container>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 10 }}>
            {props.topStories.map((story) => (
              <Post key={story.id} {...story} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
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
  let page: number;
  if (context.query.p) {
    page = parseInt(String(context.query.p));
  } else {
    page = 1;
  }
  let URL: string =
    `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/` + "topstories" + ".json";
  const topStoriesIds: number[] = await (await axios.get(URL)).data;
  const pointer: number = ITEMS_PER_PAGE * (page - 1);
  const topStories: any[] = await Promise.all(
    topStoriesIds
      .slice(pointer, pointer + ITEMS_PER_PAGE)
      .map(
        async (id) =>
          await (
            await axios.get(
              `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${id}.json`
            )
          ).data
      )
  );

  if (topStories.length === 0) {
    return { notFound: true };
  }

  return {
    props: { ids: topStoriesIds, topStories, page: page || 1 },
  };
};
