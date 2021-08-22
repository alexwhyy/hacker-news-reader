import { useTheme } from "@geist-ui/react";
import moment from "moment";
import sanitizeHtml from "sanitize-html";

import UserLink from "./UserLink";

const sanitizeOptions = {
  allowedTags: ["b", "i", "em", "strong", "a"],
  allowedAttributes: {
    a: ["href"],
  },
};

export default function Comment(props) {
  const theme = useTheme();

  if (props.deleted) {
    return <h5>Deleted comment ({moment.unix(props.time).calendar()})</h5>;
  }

  const sanitizedText = sanitizeHtml(props.text, sanitizeOptions);

  return (
    <div>
      <h6>
        <UserLink name={props.by} /> · <span css={{ fontWeight: 400 }}>{moment.unix(props.time).calendar()}</span>
      </h6>
      <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
      <div
        css={{
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
    </div>
  );
}
