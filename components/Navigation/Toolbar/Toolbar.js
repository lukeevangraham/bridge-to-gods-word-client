import classes from "./Toolbar.module.scss";

const Toolbar = ({ children }) => (
  <div className={classes.toolbar}>
    <div className={classes.toolbar__inner}>
      <div>Bridge To God's Word</div>
      {children}
    </div>
  </div>
);

export default Toolbar;
