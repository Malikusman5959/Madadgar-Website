const express = require("express");
const c_serviceProvider = require("../controller/c_servericeProvider");
const r_search = express.Router();

r_search.route("/search").post(c_serviceProvider.searchServiceProvider);
r_search.route("/searchBySkills").post(c_serviceProvider.searchServiceProviderBySkills);

module.exports = r_search;
