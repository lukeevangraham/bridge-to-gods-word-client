import { fetchAPI, getAllBlogSlugs } from "../../lib/api";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllBlogSlugs();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("PARAMS: ", params);
  const [blogData, global] = await Promise.all([
    fetchAPI(`/blogs?filters[slug][$eq]=${params.slug}`),
    fetchAPI("/global?populate=*,navbar.links,navbar.Button"),
  ]);
  return {
    props: { blogData: blogData.data[0], global: global.data.attributes },
    revalidate: 1,
  };
}

const Blog = ({ blogData, global }) => (
  <Layout global={global}>
    <>
      <Breadcrumb
        title={blogData.attributes.Title}
        parent={"blog"}
        bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1675636015/aaron_burden_x_G8_IQ_Mq_MITM_unsplash_3d9571db8a.jpg?updated_at=2023-02-05T22:26:59.780Z"
      />
      <div className={`row ${classes.BlogSingle}`}>
        {console.log("HERE: ", blogData)}
        <div className={classes.BlogSingle__Title}>
          {blogData.attributes.Title}
        </div>
        <div className={classes.BlogSingle__DatePosted}>
          {blogData.attributes.DatePosted}
        </div>
        <div
          className={classes.BlogSingle__Body}
          dangerouslySetInnerHTML={{ __html: blogData.attributes.Body }}
        ></div>
      </div>
    </>
  </Layout>
);

export default Blog;
