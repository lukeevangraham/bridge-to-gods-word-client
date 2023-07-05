import { useState } from "react";
import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI, getGlobalInfo } from "../../lib/api";
import Button from "../../components/UI/Button/Button";

import classes from "./index.module.scss";

export async function getStaticProps() {
  const [globalData, contactData] = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/contact?populate=deep`),
  ]);
  return {
    props: {
      global: globalData.data.attributes,
      contactData,
    },
    revalidate: 1,
  };
}

const Contact = ({ global, contactData }) => {
  const [messageStatus, setMessageStatus] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    const res = await fetch("/api/contact", {
      body: JSON.stringify({
        name: e.target.name.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        message: e.target.message.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    // console.log("RES: ", result);
    result.status === 200 ? setMessageStatus(200) : null;
  };

  let contactForm = "";

  switch (messageStatus) {
    case 0:
      break;
    case 200:
      contactForm = (
        <div>
          <h3>Your message was successfully delivered</h3>
        </div>
      );
      break;
    case 1:
      contactForm = <div>Sending...</div>;
      break;
    default:
      contactForm = (
        <>
          <form onSubmit={sendMessage} className={classes.Form}>
            <div className={classes.Form__group}>
              <input
                className={classes.Form__input}
                type="text"
                name="name"
                id="name"
                required
                placeholder="Your First & Last Name"
                autoComplete="name"
              />
              <label htmlFor="name" className={classes.Form__label}>
                Your First & Last Name
              </label>
            </div>
            <div className={classes.Form__group}>
              <input
                type="tel"
                name="phone"
                id="phone"
                className={classes.Form__input}
                placeholder="Your Phone"
                autoComplete="tel-national"
              />
              <label htmlFor="phone" className={classes.Form__label}>
                Your Phone
              </label>
            </div>
            <div className={classes.Form__group}>
              <input
                type="email"
                name="email"
                id="email"
                required
                className={classes.Form__input}
                placeholder="Your Email"
                autoComplete="email"
              />
              <label htmlFor="email" className={classes.Form__label}>
                Your Email
              </label>
            </div>
            <div className={classes.Form__group}>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                className={classes.Form__input}
                placeholder="Your Message"
              ></textarea>
              <label htmlFor="message" className={classes.Form__label}>
                Your Message
              </label>
            </div>
            <button>Submit</button>
          </form>
        </>
      );
      break;
  }

  return (
    <Layout global={global}>
      <Breadcrumb
        title="Contact"
        bgImage={
          "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1674277225/amador_loureiro_B_Vy_Nlch_Wqzs_unsplash_bd31f5f21c.jpg?updated_at=2023-01-21T05:00:30.095Z"
        }
      />
      <main>
        <div className={classes.Contact}>
          <div className="row">
            <h1 className="u-margin-bottom-medium">Contact Me</h1>
            <div>{contactForm}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
