import Head from "next/head";
import MemoryGame from "../components/MemoryGame";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Emoji Memory Game</title>
        <meta
          name="description"
          content="Emoji Memory Game built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <MemoryGame />
      </main>
    </div>
  );
}
