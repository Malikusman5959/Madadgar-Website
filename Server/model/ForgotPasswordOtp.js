
const mongoose = require("mongoose");

const forgotPasswordOtpSchema = new mongoose.Schema(
  {
    email: {
        type:String,
        // required:true

    },
    code: {
        type:String,
        // required:true
    },

    expiry: {
      type:Number,
      // required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ForgotPasswordOtp", forgotPasswordOtpSchema);