import classes from "./DateBox.module.scss";

const DateBox = ({ date, podcastDate }) => {
  let convertedDate;

  switch (podcastDate) {
    case true:
      convertedDate = new Date(date);
      break;
    default:
      convertedDate = new Date(date.replace(/-/g, "/"));
      break;
  }

  return (
    <div className={classes.DateBox}>
      <div>
        {convertedDate.toLocaleDateString("en-US", {
          day: "numeric",
        })}
      </div>
      <div>
        {convertedDate.toLocaleDateString("en-US", {
          month: "short",
        })}
      </div>
    </div>
  );
};

export default DateBox;
