import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ITEMS_PER_PAGE = 30;

export default async function HomePage({ searchParams }) {
  let page: number;
  if (searchParams.p) {
    page = parseInt(String(searchParams.p));
  } else {
    page = 1;
  }

  let URL: string = `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/topstories.json`;
  const res = await fetch(URL);
  const topStoriesIds: number[] = await res.json();
  const pointer: number = ITEMS_PER_PAGE * (page - 1);
  const topStories: any[] = await Promise.all(
    topStoriesIds.slice(pointer, pointer + ITEMS_PER_PAGE).map(async (id) => {
      const res = await fetch(
        `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/item/${id}.json`,
        {
          cache: "no-cache"
        }
      );
      const story = await res.json();
      return story;
    })
  );

  return (
    <>
      <div className="flex flex-col space-y-4 p-5">
        {topStories.map((story) => (
          <div key={story.id} className="flex space-x-4">
            <div className="flex w-12 shrink-0 items-center justify-center bg-gray-100 dark:bg-gray-800 text-sm dark:text-white">
              {story.score}
            </div>
            <div>
              <a href={story.url}>
                <div className="dark:text-white">
                  {story.title}{" "}
                  {story.url && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({story.url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i)[1]}
                      )
                    </span>
                  )}
                </div>
              </a>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Posted by{" "}
                <Link className="hover:underline" href={`/user?id=${story.by}`}>
                  {story.by}
                </Link>{" "}
                {dayjs.unix(story.time).fromNow()} |{" "}
                <Link className="hover:underline" href={`/item?id=${story.id}`}>
                  {story.descendants || 0} comments
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link className="ml-20 mt-4 dark:text-white" href={`?p=${page + 1}`}>
        More
      </Link>
      <p className="py-3 text-center text-xs dark:text-white">
        Hacker News belongs to Y Combinator.
      </p>
    </>
  );
}
