const mongoose = require("mongoose");

const JobNotificationSchema = new mongoose.Schema(
  {
    userToNotify:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
     
    }],
    notifications:
    [
       {
           user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceProvider", 

           },
           type:{
               type: String,
               enum:['newJob','newResponse', 'hire', 'complete']
           },
           post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", 

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

module.exports = mongoose.model("JobNotification", JobNotificationSchema)