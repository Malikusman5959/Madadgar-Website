
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",

        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        serviceProvidersId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",
        },
        rating: {
            type: String,
            required: true,

        },
        reviewText: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);