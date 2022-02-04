const express = require("express");
const job_controller = require("../controller/job_controller");
const jobRoute = express.Router();

jobRoute
    .route("/JobPostRoutes")
    .post(job_controller.addPost)
    .get(job_controller.allPostedJobs)
    .patch(job_controller.updateJobStatusByID)

jobRoute
    .route("/UpdateJobContract")
    .patch(job_controller.updateJobContractById)

jobRoute.route("/JobPostRoutes/relatedJobs")
    .post(job_controller.allRelatedJobs);

jobRoute.route("/JobPostRoutes/JobsByCustomer")
    .get(job_controller.allPostedJobsByCustomerId);

jobRoute.route("/JobPostRoutes/JobsBySP")
    .get(job_controller.allRequestedJobsBySPId);

jobRoute
    .route("/JobPostRoutes/responces")
    .post(job_controller.addResponse)
    .get(job_controller.allResponses);

jobRoute
    .route("/JobPostRoutes/matchSkills")
    .post(job_controller.getmatchedskilledHelpers)

jobRoute
    .route("/HiredJobs")
    .post(job_controller.addHiredJob)
    .get(job_controller.getHiredHelper)

jobRoute
    .route("/JobsCurrentbySpId")
    .get(job_controller.getCurrentJobsbySpId)

    jobRoute
    .route("/AddJobSP")
    .patch(job_controller.addJobSP)

module.exports = jobRoute;