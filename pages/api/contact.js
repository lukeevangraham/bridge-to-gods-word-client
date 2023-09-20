// const nodemailer = require("nodemailer");
import axios from "axios";

export default function handler(req, res) {
  // METHOD FOR NODEMAILER AND GANDI
  // res.status(200).json({ status: 200 });

  // async function main() {
  //   let transporter = nodemailer.createTransport({
  //     host: "mail.gandi.net",
  //     port: "465",
  //     secure: "true",
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   let info = await transporter.sendMail({
  //     from: '"BRIDGETOGODSWORD.ORG" <donotreply@bridgetogodsword.org>',
  //     to: "carla.unseth@pbti.org, luke@grahamwebworks.com",
  //     subject: "Contact Form Submission from bridgetogodsword.org",
  //     text: `${req.body.name} (${req.body.email}) just sent this message via the contact form at bridgetogodsword.org:

  //       ${req.body.message}`,
  //   });

  //   transporter.verify(function (error, success) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Server is ready to take our messages", success);
  //     }
  //   });
  // }

  // main().catch(console.error);

  // METHOD FOR SPARKPOST

  let data = JSON.stringify({
    recipients: [
      {
        address: "carla.unseth@pbti.org, luke@grahamwebworks.com",
      },
    ],
    content: {
      from: {
        email: "donotreply@bridgetogodsword.org",
        name: "BRIDGETOGODSWORD.ORG",
      },
      subject: "Contact Form Submission from bridgetogodsword.org",
      text: `${req.body.name} (${req.body.email}) just sent this message via the contact form at bridgetogodsword.org:

        ${req.body.message}`,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.sparkpost.com/api/v1/transmissions",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.SPARKPOST_API_KEY,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      res.status(200).json({ status: 200 });
    })
    .catch((error) => {
      console.log(error);
    });
}
