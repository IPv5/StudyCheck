const express = require("express");
const sgMail = require('@sendgrid/mail');
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;


//beginning of sending email
sgMail.setApiKey('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');
sgMail.setSubstitutionWrappers('{{', '}}');

app.get('/send-contact-email', (req, res) => {
  //get variables from query string
  const { recipient, sender, topic, text, name } = req.query;

  //sendgrid requirements
  const msg = {
    from: sender,
    subject: topic,
    html: text,
    "template_id": "d-a6867e57a6d945a79b10f6830a28a9c9",
    //d-b04ac1322f664837bcb9e22bf17b1493 signup form
    personalizations: [
      {
        to: [
          {
            email: recipient,
          }
        ],
        dynamic_template_data: {
          name: name,
        }
      }
    ]
  };

  //send email
  sgMail.send(msg)
})

app.get('/send-signup-email', (req, res) => {
  //get variables from query string
  const { recipient, sender, name } = req.query;

  //sendgrid requirements
  const msg = {
    from: sender,
    html: name,
    "template_id": "d-b04ac1322f664837bcb9e22bf17b1493",
    personalizations: [
      {
        to: [
          {
            email: recipient,
          }
        ],
        dynamic_template_data: {
          name: name,
        }
      }
    ]
  };

  //send email
  sgMail.send(msg)
})
//End of added code for mail sending uncomment the sgMail.send to actually send one(it does work)

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
