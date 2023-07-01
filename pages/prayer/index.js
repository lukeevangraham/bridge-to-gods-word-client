import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI, getGlobalInfo } from "../../lib/api";

import classes from "./index.module.scss";

import qs from "qs";

export async function getStaticProps() {
  const query = qs.stringify({
    sort: ["DatePosted:desc"],
  });

  const [globalData, prayerData] = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/prayer-points?${query}`),
  ]);

  return {
    props: {
      global: globalData.data.attributes,
      prayerData: prayerData,
    },
    revalidate: 1,
  };
}

const Prayer = ({ global, prayerData }) => (
  <Layout global={global}>
    <>
      <Breadcrumb
        title="Prayer Points"
        bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1688167876/jon_tyson_0o9dgx_Eu5_Q_unsplash_8dfc45fafd.jpg?updated_at=2023-06-30T23:31:20.594Z"
      />
    </>
    <main className={classes.Prayer}>
      <section className="row">
        {prayerData.data
          ? prayerData.data.map((point) => (
              <div className={classes.Prayer__Point} key={point.id}>
                <div className={classes.Prayer__Point__Date}>
                  {new Date(
                    point.attributes.DatePosted.replace(/-/g, "/").replace(
                      /T.+/,
                      ""
                    )
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: point.attributes.Body }}
                ></div>
              </div>
            ))
          : null}
      </section>
    </main>
  </Layout>
);

export default Prayer;
