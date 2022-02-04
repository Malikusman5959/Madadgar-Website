const Review = require("../model/Review");

//Create a review
exports.addReview = async function (req, res) {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review: review,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "review posting unsuccessful",
      message: e,
    });
  }
};

//Get All reviews
exports.allReviewsBySPId = async function (req, res) {
  try {
    var reviews = await Review.find().populate(['customerId' , 'serviceProvidersId' , 'jobId']);
    const allreviews = Object.keys(reviews).length;
    res.status(201).json({
      status: "success",
      total: allreviews,
      data: {
        reviews: reviews,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "failed to get data from db",
    });
  }
};


