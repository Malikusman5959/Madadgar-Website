
const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
        type:String,
        required:true

    },
    code: {
        type:String,
        required:true
    },

    expiry: {
      type:Number,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OtpSchema);