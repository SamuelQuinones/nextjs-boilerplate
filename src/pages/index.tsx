import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div style={{ flex: 1 }}>
      <NextSeo title="Home" />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Explore the <a href="https://nextjs.org">Next.js</a> Extended
          Boilerplate
        </h1>

        <p className={styles.description} style={{ marginTop: "4rem" }}>
          Get started by running{" "}
          <code className={styles.code}>npm run cleanAndSetup</code> or{" "}
          <code className={styles.code}>yarn cleanAndSetup</code>
        </p>
        <p
          className={styles.description}
          style={{ marginTop: "1rem", marginBottom: "4rem" }}
        >
          This will ensure the example app is removed and that the boilerplate
          is setup correctly.
        </p>

        <div className={styles.grid}>
          <Link href="/features">
            <a className={styles.card}>
              <h2>Features &rarr;</h2>
              <p>
                Additional features focused on improving developer experience
              </p>
            </a>
          </Link>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
