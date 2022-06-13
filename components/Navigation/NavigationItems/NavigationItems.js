import NavigationItem from "./NavigationItem/NavigationItem"

import classes from "./NavigationItems.module.scss";

const NavigationItems = ({ links }) => (
    <div className={classes.NavItems}>
        {links.map(link => (
            <NavigationItem key={link.id}  item={link} />
        ))}
    </div>
)

export default NavigationItems;