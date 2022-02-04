const express = require("express");
const ReportController = require("../controller/ReportController");
const ReportRoute = express.Router();

ReportRoute
    .route("/Report")
    .post(ReportController.addReport)
    .get(ReportController.allReports)
    .patch(ReportController.updateReportByID)

    ReportRoute
    .route("/ReportByJobId")
    .get(ReportController.getReportByJobId)

    
module.exports = ReportRoute;