import { useTheme } from "@geist-ui/core";
import moment from "moment";
import { useState, useCallback } from "react";
import sanitizeHtml from "sanitize-html";
import UserLink from "./UserLink";

const sanitizeOptions = {
  allowedTags: ["i", "a", "p"],
  allowedAttributes: {
    a: ["href"],
  },
};

interface CommentProps {
  id: number;
  deleted: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text: string;
  parent: number;
  kids: CommentProps[];
}

export default function Comment(props: CommentProps) {
  const theme = useTheme();
  const [kidsHidden, setKidsHidden] = useState<boolean>(false);

  const sanitizedText = sanitizeHtml(props.text, sanitizeOptions);

  const toggleKidsHidden = useCallback(() => {
    setKidsHidden((h) => !h);
  }, []);

  if (props.deleted) {
    return <h5>Deleted comment ({moment.unix(props.time).calendar()})</h5>;
  }

  return (
    <div id={String(props.id)}>
      <h6>
        <UserLink name={props.by} /> ·{" "}
        <span style={{ fontWeight: 400 }}>
          {moment.unix(props.time).calendar()}
        </span>{" "}
        ·
        <span
          onClick={toggleKidsHidden}
          style={{
            padding: 5,
            cursor: "pointer",
            borderRadius: 5,
          }}
        >
          Toggle
        </span>
      </h6>
      {!kidsHidden ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 10,
              paddingLeft: 20,
              marginTop: 10,
              borderLeft: "1px solid #eaeaea",
            }}
          >
            {props.kids?.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        </>
      ) : (
        <h5>Hidden</h5>
      )}
    </div>
  );
}
