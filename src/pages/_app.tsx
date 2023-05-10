import { Inter } from "next/font/google";

import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default App;
