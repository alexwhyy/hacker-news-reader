import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import sanitizeHtml from "sanitize-html";

import { Comment } from "../components/Comment.js";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return null;
  }
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
  const item = await res.json();
  if (!item) {
    return null;
  }
  return json(item);
};

export default function Item() {
  const item = useLoaderData<typeof loader>();

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
      <p className="text-sm text-gray-500 mb-5">
        Posted by <Link to={`/user?id=${item.author}`}>{item.author}</Link> on{" "}
        {new Date(item.created_at).toLocaleString()}
      </p>
      {item.text && (
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(item.text),
          }}
        />
      )}
      <div className="pt-10">
        {item.children.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
