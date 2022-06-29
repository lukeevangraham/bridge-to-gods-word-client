import classes from "./Backdrop.module.scss";

const Backdrop = ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked}>Backdrop</div> : null;

export default Backdrop;
