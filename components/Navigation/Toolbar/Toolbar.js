import Link from "next/link";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ children }) => (
  <div className={classes.toolbar}>
    <div className={`${classes.toolbar__inner} row`}>
      <Link href="/">
        <a>
          <div>Carla Unseth</div>
        </a>
      </Link>
      {children}
    </div>
  </div>
);

export default Toolbar;
