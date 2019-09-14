const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//DECLARATION OF ROUTES
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const tablesRouter = require("./routes/tables");
const ordersRouter = require("./routes/orders");
const billsRouter = require("./routes/bills");
const statisticsRouter = require("./routes/statistics");

var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//USAGE OF ROUTES
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/tables", tablesRouter);
app.use("/orders", ordersRouter);
app.use("/bills", billsRouter);
app.use("/statistics", statisticsRouter);

//SICKET
io.on("connect", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

app.use(function(req, res, next) {
  res.io = io;
  next();
});

//MONGOOSE CONNECTION
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app: app, server: server };
