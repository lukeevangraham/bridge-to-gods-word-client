import Image from "next/image";
import Link from "next/link";

import classes from "./Breadcrumb.module.scss";

const Breadcrumb = ({ bgImage, title, parent }) => (
  <div className={classes.Breadcrumb}>
    <div className={classes.Breadcrumb__colorOverlay} />
    <div className={classes.Breadcrumb__BgImage}>
      <Image
        src={bgImage}
        layout="fill"
        objectFit="cover"
        alt="Breadcrumb photo"
      />
    </div>
    <div className={classes.Breadcrumb__text}>
      <h1 className={classes.Breadcrumb__text__title}>{`${title}`}</h1>
      <ul className={classes.Breadcrumb__text__parents}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {parent ? (
          <li>
            <Link href={`/${parent}`}>{parent}</Link>
          </li>
        ) : null}
      </ul>
    </div>
  </div>
);

export default Breadcrumb;
