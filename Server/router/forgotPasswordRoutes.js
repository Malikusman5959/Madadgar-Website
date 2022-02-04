const express = require("express");
const ForgotPasswordController = require("../controller/ForgotPasswordController");
const forgotPasswordRoutes = express.Router();

forgotPasswordRoutes
    .route("/sendEmail")
    .post(ForgotPasswordController.sendEmail)

forgotPasswordRoutes
    .route("/changePassword")
    .post(ForgotPasswordController.changePassword)


module.exports = forgotPasswordRoutes;