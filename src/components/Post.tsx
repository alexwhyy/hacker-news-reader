import dayjs from "dayjs";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface PostProps {
  id: number;
  title: string;
  by: string;
  url: string;
  deleted: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  time: number;
  text: string;
  dead: boolean;
  descendants: number;
  score: number;
  kids: PostProps[];
}

export default function Post(props: PostProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex w-12 shrink-0 items-center justify-center bg-gray-100 text-sm">
        {props.score}
      </div>
      <div>
        <a href={props.url}>
          <div>
            {props.title}{" "}
            {props.url && (
              <span className="text-sm text-gray-600">
                ({new URL(props.url).hostname})
              </span>
            )}
          </div>
        </a>
        <div className="text-sm text-gray-600">
          Posted by{" "}
          <Link className="hover:underline" href={`/user?id=${props.by}`}>
            {props.by}
          </Link>{" "}
          {dayjs.unix(props.time).fromNow()} |{" "}
          <Link className="hover:underline" href={`/item?id=${props.id}`}>
            {props.descendants || 0} comments
          </Link>
        </div>
      </div>
    </div>
  );
}
