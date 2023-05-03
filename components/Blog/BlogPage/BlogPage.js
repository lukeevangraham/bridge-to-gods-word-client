import BlogCard from "../BlogCard/BlogCard";
import Pagination from "../../UI/Pagination/Pagination";

import classes from "./BlogPage.module.scss";

const BlogPage = ({ newsData }) => (
  <>
    <div className={`row ${classes.BlogCards}`}>
      {newsData.data.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </div>
    <div className="row">
      <Pagination pageData={newsData.meta.pagination} />
      
    </div>
  </>
);

export default BlogPage;
