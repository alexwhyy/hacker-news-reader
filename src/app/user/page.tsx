import sanitizeHtml from "sanitize-html";
import dayjs from "dayjs";

export default async function User({ searchParams }) {
  let res = await fetch(
    `${process.env.HACKER_NEWS_API_ENDPOINT}/v0/user/${encodeURIComponent(
      String(searchParams.id)
    )}.json`
  );
  let user = await res.json();

  if (!user) {
    return { notFound: true };
  }

  return (
    <div className="p-4 md:p-7 lg:p-10">
      <div>
        <p className="text-lg font-medium">{user.id}</p>
        <p>{user.karma} karma</p>
        <p>Account created on {dayjs.unix(user.created).toLocaleString()}</p>
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
