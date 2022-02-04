const router = require("express").Router();
const Conversation = require("../model/Conversation");



//new Conversation
router.post("/conversation", async (req,res)=>{



    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
   
    try{
      
       const savedConversation = await newConversation.save();
       res.status(200).json(savedConversation);
      
    }catch(err){
        res.status(500).json(err)
    }
  

}); 
//get conv of a user

router.get("/conversation/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation).sort({createdAt:-1});
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports= router;