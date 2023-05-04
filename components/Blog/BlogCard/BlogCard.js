import Link from "next/link";
import Image from "next/image";
import TagCard from "../TagCard/TagCard";

import classes from "./BlogCard.module.scss";

const BlogCard = ({ blog }) => {
  const stripHtml = (html) => {
    //   let tmp = document.createElement("DIV");
    //   tmp.innerHTML = html;
    //   return tmp.textContent || tmp.innterText || "";
    var regX = /(<([^>]+)>)/gi;
    return html.replace(regX, "");
  };

  return (
    <div key={blog.id} className={classes.BlogCard}>
      <Link href={`/blog/${blog.attributes.slug}`} passHref>
        <div className={classes.BlogCard__PrimaryImage}>
          {blog.attributes.primaryImage && blog.attributes.primaryImage.data ? (
            <Image
              src={blog.attributes.primaryImage.data.attributes.url}
              layout="fill"
              objectFit="cover"
              alt={blog.attributes.primaryImage.data.attributes.alternativeText}
            />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1677199981/hannah_olinger_8e_Sr_C43qdro_unsplash_bb1d58a63d.jpg"
              }
              layout="fill"
              objectFit="cover"
              alt="Someone writing on paper with pen"
            />
          )}
        </div>
      </Link>
      <div className={classes.BlogCard__BelowPhoto}>
        <Link href={`/blog/${blog.attributes.slug}`}>
          <a>
            <div className={classes.BlogCard__BelowPhoto__Title}>
              {blog.attributes.Title}
            </div>
          </a>
        </Link>

        <div className={classes.BlogCard__BelowPhoto__Date}>
          <svg>
            <use xlinkHref="../../images/sprite.svg#icon-calendar" />
          </svg>
          <div>
            {new Date(blog.attributes.DatePosted).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
        <div className={classes.BlogCard__BelowPhoto__Excerpt}>
          {`${stripHtml(blog.attributes.Body)
            .split(" ")
            .slice(0, 20)
            .join(" ")} ...`}
        </div>

        <div className={classes.BlogCard__BelowPhoto__Tags}>
          {blog.attributes.blog_topics.data.map((tag, index) => (
            <TagCard key={index} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
