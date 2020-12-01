var express = require("express");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const port = process.env.PORT || 5000;

//mongodb connection

mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    console.log("connected", err ? err : true);
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log("Server is started at", port, "CC dug dug dug dug dug.......");
});
module.exports = app;
