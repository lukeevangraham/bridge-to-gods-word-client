import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";

import classes from "./Layout.module.scss";

const Layout = ({ global, children }) => (
  <>
    {console.log("GLOBAL: ", global)}
    <Toolbar>
      <NavigationItems links={global.navbar.links} />
    </Toolbar>
    {children}
  </>
);

export default Layout;
