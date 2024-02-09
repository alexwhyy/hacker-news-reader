import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@vercel/remix";
import sanitizeHtml from "sanitize-html";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return undefined;
  }

  const res = await fetch(
    `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${id}.json`,
  );
  const user = await res.json();
  if (!user) {
    return undefined;
  }
  return user;
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
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(user.about),
          }}
        ></div>
      )}
    </div>
  );
}
