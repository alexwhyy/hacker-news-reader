import Link from "next/link";

export default function UserLink(props: { name: string }) {
  return <Link href={`/user?id=${props.name}`}>{props.name}</Link>;
}
