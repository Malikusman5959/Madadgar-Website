const express = require("express");
const ReviewController = require("../controller/ReviewController");
const reviewRoute = express.Router();

reviewRoute
    .route("/Review")
    .post(ReviewController.addReview)
    .get(ReviewController.allReviewsBySPId)


module.exports = reviewRoute;