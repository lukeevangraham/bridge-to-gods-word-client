import classes from "./FeatureRowsGroup.module.scss";

const FeatureRowsGroup = ({ data }) => (
  <div>
    {console.log("DATA: ", data)}
    {data.features.map((feature) => (
      <div key={feature.id}>
        <div className={classes.Title}>{feature.title}</div>
      </div>
    ))}
  </div>
);

export default FeatureRowsGroup;
