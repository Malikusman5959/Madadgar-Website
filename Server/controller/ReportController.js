const Report = require("../model/Report");
const { report } = require("../router/ReportRoute");

//Create a Report
exports.addReport = async function (req, res) {
  try {
    const report = await Report.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Report: report,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Report posting unsuccessful",
      message: e,
    });
  }
};


exports.getReportByJobId = async function (req, res) {
  try {
    var reports = await Report.find(req.body).populate(['customerId' , 'serviceProvidersId' , 'jobId']);
    const review = Object.keys(reports).length;
    res.status(201).json({
      status: "success",
      total: review,
      data: {
        reports: reports,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};


// Get All Reports
exports.allReports = async function (req, res) {
  try {
    var Reports = await Report.find().populate(['customerId' , 'serviceProvidersId' , 'jobId']);
    const allReports = Object.keys(Reports).length;
    res.status(201).json({
      status: "success",
      total: allReports,
      data: {
        Reports: Reports,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};


exports.updateReportByID = async function (req, res) {

  var query = require("url").parse(req.url, true).query;
  var id = query.id;

  try {
    
    var report = await Report.findByIdAndUpdate(
      id,
      req.body
    );

    res.status(201).json({
      status: "success",
      data: {
        Report : report,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "Data fail to add in the Database........",
    });
  }
};