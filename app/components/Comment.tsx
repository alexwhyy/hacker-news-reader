import { Link } from "@remix-run/react";
import { intlFormatDistance } from "date-fns/intlFormatDistance";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";

const sanitizeOptions = {
  allowedTags: ["i", "a", "p", "code", "quote"],
  allowedAttributes: {
    a: ["href"],
  },
};

export const Comment = (props) => {
  const { comment } = props;
  const [hideSubcomments, setHideSubcomments] = useState<boolean>(false);

  return (
    <div id={String(comment.id)}>
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to={`/user?id=${comment.author}`}>{comment.author}</Link> ·{" "}
        <span>
          {intlFormatDistance(new Date(comment.created_at), new Date())}
        </span>{" "}
        ·{" "}
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
            className="commentContent dark:text-white"
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
};
