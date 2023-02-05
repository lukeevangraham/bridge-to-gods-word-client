import Link from "next/link";
import { fetchAPI } from "../../lib/api";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, allNewsData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links,navbar.Button"),
    fetchAPI(`/blogs?sort=DatePosted:desc&populate=deep`),
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
      <Breadcrumb title="Blog" bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1675636015/aaron_burden_x_G8_IQ_Mq_MITM_unsplash_3d9571db8a.jpg?updated_at=2023-02-05T22:26:59.780Z" />
      {console.log("HERE: ", allNewsData)}
      <div className={`row ${classes.BlogCards}`}>
        {allNewsData.data.map((blog) => (
          <div key={blog.id} className={classes.BlogCards__BlogCard}>
            <Link href={`/blog/${blog.attributes.slug}`}>
              <a>
                <div className={classes.BlogCards__BlogCard__Title}>
                  {blog.attributes.Title}
                </div>
              </a>
            </Link>

            <div className={classes.BlogCards__BlogCard__Date}>
              {blog.attributes.DatePosted}
            </div>
            <div className={classes.BlogCards__BlogCard__Excerpt}>
              {`${stripHtml(blog.attributes.Body)
                .split(" ")
                .slice(0, 20)
                .join(" ")} ...`}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
