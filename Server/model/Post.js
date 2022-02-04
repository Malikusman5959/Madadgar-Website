  
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
     
    },
    serviceProvidersId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
    },
    title:{
        type: String,
        required: true,
    },
    skills:[String],
    
    Description:{
        type:String,
        required: true,
     
    },
    Budget:{
        type:String,
        required: true,
    },   
    location:{
        type:String,
        required: true,
     
    },
    address:{
        type:String,    
    },
    jobType:{
        type:String,
        required: true,
     
    },
    jobStatus:{
        type:String,
        required: true,
     
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);