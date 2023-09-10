import SEO from "../../components/SEO/SEO";
import { getGlobalInfo, getBlogPageSnippets } from "../../lib/api";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import BlogPage from "../../components/Blog/BlogPage/BlogPage";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, allNewsData] = await Promise.all([
    getGlobalInfo(),
    getBlogPageSnippets(1),
  ]);
  return {
    props: {
      global: globalData.data.attributes,
      allNewsData,
    },
    revalidate: 1,
  };
}

const Blog = ({ allNewsData, global }) => {
  return (
    <>
    <SEO metaData={{ metaTitle: "Carla Unseth - Blog", metaDescription: "Explore the Latest Insights and Updates on Our Blog. Discover compelling articles covering a wide range of topics that inspire and inform. Join us on a journey of discovery and knowledge." }} />
    <Layout global={global}>
      <Breadcrumb
        title="Blog"
        bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1675636015/aaron_burden_x_G8_IQ_Mq_MITM_unsplash_3d9571db8a.jpg?updated_at=2023-02-05T22:26:59.780Z"
      />
      <BlogPage newsData={allNewsData} />
    </Layout>
    </>
  );
};

export default Blog;
