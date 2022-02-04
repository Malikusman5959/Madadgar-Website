const express = require("express");
const c_serviceProvider = require("../controller/c_servericeProvider");
const r_login = express.Router();

r_login.route("/login").post(c_serviceProvider.getServiceProviderByEmail);
module.exports = r_login;
