import Head from "next/head";
import Image from "next/image";
import Layout from "../hoc/Layout/Layout";
import { fetchAPI } from "../lib/api";

// import styles from "../styles/Home.module.css";
import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, homeData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links"),
    fetchAPI("/home?populate=*"),
  ]);
  return {
    props: { globalData: globalData.data.attributes, homeData },
    revalidate: 1,
  };
}

export default function Home({ globalData, homeData }) {
  console.log("HOME: ", homeData);
  return (
    <Layout global={globalData}>
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={classes.main}>
          {/* <h1>{homeData.data.attributes.testText}</h1> */}
          <header className={classes.header}>
            <div className={classes.topImage}>
              <Image
                src={homeData.data.attributes.testCover.data.attributes.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1>{homeData.data.attributes.testText}</h1>
          </header>

          <section className={classes.about}>
            <div className="row">
              <div className={classes.personal}>
                <div className={classes.aboutPhoto}>
                  <Image
                    src={
                      homeData.data.attributes.aboutPhoto.data.attributes.url
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={classes.text}>
                  <p className="paragraph">
                    Hi, I'm Carla. I'm so blessed to be a part of a translation
                    ministry{" "}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a> */}
        </footer>
      </div>
    </Layout>
  );
}
