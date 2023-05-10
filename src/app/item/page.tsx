import Link from "next/link";
import sanitizeHtml from "sanitize-html";

import Comment from "./comment";
import dayjs from "dayjs";
import { Metadata } from "next";

const getItem = async (id: string) => {
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  const item = await res.json();
  if (!item) {
    return undefined;
  }
  return item;
};

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const item = await getItem(searchParams.id);
  return { title: `${item.title} | Hacker News Reader` };
}

export default async function Item({ searchParams }) {
  if (!searchParams.id) {
    return {
      notFound: true,
    };
  }

  const item = await getItem(searchParams.id);
  if (!item) {
    return {
      notFound: true,
    };
  }

  return (
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
        Posted by <Link href={`/user?id=${item.author}`}>{item.author}</Link> on{" "}
        {dayjs(item.created_at).toLocaleString()}
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
  );
}
