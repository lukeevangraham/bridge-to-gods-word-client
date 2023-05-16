import Link from "next/link";

import classes from "./TagCard.module.scss";

const TagCard = ({ tag }) => (
  <Link href={`/blog/tag/${tag.attributes.Topic}`} passHref>
    <div className={classes.TagCard}>
      <a>
        <div>{tag.attributes.Topic}</div>
      </a>
    </div>
  </Link>
);

export default TagCard;
