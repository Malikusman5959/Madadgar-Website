  
const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
     
    },
    answerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
       
    },

    voted: { 
          type: Boolean,
         default: false 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", VoteSchema);