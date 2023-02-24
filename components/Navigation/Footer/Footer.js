import Link from "next/link";

import classes from "./Footer.module.scss";

const Footer = () => (
  <div className={classes.Footer}>
    <div className="row">
      <div className={classes.Footer__Brand}>
        <h3>
          <Link href="/">Carla Unseth</Link>
        </h3>
      </div>
      <div className={classes.Footer__Site}>
        <h4>Useful Links</h4>
        <ul>
          <li><Link href="/blog"><a>Blog</a></Link></li>
        </ul>
      </div>
    </div>
    <div className={[classes.Footer__Bottom, "row"].join(" ")}>
      <div className={classes.Footer__Bottom__Border}></div>
      <div className={classes.Footer__Bottom__Content}>
        <div>&copy; {new Date().getFullYear()} Carla Unseth</div>
        <div>Graham Web Works</div>
        <div>Social Icons</div>
      </div>
    </div>
  </div>
);

export default Footer;
