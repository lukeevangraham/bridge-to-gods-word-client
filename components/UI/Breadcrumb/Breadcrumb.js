import Image from "next/image";

import classes from "./Breadcrumb.module.scss";

const Breadcrumb = ({ bgImage, title, parent }) => (
  <div className={classes.Breadcrumb}>
    <div className={classes.Breadcrumb__colorOverlay} />
    <div className={classes.Breadcrumb__BgImage}>
      <Image src={bgImage} layout="fill" objectFit="cover" />
    </div>
    <h1 className={classes.Breadcrumb__title}>{title}</h1>
  </div>
);

export default Breadcrumb;
