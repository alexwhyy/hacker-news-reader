import Link from "next/link";

export default function Layout(props) {
  return (
    <div className="sm:mt-3 sm:mx-20 md:mt-5 md:mx-40 bg-white">
      <nav className="py-2 px-5 flex justify-between bg-orange-500">
        <Link href="/">
          <p className="text-md font-semibold">Hacker News Reader</p>
        </Link>
      </nav>
      {props.children}
    </div>
  );
}
