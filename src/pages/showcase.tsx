import type { Example } from "@util/Showcase";
import styles from "../styles/Showcase.module.css";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";

type StaticProps = { examples: Example[] };
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  //* lazy load examples
  const examples = (await import("../util/Showcase")).default;
  return { props: { examples } };
};

const Showcase: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  examples,
}) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Showcase</h1>
      <p style={{ textAlign: "center" }}>
        Below are some examples of projects built using this template. Each
        comes with a link to the production app and the GitHub source code.
      </p>
      <NextSeo title="Showcase" />
      <div className={styles.container}>
        {examples.map((example, index) => (
          <div
            key={`example-${index}`}
            className={example.full_width ? styles["card-full"] : styles.card}
          >
            <h3 className={styles.title}>{example.app_name}</h3>
            <small style={{ display: "block" }}></small>
            <p>
              {example.is_organization ? "Organization" : "User"} -{" "}
              {example.creator}
            </p>
            <p>{example.desctiption}</p>
            <section className={styles["link-container"]}>
              <a
                href={example.app_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ marginLeft: "0.2rem" }}>View App</span>
              </a>
              <a
                href={example.link_to_repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ verticalAlign: "-.125em", display: "inline-block" }}
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span style={{ marginLeft: "0.2rem" }}>View Source</span>
              </a>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};

export default Showcase;
