import BlogCard from "../BlogCard/BlogCard";

import classes from "./BlogPage.module.scss";

const BlogPage = ({ newsData }) => (
  <>
    <div className={`row ${classes.BlogCards}`}>
      {newsData.data.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </div>
    <div className="row">
      <div className={classes.Pagination}>
        <ul>
          {newsData.meta.pagination.page > 1 ? (
            <li>{newsData.meta.pagination.page - 1}</li>
          ) : null}
          <li className={classes.Pagination__active}>
            {newsData.meta.pagination.page}
          </li>
          {newsData.meta.pagination.page <
          newsData.meta.pagination.pageCount ? (
            <li>{newsData.meta.pagination.page + 1}</li>
          ) : null}
          <div>...</div>
          <li>{newsData.meta.pagination.pageCount}</li>
        </ul>
      </div>
    </div>
  </>
);

export default BlogPage;
