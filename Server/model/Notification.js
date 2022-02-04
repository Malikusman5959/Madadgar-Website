  
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
     
    },
    notifications:
    [
       {
           user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider", 

           },
           type:{
               type: String,
               enum:['newVote', 'newAnswer']
           },
           question:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question", 

           },
           answerId : {
               type: String,
           },
           text: {
               type:String,
           },
           date: { type: Date, default: Date.now }
           
        
       }
    ],
       
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);