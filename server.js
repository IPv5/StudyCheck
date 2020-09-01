const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// console.log(routes);
// app.use(routes);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => res.send("API Running"));

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactcms",
//     { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
// );

connectDB();
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/reactBudgets",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   }
// );

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
