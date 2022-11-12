import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "@util/SeoConfig";
import Header from "layout/Header";
import Footer from "layout/Footer";
import Link from "next/link";

const Layout = ({ children }: Record<string, any>) => {
  return (
    <>
      <Header>
        <p>Next.JS Boilerplate</p>
        <Link href="/">Go Home</Link>
      </Header>
      <main
        className="app-container"
        style={{
          display: "flex",
          paddingTop: "4rem",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
