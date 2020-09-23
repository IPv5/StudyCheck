const express = require("express");
// const cors = require('cors');
// const sgMail = require('@sendgrid/mail');
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;



// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// app.use(cors());

// app.get('/send-email', (req, res) => {
//   //get variables from query string

//   const { recipient, sender, topic, text, html } = req.query;

//   //sendgrid requirements
//   const msg = {
//     to: recipient,
//     from: sender,
//     subject: topic,
//     text: text,
//     html: html
//   }

//   //send email
//   sgMail.send(msg)
//     .then((msg) => console.log(text))
// })

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for deployment
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// The "catchall" handler:  for any request that doesn't
// match one above, send back React's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budgets",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

mongoose.connection.on("connected", () => {
  console.log("connected to Mongoose");

});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
