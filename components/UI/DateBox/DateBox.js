import { format } from "date-fns";
import classes from "./DateBox.module.scss";

const DateBox = ({ date }) => {
  const convertedDate = new Date(date.replace(/-/g, "/"));

  return (
    <div className={classes.DateBox}>
      <div>{format(convertedDate, "dd")}</div>
      <div>{format(convertedDate, "MMM")}</div>
    </div>
  );
};

export default DateBox;
