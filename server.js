const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const path = require("path");
const app = express();
require("dotenv").config();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = twilio(accountSid, authToken);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/send-sms", (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) {
    return res.status(400).send('Both "to" and "message" fields are required.');
  }
  client.messages
    .create({
      body: message,
      from: "+15415023914",
      to: to,
    })
    .then((message) => res.send(`Message sent with SID: ${message.sid}`))
    .catch((error) => res.status(500).send(`Error: ${error.message}`));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(3000, () => {
  console.log(`Server running......`);
});
