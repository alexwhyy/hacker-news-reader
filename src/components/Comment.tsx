import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";

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
      <div className="text-sm text-gray-600 mb-2">
        <Link href={`/user?id=${comment.author}`}>{comment.author}</Link> ·{" "}
        <span>{moment(comment.created_at).calendar()}</span> ·{" "}
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
          <div className="ml-10 my-5">
            {comment.children?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
