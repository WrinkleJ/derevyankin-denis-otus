var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require('dotenv');

const envFilePath = path.join(__dirname, process.argv[2] ? process.argv[2] : ".env.example");
console.log(envFilePath);
dotenv.config({path: envFilePath});

const PUBLIC_PATH = path.join(__dirname, "public");

var coursesRouter = require("./routes/courses");
var loginRouter = require("./routes/login");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === "development") {
  var livereload = require("livereload");
  var connectLivareload = require("connect-livereload");

  var livereloadServer = livereload.createServer();
  livereloadServer.watch(PUBLIC_PATH);
  livereloadServer.server.once("connection", () => {
    setTimeout(() => {
      livereloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLivareload());
}



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(PUBLIC_PATH));

app.use("/", loginRouter);
app.use("/login", loginRouter);
app.use(coursesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
