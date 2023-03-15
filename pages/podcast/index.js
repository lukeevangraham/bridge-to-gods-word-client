import Image from "next/image";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI, getGlobalInfo } from "../../lib/api";
import ReactPlayer from "react-player";
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
    <main className={classes.Podcast}>
      <div className="row">
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
          <div className={classes.Podcast__Main__Episodes}>
            {podcastFeed.items.map((episode, index) => (
              <div
                key={index}
                className={classes.Podcast__Main__Episodes__Episode}
              >
                <div
                  className={classes.Podcast__Main__Episodes__Episode__Image}
                >
                  <Image
                    src={episode.itunes.image}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <div
                    className={classes.Podcast__Main__Episodes__Episode__Date}
                  >
                    {new Date(episode.pubDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div
                    className={classes.Podcast__Main__Episodes__Episode__Title}
                  >
                    {episode.title}
                  </div>
                  <p>{episode.contentSnippet}</p>
                  {episode.enclosure.url ? (
                    <ReactPlayer
                      url={episode.enclosure.url}
                      width="400px"
                      height="50px"
                      playing={true}
                      controls={true}
                      light
                      className={classes.Podcast__Main__Episodes__Episode__Player}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
    {/* {console.log("PF: ", podcastFeed)} */}
  </Layout>
);

export default Podcast;
