// Import necessary modules
const express = require("express");
const nodemailer = require("nodemailer");

// Create Express app
const app = express();
const port = 8000; // Choose a port number

// Middleware to parse JSON requests
app.use(express.json());

// Define the email sending endpoint
app.post("/sendEmail", async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.postmarkapp.com",
      port: 587,
      auth: {
        user: "node", // Use your Postmark Server API Token here
        pass: "xxuj vfco enck npcm", // Use your Postmark Server API Token here
      },
    });

    // Define email options
    const mailOptions = {
      from: "sojitrasojitra0@gmail", // Sender address
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

