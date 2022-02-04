const express = require("express");
const emailVerificationController = require("../controller/emailVerificationController");
const emailVerificationroutes = express.Router();

emailVerificationroutes
    .route("/sendOtp")
    .post(emailVerificationController.sendEmail)

emailVerificationroutes
    .route("/verifyOtp")
    .post(emailVerificationController.verifyEmail)


module.exports = emailVerificationroutes;