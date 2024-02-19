import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import sanitizeHtml from "sanitize-html";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return null;
  }
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`,
  );
  const user = await res.json();
  if (!user) {
    return null;
  }
  return json(user);
};

export default function User() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="p-4 md:p-7 lg:p-10">
      <div>
        <p className="text-lg font-medium">{user.id}</p>
        <p>{user.karma} karma</p>
        <p>Account created on {new Date(user.created).toLocaleString()}</p>
      </div>
      {user.about && (
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(user.about),
          }}
        />
      )}
    </div>
  );
}
