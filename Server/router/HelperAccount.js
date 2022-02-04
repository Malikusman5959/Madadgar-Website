const express = require("express");
const c_serviceProvider = require("../controller/c_servericeProvider");
const helperAccountRoute = express.Router();

helperAccountRoute.route("/helperAccount").post(c_serviceProvider.getServiceProviderByEmail);
module.exports = helperAccountRoute;