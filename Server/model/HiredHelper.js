
const mongoose = require("mongoose");

const HiredHelperSchema = new mongoose.Schema(
    {
        serviceProviderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",

        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },

        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",
        },

        payment: {
            type: String,
        },

        startDate: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("HiredHelper", HiredHelperSchema);