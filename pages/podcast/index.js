import Image from "next/image";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI, getGlobalInfo } from "../../lib/api";
import Parser from "rss-parser";

import classes from "./index.module.scss";

const parser = new Parser();

export async function getStaticProps() {
  const [globalData, podcastFeed] = await Promise.all([
    getGlobalInfo(),
    parser.parseURL("https://feed.podbean.com/bridgetogodsword/feed.xml"),
  ]);

  return {
    props: { global: globalData.data.attributes, podcastFeed: podcastFeed },
  };
}

const Podcast = ({ global, podcastFeed }) => (
  <Layout global={global}>
    <Breadcrumb
      title="Podcast"
      bgImage={
        "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1678854939/cowomen_UU_Ppu2s_YV_6_E_unsplash_4f22083296.jpg"
      }
    />
    <main className={[classes.Podcast, "row"].join(" ")}>
      <section className={classes.Podcast__Top}>
        <div className={classes.Podcast__Top__Image}>
          <Image
            src={podcastFeed.image.url}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <h2>{podcastFeed.title} Podcast</h2>
          <p>{podcastFeed.description}</p>
        </div>
      </section>
      <section className={classes.Podcast__Main}>
        <div>Episodes</div>
        {podcastFeed.items.map((episode, index) => (
          <div key={index} className={classes.Podcast__Main__Episode}>
            <div className={classes.Podcast__Main__Episode__Image}>
              <Image src={episode.itunes.image} layout="fill" />
            </div>
            <div>
              <div>{episode.pubDate}</div>
              <div>{episode.title}</div>
              <p>{episode.contentSnippet}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
    {console.log("PF: ", podcastFeed)}
  </Layout>
);

export default Podcast;
