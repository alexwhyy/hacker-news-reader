import Link from "next/link";

export default function Layout(props) {
  return (
    <div className="bg-white sm:mx-20 sm:mt-3 md:mx-40 md:mt-5">
      <nav className="flex justify-between bg-orange-500 py-2 px-5">
        <Link href="/">
          <p className="text-md font-semibold">Hacker News Reader</p>
        </Link>
      </nav>
      {props.children}
    </div>
  );
}
