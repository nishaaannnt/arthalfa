const express = require("express");
const cors = require("cors");
require("dotenv").config();
const route = require("./index.route");
const app = express();
const expressWinston = require('express-winston');
const winston = require('winston');
const PORT = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const { connection } = require('./server/config/db');
const { handleError } = require("./server/helpers/errorHandler");

// this is extra
const authRouter=require('./server/routes/auth.route')

app.use(cors());

app.use(express.json());

// Middleware to parse different body formats with a large limit
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 50000 }));
app.use(bodyParser.raw({ limit: "500mb" }));
app.use(bodyParser.text({ limit: "500mb" }));

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize:true
      }),
    ]
  });

// this is for logging 
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false, // optional: log meta data about the request (default: true)
  msg: "HTTP {{req.method}} {{req.url}} {{req.statusCode}} {{req.responseTime}}ms {{req.ip}}", // optional: customize the logging message
  // expressFormat: true, // optional: use the default Express/morgan format
  colorize: false, // optional: colorize the log output
}));

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

app.use(expressWinston.errorLogger({
    winstonInstance: logger,
  }));

// these are the routes
app.use("/api/v1", route)

// this can be used for scope (although out of scope)
app.use("/auth/v1", authRouter)

// this is an error handler which can manage any unforeseen circumstances
app.use((err, req, res, next) => {
    handleError(err, res);
});  

const start = () => {
    try {
        connection();
        app.listen(PORT, () => {
            console.log("On server port 4000"); 
        });
    } catch (error) {
        console.log(error);
    }
}

start();