import NavigationItem from "./NavigationItem/NavigationItem";
import Button from "../../UI/Button/Button";

import classes from "./NavigationItems.module.scss";

const NavigationItems = ({ links, button }) => (
  <div className={classes.NavItems}>
    {links.map((link) => (
      <NavigationItem key={link.id} item={link} />
    ))}
    {button ? <Button button={button} /> : null}
  </div>
);

export default NavigationItems;
