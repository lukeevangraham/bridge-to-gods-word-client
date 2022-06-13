import FeatureRowsGroup from "./FeatureRowsGroup/FeatureRowsGroup";

import classes from "./Sections.module.scss";

// MAP STRAPI SECTIONS TO SECTION COMPONENTS
const sectionComponents = {
  "sections.feature-row-group": FeatureRowsGroup,
};

// DISPLAY A SECTION INDIVIDUALLY
const Section = ({ sectionData }) => {
  console.log("sectionData: ", sectionData);
  const SectionComponent = sectionComponents[sectionData.__component];

  if (!SectionComponent) {
    return null;
  }

  // DISPLAY THE SECTION
  return <SectionComponent data={sectionData} />;
};

// DISPLAY THE LIST OF SECTIONS
const Sections = ({ sections }) => (
  <div className={classes.Sections}>
    {console.log("SECTIONS: ", sections)}
    {sections.map((section) => (
      <div className={classes.Sections__section} key={section.id}>
        <Section sectionData={section} />
      </div>
    ))}
  </div>
);

export default Sections;
