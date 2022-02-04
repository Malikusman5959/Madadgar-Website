const express = require("express");
const emailroutes = require("../controller/email_controller");
const email_route = express.Router();

email_route
    .route("/sendmail")

