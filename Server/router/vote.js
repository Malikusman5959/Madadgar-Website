const router = require("express").Router();
const Vote = require("../model/Vote");
const Answer = require("../model/Answer");
const {newVoteNotification}= require("../utils/notificationActions");

router.post("/vote", async (req,res, next)=>{
    try{
        
    const { customerId, answerId,} = req.body;
    const answer= await Answer.findById(answerId);
    
     if(!answer){
         res.status(404).send('Answer not found');
     }
    const vote = await Vote.findOne({ customerId: customerId, answerId: answerId });
    
   
    if(vote !== null){
        res.status(409).json('You have already voted');
    }
    else{
    const newVote = new Vote({
        customerId: customerId,
        answerId: answerId,
        voted: true
      });
       const savedVote = await newVote.save();
       if(answer.spId!== customerId){

        await newVoteNotification(answer.qId, answerId, customerId,answer.spId );
    }

       res.status(200).json(savedVote);
    }
       
    }catch(error) {
        res.status(400).send(error.message);
    }
}); 

router.get("/votes/:answerId", async(req, res)=>{
    const votes = await Vote.find({
        answerId : req.params.answerId
    }).sort({createdAt:-1});
    res.status(200).json(votes);

});



module.exports= router;