import Link from "next/link";

import classes from "./Pagination.module.scss";

const Pagination = ({ pageData }) => (
  <div className={classes.Pagination}>
    <ul>
      {pageData.page > 1 ? (
        <>
          <Link href={`/blog/page/${pageData.page - 1}`} passHref>
            <li>&lt;</li>
          </Link>
          {pageData.page - 1 !== 1 ? (
            <Link href={`/blog`} passHref>
              <li>
                <a>1</a>
              </li>
            </Link>
          ) : null}
          <Link href={`/blog/page/${pageData.page - 1}`} passHref>
            <li>
              <a>{pageData.page - 1}</a>
            </li>
          </Link>
        </>
      ) : (
        <li className={classes.Pagination__disable}>&lt;</li>
      )}
      <li className={classes.Pagination__active}>{pageData.page}</li>
      {pageData.page < pageData.pageCount ? (
        <>
          {pageData.page + 1 !== pageData.pageCount ? (
            <Link href={`/blog/page/${pageData.page + 1}`} passHref>
              <li>
                <a>{pageData.page + 1}</a>
              </li>
            </Link>
          ) : null}

          <Link href={`/blog/page/${pageData.pageCount}`} passHref>
            <li><a>{pageData.pageCount}</a></li>
          </Link>
          <Link href={`/blog/page/${pageData.page + 1}`} passHref>
            <li>&gt;</li>
          </Link>
        </>
      ) : (
        <li className={classes.Pagination__disable}>&gt;</li>
      )}
    </ul>
  </div>
);

export default Pagination;
