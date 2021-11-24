const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3030;
const router = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Load homepage **/
app.get("/", (req, res) => {
  console.log(req.query);
  return res.send({ Homepage: "Welcome to text search engine!" });
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
