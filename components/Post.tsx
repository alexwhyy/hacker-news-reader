import Link from "next/link";

import { Tooltip, useTheme } from "@geist-ui/react";
import moment from "moment";

import UserLink from "./UserLink";

export default function Post(props) {
  const theme = useTheme();

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "60px 1fr",
        alignItems: "center",
        transition: "0.3s",
        borderRadius: 5,
        "&:hover": {
          backgroundColor: theme.palette.accents_2,
        },
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          fontWeight: 600,
          borderRadius: 5,
          backgroundColor: theme.palette.accents_2,
          height: "100%",
        }}
      >
        {props.score}
      </div>
      <div css={{ padding: 10 }}>
        <section>
          <a href={props.url}>
            <div css={{ color: "black", fontWeight: 500 }}>
              {props.title}{" "}
              {props.url && <span css={{ color: "gray", fontWeight: 400 }}>({new URL(props.url).hostname})</span>}
            </div>
          </a>
        </section>
        <section css={{ fontSize: "0.9rem" }}>
          Posted by <UserLink name={props.by} /> ·{" "}
          <Tooltip text={moment.unix(props.time).format("LLLL")} type="dark">
            {moment.unix(props.time).calendar()}
          </Tooltip>{" "}
          ·{" "}
          <Link href={`/item?id=${props.id}`}>
            <a>{props.descendants || 0} comments</a>
          </Link>
        </section>
      </div>
    </div>
  );
}
