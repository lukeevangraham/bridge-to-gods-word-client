import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../hoc/Layout/Layout";
import DateBox from "../components/UI/DateBox/DateBox";
import TagCard from "../components/Blog/TagCard/TagCard";
import Sections from "../components/Sections/Sections";
import { fetchAPI, getGlobalInfo } from "../lib/api";
import { getMostRecentIssue } from "../lib/newsletter";
import Parser from "rss-parser";

import classes from "./index.module.scss";

const parser = new Parser();

export async function getStaticProps() {
  const [globalData, homeData, latestBlog, podcastData, newsletter] =
    await Promise.all([
      getGlobalInfo(),
      fetchAPI(`/home?populate=deep`),
      fetchAPI(`/blogs?sort=DatePosted:desc&pagination[pageSize]=1&populate=*`),
      parser.parseURL("https://feed.podbean.com/bridgetogodsword/feed.xml"),
      getMostRecentIssue(),
    ]);

  return {
    props: {
      globalData: globalData.data.attributes,
      homeData,
      latestBlog: latestBlog.data[0].attributes,
      podcastData: podcastData.items[0],
      newsletter: newsletter,
    },
    revalidate: 1,
  };
}

export default function Home({
  globalData,
  homeData,
  latestBlog,
  podcastData,
  newsletter,
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
                alt={
                  homeData.data.attributes.testCover.data.attributes
                    .alternativeText
                }
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
                    alt={
                      homeData.data.attributes.aboutPhoto.data.attributes
                        .alternativeText
                    }
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
                    {latestBlog.blog_topics.data.map((topic, index) => (
                      <div key={index}>
                        <TagCard tag={topic} />
                      </div>
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
                      {latestBlog.primaryImage.data ? (
                        <Image
                          src={latestBlog.primaryImage.data.attributes.url}
                          layout="fill"
                          objectFit="cover"
                          alt={
                            latestBlog.primaryImage.data.attributes
                              .alternativeText
                          }
                        />
                      ) : (
                        <Image
                          src={
                            "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1677199981/hannah_olinger_8e_Sr_C43qdro_unsplash_bb1d58a63d.jpg"
                          }
                          layout="fill"
                          objectFit="cover"
                          alt="Someone writing on paper with pen"
                        />
                      )}
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
                        alt="Podcast Image"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={classes.Newsletter}>
            <div className="row">
              <div className={classes.Newsletter__container}>
                <div className={classes.Newsletter__container__text}>
                  <h2>Latest Newsletter</h2>
                  <DateBox date={newsletter.date} />
                  <Link href={newsletter.url}>
                    <a target="_blank">
                      <h3>{newsletter.firstH1}</h3>
                    </a>
                  </Link>
                  <div className={classes.Newsletter__container__text__excerpt}>
                    {newsletter.secondText}
                    ...
                  </div>
                  <div
                    className={classes.Newsletter__container__text__otherPosts}
                  >
                    <h4>
                      <Link href="https://us6.campaign-archive.com/home/?u=6bac04db4f991f5af4f84dabb&id=3606fc3bbc">
                        <a target="_blank">See other newsletters →</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className={classes.latestBlog__container__image}>
                  <Link href={newsletter.url}>
                    <a>
                      <Image
                        src={newsletter.topImage}
                        layout="fill"
                        objectFit="cover"
                        alt="Newsletter image"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* <Sections sections={homeData.data.attributes.contentSections} /> */}
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
