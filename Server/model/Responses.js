
const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    ServiceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",

    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    ResponseText: {
      type:String,
      required:true
    },

    Status: {
      type:String,
    },

    Budget: {
      type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("response", ResponseSchema);