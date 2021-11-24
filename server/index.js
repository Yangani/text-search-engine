const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3030;
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

/** Serve client files in prod as homepage **/
app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

/** Route to search **/
app.use("/search", router);

/** 404 hanlder **/
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
