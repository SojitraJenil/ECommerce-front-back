// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// // Endpoint to handle sending emails
// // Endpoint to handle sending emails
// app.post('/sendEmail', (req, res) => { // <--- Change the route here
//   const { to, subject, text } = req.body;

//   // Create a Nodemailer transporter object
//   let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'jeniltech18@gmail.com', // Your email address
//         pass: 'uqht nqds cqjy zngj' // You jenil
//       }

//   });

//   // Define email options
//   let mailOptions = {
//       from: 'jeniltech18@gmail.com',
//       to: to,
//       subject: subject,
//       text: text
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return res.status(500).send(error.toString());
//       }
//       res.status(200).send('Email sent: ' + info.response);
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// Endpoint to handle sending emails

exports.Email_Add =  async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    // Create a Nodemailer transporter using Postmark SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.postmarkapp.com",
      port: 587,
      auth: {
        user: "jeniltech18@gmail.com",
        pass: "uqht nqds cqjy zngj",
      },
    });

    // Define email options
    const mailOptions = {
      from: "sojitrasojitra0@gmail.com", // Sender address
      to: to,
      subject: subject,
      text: text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send(error.toString());
  }
};
