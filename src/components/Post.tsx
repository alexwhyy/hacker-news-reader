import Link from "next/link";

import { Tooltip, useTheme } from "@geist-ui/react";
import moment from "moment";

import UserLink from "./UserLink";

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
  const theme = useTheme();

  return (
    <div
      style={{
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
        style={{
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
      <div style={{ padding: 10 }}>
        <section>
          <a href={props.url}>
            <div style={{ color: "black", fontWeight: 500 }}>
              {props.title}{" "}
              {props.url && (
                <span style={{ color: "gray", fontWeight: 400 }}>
                  ({new URL(props.url).hostname})
                </span>
              )}
            </div>
          </a>
        </section>
        <section style={{ fontSize: "0.9rem" }}>
          Posted by <UserLink name={props.by} /> ·{" "}
          <Tooltip text={moment.unix(props.time).format("LLLL")} type="dark">
            {moment.unix(props.time).calendar()}
          </Tooltip>{" "}
          ·{" "}
          <Link href={`/item?id=${props.id}`}>
            {props.descendants || 0} comments
          </Link>
        </section>
      </div>
    </div>
  );
}
