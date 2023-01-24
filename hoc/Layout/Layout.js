import { useState } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../../components/Navigation/Footer/Footer";

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
        <div className={classes.Layout__DesktopOnly}>
          <NavigationItems links={global.navbar.links} button={global.navbar.Button} />
        </div>
      </Toolbar>
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        links={global.navbar.links}
        button={global.navbar.Button}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
