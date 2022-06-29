import classes from "./DrawerToggle.module.scss"

const DrawerToggle = ({ clicked }) => (
    <div className={classes.DrawerToggle} onClick={clicked}>
        <span className={classes.DrawerToggle__icon}></span>
    </div>
)

export default DrawerToggle;