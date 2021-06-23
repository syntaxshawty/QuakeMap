const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();

// logging and body-parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// You'll of course want static middleware so your browser can request things
// like your 'index.html' and 'bundle.js'.
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});

// listen on a port
const PORT = 3000;

const init = async function () {
  app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
