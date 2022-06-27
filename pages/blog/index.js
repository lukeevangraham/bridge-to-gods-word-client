import { fetchAPI } from "../../lib/api";
import Layout from "../../hoc/Layout/Layout";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, allNewsData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links"),
    fetchAPI(`/blogs?populate=deep`),
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
  const stripHtml = (html) => {
    //   let tmp = document.createElement("DIV");
    //   tmp.innerHTML = html;
    //   return tmp.textContent || tmp.innterText || "";
    var regX = /(<([^>]+)>)/gi;
    return html.replace(regX, "");
  };

  return (
    <Layout global={global}>
      {console.log("HERE: ", allNewsData)}
      <div className={`row ${classes.BlogCards}`}>
        {allNewsData.data.map((blog) => (
          <div key={blog.id} className={classes.BlogCards__BlogCard}>
            <div className={classes.BlogCards__BlogCard__Title}>
              {blog.attributes.Title}
            </div>
            <div className={classes.BlogCards__BlogCard__Date}>
              {blog.attributes.DatePosted}
            </div>
            <div className={classes.BlogCards__BlogCard__Excerpt}>
              {`${stripHtml(blog.attributes.Body)
                .split(" ")
                .slice(0, 20)
                .join(" ")}...`}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
