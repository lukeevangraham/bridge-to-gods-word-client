import Link from "next/link";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ children, drawerToggleClicked }) => (
  <div className={classes.toolbar}>
    <div className={`${classes.toolbar__inner} row`}>
      <Link href="/">
        <a>
          <div>Carla Unseth</div>
        </a>
      </Link>
      {children}
      <DrawerToggle clicked={drawerToggleClicked} />
    </div>
  </div>
);

export default Toolbar;
