import { useState } from "react";
import Image from "next/image";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { getGlobalInfo } from "../../lib/api";
import AudioPlayer from "../../components/UI/AudioPlayer/AudioPlayer";
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

const Podcast = ({ global, podcastFeed }) => {
  const [selectedAudio, setSelectedAudio] = useState(null);

  // const handleSelectedAudio = (url) => {
  //   setSelectedAudio(url)
  // }

  return (
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
            {/* <h3>Episodes</h3> */}
            <div className={classes.Podcast__Main__Episodes}>
              {podcastFeed.items.map((episode, index) => (
                <div
                  key={index}
                  className={classes.Podcast__Main__Episodes__Episode}
                  id={index}
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
                  <div
                    className={classes.Podcast__Main__Episodes__Episode__Info}
                  >
                    <div
                      className={
                        classes.Podcast__Main__Episodes__Episode__Info__Top
                      }
                      onClick={() => setSelectedAudio(episode)}
                    >
                      <div
                        className={
                          classes.Podcast__Main__Episodes__Episode__Info__Top__Play
                        }
                      >
                        <svg>
                          <use xlinkHref="../images/sprite.svg#icon-play3"></use>
                        </svg>
                      </div>
                      <div>
                        <div
                          className={
                            classes.Podcast__Main__Episodes__Episode__Info__Top__Date
                          }
                        >
                          {new Date(episode.pubDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div
                          className={
                            classes.Podcast__Main__Episodes__Episode__Info__Top__Title
                          }
                        >
                          {episode.title}
                        </div>
                      </div>
                    </div>
                    <p>{episode.contentSnippet}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {/* {console.log("PF: ", podcastFeed)} */}
      {selectedAudio ? (
        <AudioPlayer
          episode={selectedAudio}
          clearSelection={setSelectedAudio}
        />
      ) : null}
    </Layout>
  );
};

export default Podcast;
