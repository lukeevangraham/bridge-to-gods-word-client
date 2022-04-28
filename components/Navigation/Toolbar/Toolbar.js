import classes from "./Toolbar.module.scss";

const Toolbar = ({ children }) => (
  <div className={classes.toolbar}>
    <div className={`${classes.toolbar__inner} row`}>
      <div>Carla Unseth</div>
      {children}
    </div>
  </div>
);

export default Toolbar;
