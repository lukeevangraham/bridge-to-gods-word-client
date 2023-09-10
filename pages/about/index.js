import SEO from "../../components/SEO/SEO";
import Image from "next/image";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import Fade from "react-reveal/Fade";
import { fetchAPI, getGlobalInfo } from "../../lib/api";

import classes from "./index.module.scss";

import qs from "qs";

export async function getStaticProps() {
  const query = qs.stringify({
    populate: { BioPhoto: { populate: "*" } },
  });

  const [globalData, aboutData] = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/about?${query}`),
  ]);

  return {
    props: {
      global: globalData.data.attributes,
      aboutData: aboutData.data.attributes,
    },
    revalidate: 1,
  };
}

const About = ({ global, aboutData }) => (
  <>
    <SEO
      metaData={{
        metaTitle: "Carla Unseth - About",
        metaDescription:
          "From a childhood dream to a transformative journey, follow my path to becoming a Bible translator with a heart for missions. Explore my story of faith, resilience, and service, as I bring God's Word to those who need it most. Join me on this inspiring mission.",
      }}
    />
    <Layout global={global}>
      <>
        <Breadcrumb
          title={"About"}
          bgImage={`https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1674264828/maksim_shutov_kd_L_Kidl6_Lrc_unsplash_9f846d115f.jpg?updated_at=2023-01-21T01:33:53.290Z`}
        />
        <main className={classes.About}>
          <section className={[classes.About__Bio, "row"].join(" ")}>
            <div
              className={classes.About__Bio__Text}
              dangerouslySetInnerHTML={{ __html: aboutData.Bio }}
            ></div>

            <div className={classes.About__Bio__Image}>
              <Fade right>
                <div className={classes.About__Bio__Image__Media}>
                  <Image
                    src={aboutData.BioPhoto.data.attributes.url}
                    alt={aboutData.BioPhoto.data.attributes.alternativeText}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Fade>
              <div className={classes.About__Bio__Image__Caption}>
                {aboutData.BioPhoto.data.attributes.caption}
              </div>
            </div>
          </section>
        </main>
      </>
    </Layout>
  </>
);

export default About;
