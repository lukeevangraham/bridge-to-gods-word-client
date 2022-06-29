import { useState } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.scss";

const Layout = ({ global, children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler}>
        <NavigationItems links={global.navbar.links} />
      </Toolbar>
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        links={global.navbar.links}
      />
      {children}
    </>
  );
};

export default Layout;
