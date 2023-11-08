// These styles apply to every route in the application
import Link from "next/link";
import "../styles/globals.css";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hacker News Reader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 dark:bg-black">
        <div className="bg-white dark:bg-gray-900 sm:mx-20 sm:mt-3 md:mx-40 md:mt-5">
          <nav className="flex justify-between bg-orange-500 px-5 py-2">
            <Link href="/">
              <p className="text-md font-semibold">Hacker News Reader</p>
            </Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
