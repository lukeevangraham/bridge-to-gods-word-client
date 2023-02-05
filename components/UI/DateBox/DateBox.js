import classes from "./DateBox.module.scss"

const DateBox = ({ date }) => (
  <div className={classes.DateBox}>
    <div>
      {new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
        day: "numeric",
      })}
    </div>
    <div>
      {new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
        month: "short",
      })}
    </div>
  </div>
);

export default DateBox;
