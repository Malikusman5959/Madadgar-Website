
const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",

        },

        //who reported? customer or service provider
        reportedBy : {
            type: String,
            required: true,
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        serviceProvidersId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider",
        },
        ReportSubject: {
            type: String,
            required: true,
        },
        ReportText: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);