import Link from "next/link";

import classes from "./Button.module.scss";

const Button = ({ button }) => (
  <Link href={button.url}>
    {button.newTab ? (
      <a target="_blank" className={classes.Button}>
        {button.text}
      </a>
    ) : (
      <a className={classes.Button}>{button.text}</a>
    )}
  </Link>
);

export default Button;
