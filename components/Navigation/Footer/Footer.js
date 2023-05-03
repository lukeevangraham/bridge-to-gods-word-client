import Link from "next/link";

import classes from "./Footer.module.scss";

const Footer = () => (
  <div className={classes.Footer}>
    <div className="row">
      <div className={classes.Footer__Brand}>
        <h3>
          <Link href="/">Carla Unseth</Link>
        </h3>
      </div>
      <div className={classes.Footer__Site}>
        <h4>Useful Links</h4>
        <ul>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/podcast">
              <a>Podcast</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className={[classes.Footer__Bottom, "row"].join(" ")}>
      <div className={classes.Footer__Bottom__Border}></div>
      <div className={classes.Footer__Bottom__Content}>
        <div className={classes.Footer__Bottom__Content__Copyright}>
          &copy; {new Date().getFullYear()} Carla Unseth
        </div>
        <div className={classes.Footer__Bottom__Content__GWW}>
          <a href="https://grahamwebworks.com" target="_blank">Graham Web Works</a>
        </div>
        <div className={classes.Footer__Bottom__Content__Social}>
          <a href="https://twitter.com/bridge2godsword" target="_blank">
            <svg>
              <use xlinkHref="../../images/sprite.svg#icon-twitter" />
            </svg>
          </a>
          <a href="https://www.facebook.com/bridgetogodsword" target="_blank">
            <svg>
              <use xlinkHref="../../images/sprite.svg#icon-facebook" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/carla-unseth-955890132/"
            target="_blank"
          >
            <svg>
              <use xlinkHref="../../images/sprite.svg#icon-linkedin" />
            </svg>
          </a>
          <a href="https://www.instagram.com/carla.unseth" target="_blank">
            <svg>
              <use xlinkHref="../../images/sprite.svg#icon-instagram" />
            </svg>
          </a>
          <a href="https://bridgetogodsword.podbean.com/feed/" target="_blank">
            <svg>
              <use xlinkHref="../../images/sprite.svg#icon-podcast" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
