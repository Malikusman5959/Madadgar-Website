const mongoose = require("mongoose");

const ServiceProvider = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  dbo: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  eduction: [
    {
      institution: {
        type: String,

      },
      degree: {
        type: String,

      },
      start_date: {
        type: String,

      },
      end_date: {
        type: String,

      },
    },
  ],
  skill: [String],
  
  rating: {
    type: Number,
  },
  profile_pic: {
    type: String
  },
  address: {
    type: String,

  },
  certify: {
    type: String,

  },
  block: {
    type: String,

  },
  face: {
    type: String,

  },
  registrationDate: {
    type: Date,
    default: Date.now
  },

},



);

module.exports = mongoose.model("ServiceProvider", ServiceProvider);
