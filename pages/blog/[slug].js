import { fetchAPI, getAllBlogSlugs } from "../../lib/api";
import Layout from "../../hoc/Layout/Layout";

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
    <div className={`row ${classes.BlogSingle}`}>
      {console.log("HERE: ", blogData)}
      <div className={classes.BlogSingle__Title}>{blogData.attributes.Title}</div>
      <div className={classes.BlogSingle__DatePosted}>
        {blogData.attributes.DatePosted}
      </div>
      <div
        className={classes.BlogSingle__Body}
        dangerouslySetInnerHTML={{ __html: blogData.attributes.Body }}
      ></div>
    </div>
  </Layout>
);

export default Blog;
