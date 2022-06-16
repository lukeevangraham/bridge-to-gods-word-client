import Image from "next/image";

import classes from "./FeatureRowsGroup.module.scss";

const FeatureRowsGroup = ({ data }) => (
  <div>
    {console.log("DATA: ", data)}
    {data.features.map((feature, index) => (
      <div
        key={feature.id}
        className={
          index % 2 === 1
            ? `${classes.Feature} ${classes.Feature__ReverseRow}`
            : classes.Feature
        }
      >
        <div className={classes.Text}>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
        <div className={classes.Image}>
          <Image
            src={feature.media.data.attributes.url}
            alt={feature.media.data.attributes.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    ))}
  </div>
);

export default FeatureRowsGroup;
