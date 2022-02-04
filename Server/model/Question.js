const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    file:{
        type:String,
        
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);