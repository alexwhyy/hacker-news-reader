"use client";

import Link from "next/link";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const sanitizeOptions = {
  allowedTags: ["i", "a", "p", "code", "quote"],
  allowedAttributes: {
    a: ["href"],
  },
};

export default function Comment(props) {
  const { comment } = props;
  const [hideSubcomments, setHideSubcomments] = useState<boolean>(false);

  return (
    <div id={String(comment.id)}>
      <div className="mb-2 text-sm text-gray-600">
        <Link href={`/user?id=${comment.author}`}>{comment.author}</Link> ·{" "}
        <span>{dayjs(comment.created_at).fromNow()}</span> ·{" "}
        <span
          className="cursor-pointer"
          onClick={() => setHideSubcomments((prev) => !prev)}
        >
          {hideSubcomments ? "[+]" : "[-]"}
        </span>
      </div>
      {!hideSubcomments ? (
        <>
          <div
            className="commentContent"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(comment.text, sanitizeOptions),
            }}
          />
          <div className="my-5 ml-10">
            {comment.children?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
