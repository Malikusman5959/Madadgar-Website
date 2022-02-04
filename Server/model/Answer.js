  
const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    spId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
     
    },
    qId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
       
    },
    answer:{
        type:String,
        required: true,
     
    },
    file:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", AnswerSchema);