module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
};
