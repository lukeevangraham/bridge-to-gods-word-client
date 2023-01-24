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
      </div>
    </div>
    <div className={[classes.Footer__Bottom, "row"].join(" ")}>
      <div>&copy; {new Date().getFullYear()} Carla Unseth</div>
      <div>Graham Web Works</div>
      <div>Social Icons</div>
    </div>
  </div>
);

export default Footer;
