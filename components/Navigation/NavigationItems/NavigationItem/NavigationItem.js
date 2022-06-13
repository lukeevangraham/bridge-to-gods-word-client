import Link from "next/link";

import classes from "./NavigationItems.module.scss";

const NavigationItem = ({ item }) => (
  <div className={classes.NavItem}>
    <Link href={item.url}>{item.text}</Link>
  </div>
);

export default NavigationItem;
