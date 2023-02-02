import Link from "next/link";

import classes from "./Button.module.scss";

// The Button component that takes a single "button" prop as an argument
const Button = ({ button }) => (
  // Using the Link component to handle navigation to the given "button.url"

  <Link href={button.url}>
    {
      // If "button.newTab" is truthy, the link will open in a new tab
      button.newTab ? (
        // Using an anchor tag with a "target" attribute set to "_blank"
        <a target="_blank" className={classes.Button}>
          {/* Displaying the text for the button from the "button.text" prop */}
          {button.text}
        </a>
      ) : (
        // Otherwise, the link will open in the same tab
        <a className={classes.Button}>
          {/* Displaying the text for the button from the "button.text" prop */}
          {button.text}
        </a>
      )
    }
  </Link>
);
// Exporting the Button component as the default export
export default Button;
