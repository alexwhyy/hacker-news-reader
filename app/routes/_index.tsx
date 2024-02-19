import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { intlFormatDistance } from "date-fns/intlFormatDistance";
import { db } from "../db";

interface HackerNewsStory {
  by: string;
  descendants: number;
  id: number;
  kids: { [id: string]: number };
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

const ITEMS_PER_PAGE = 30;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let page: number;
  if (url.searchParams.get("p")) {
    page = parseInt(url.searchParams.get("p")!!);
  } else {
    page = 1;
  }
  const pointer: number = ITEMS_PER_PAGE * (page - 1);
  const ids: number[] = Object.values(
    (await db.child("topstories").once("value")).toJSON(),
  );
  const topStories: HackerNewsStory[] = await Promise.all(
    ids
      .slice(pointer, pointer + ITEMS_PER_PAGE)
      .map(async (id) =>
        (await db.child("item").child(id).once("value")).toJSON(),
      ),
  );
  return json(topStories);
};

export default function Component() {
  const [searchParams] = useSearchParams();
  let pageNumber: number;
  if (searchParams.get("p")) {
    pageNumber = parseInt(searchParams.get("p")!!);
  } else {
    pageNumber = 1;
  }

  const topStories = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-col space-y-4 p-5">
        {topStories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>
      <Link className="ml-20 mt-4" to={`?p=${pageNumber + 1}`}>
        More
      </Link>
      <p className="py-3 text-center text-xs">
        Hacker News belongs to Y Combinator.
      </p>
    </>
  );
}

const Story = (props) => {
  const { story } = props;
  return (
    <div key={story.id} className="flex space-x-4">
      <div className="flex w-12 shrink-0 items-center justify-center bg-gray-100 text-sm ">
        {story.score}
      </div>
      <div>
        <a href={story.url}>
          <div className="">
            {story.title}{" "}
            {story.url && (
              <span className="text-sm text-gray-600">
                ({story.url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)[1]})
              </span>
            )}
          </div>
        </a>
        <div className="text-sm text-gray-600">
          Posted by{" "}
          <Link className="hover:underline" to={`/user?id=${story.by}`}>
            {story.by}
          </Link>{" "}
          {intlFormatDistance(new Date(story.time * 1000), new Date())} |{" "}
          <Link className="hover:underline" to={`/item?id=${story.id}`}>
            {story.descendants || 0} comments
          </Link>
        </div>
      </div>
    </div>
  );
};
