const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const fetch = require("node-fetch");

// logging and body-parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// You'll of course want static middleware so your browser can request things
// like your 'index.html' and 'bundle.js'.
app.use(express.static(path.join(__dirname, "..", "public")));

// other routes go below
app.get("/api/", async (req, res, next) => {
  await fetch(
    "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  )
    .then((res) => res.json())
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
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
