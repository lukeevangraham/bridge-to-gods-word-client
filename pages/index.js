import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../hoc/Layout/Layout";
import DateBox from "../components/UI/DateBox/DateBox";
import Sections from "../components/Sections/Sections";
import { fetchAPI, getGlobalInfo } from "../lib/api";
import Parser from "rss-parser";

import classes from "./index.module.scss";

const parser = new Parser();

export async function getStaticProps() {
  const [globalData, homeData, latestBlog, podcastData] = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/home?populate=deep`),
    fetchAPI(`/blogs?sort=DatePosted:desc&pagination[pageSize]=1&populate=*`),
    parser.parseURL("https://feed.podbean.com/bridgetogodsword/feed.xml"),
  ]);

  return {
    props: {
      globalData: globalData.data.attributes,
      homeData,
      latestBlog: latestBlog.data[0].attributes,
      podcastData: podcastData.items[0],
    },
    revalidate: 1,
  };
}

export default function Home({
  globalData,
  homeData,
  latestBlog,
  podcastData,
}) {
  return (
    <Layout global={globalData}>
      <div>
        <Head>
          <title>Carla Unseth - A Bridge To God&apos;s Word</title>
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
                priority
              />
            </div>
            <h1>{homeData.data.attributes.testText}</h1>
          </header>

          <section className={`${classes.mission} u-padding-y-medium`}>
            <div className="row">
              <div className={classes.mission__Statement}>
                {homeData.data.attributes.MissionStatement}
              </div>
              <div className={classes.mission__Explanation}>
                {homeData.data.attributes.MissionExplanation}
              </div>
            </div>
          </section>

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
                <div
                  className={classes.text}
                  dangerouslySetInnerHTML={{
                    __html: homeData.data.attributes.aboutText,
                  }}
                ></div>
              </div>
            </div>
          </section>

          <section className={classes.latestBlog}>
            <div className="row">
              <div className={classes.latestBlog__container}>
                <div className={classes.latestBlog__container__text}>
                  <h2>Latest Blog</h2>
                  <DateBox date={latestBlog.DatePosted} />
                  <Link href={`/blog/${latestBlog.slug}`}>
                    <a>
                      <h3>{latestBlog.Title}</h3>
                    </a>
                  </Link>
                  <div className={classes.latestBlog__container__text__excerpt}>
                    {latestBlog.Body.replace(/<br>/g, " ")
                      .replace(/<[^>]+>/g, "")
                      .split(" ")
                      .splice(0, 32)
                      .join(" ")}
                    ...
                  </div>
                  <div className={classes.latestBlog__container__text__topics}>
                    {latestBlog.blog_topics.data.map((topic) => (
                      <div key={topic.id}>{topic.attributes.Topic}</div>
                    ))}
                  </div>
                  <div
                    className={classes.latestBlog__container__text__otherPosts}
                  >
                    <h4>
                      <Link href="/blog">
                        <a>See other blog posts →</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className={classes.latestBlog__container__image}>
                  <Link href={`/blog/${latestBlog.slug}`}>
                    <a>
                      <Image
                        src={latestBlog.primaryImage.data.attributes.url}
                        layout="fill"
                        objectFit="cover"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={classes.Podcast}>
            <div className="row">
              <div className={classes.Podcast__container}>
                <div className={classes.Podcast__container__text}>
                  <h2>Latest Podcast</h2>
                  <DateBox date={podcastData.pubDate} podcastDate={true} />
                  <Link href={`/podcast#0`}>
                    <a>
                      <h3>{podcastData.title}</h3>
                    </a>
                  </Link>
                  <div className={classes.latestBlog__container__text__excerpt}>
                    {podcastData.contentSnippet
                      .split(" ")
                      .splice(0, 32)
                      .join(" ")}
                    ...
                  </div>
                  <div
                    className={classes.latestBlog__container__text__otherPosts}
                  >
                    <h4>
                      <Link href="/podcast">
                        <a>See other podcasts →</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className={classes.latestBlog__container__image}>
                  <Link href={`/podcast#0`}>
                    <a>
                      <Image
                        src={podcastData.itunes.image}
                        layout="fill"
                        objectFit="cover"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Sections sections={homeData.data.attributes.contentSections} />
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
