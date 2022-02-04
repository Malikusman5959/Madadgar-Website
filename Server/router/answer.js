const router = require("express").Router();
const Answer = require("../model/Answer");
const Question = require("../model/Question");
const {upload} = require('../helpers/filehelper');
const {newAnswerNotification}= require("../utils/notificationActions");

router.post("/answer",upload.single('file'), async (req,res, next)=>{
    try{
    const { spId, qId, answer } = req.body;
    const { file } = req;
      if(answer.length<1){
         res.status(401).send('Answer should contain any text');
      }
     const question= await Question.findById(qId);
    
     if(!question){
         res.status(404).send('Question not found');
     }
    
    const newAnswer = new Answer({
        spId,
        qId,
        answer,
        file: (file && file.filename) || null,
      });
       const savedAnswer = await newAnswer.save();
       if(question.customerId!== spId){

           await newAnswerNotification(qId, newAnswer._id, spId, question.customerId, answer );
       }
       res.status(200).json(savedAnswer);
       
    }catch(error) {
        res.status(400).send(error.message);
    }
}); 

router.get("/answers/:questionId", async(req, res)=>{
    const answers = await Answer.find({
        qId : req.params.questionId
    }).populate('spId').sort({createdAt:-1});
    res.status(200).json(answers);

}); 

router.get("/answers/:questionId", async(req, res)=>{
    const answers = await Answer.find({
        qId : req.params.questionId
    }).sort({createdAt:-1});
    res.status(200).json(answers);

});


router.delete("/answer/delete/:ansId/:userId", async (req, res, next) => {
    var answerID = req.params.ansId;
    var userID = req.params.userId;

    const answer= await Answer.findById(answerID);
     if(!answer){
         res.status(404).send('Answer not found');
     }
     if(!answer.spId.equals(userID)){
        res.status(401).send('You cannot delete other answers');
     }
     else {
        await Answer.deleteOne({
            _id : answerID
        } , function (error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        })
      
    } 
});

router.put("/answer/edit/:ansId/:userId", async (req, res, next) => {
    var answerID = req.params.ansId;
    var userID = req.params.userId;

    const answer= await Answer.findById(answerID);
     if(!answer){
         res.status(404).send('Answer not found');
     }
     if(!answer.spId.equals(userID)){
        res.status(401).send('You cannot delete other answers');
     }
    
     else {
        await  Answer.findOneAndUpdate({
            _id: answerID
        }, req.body, {
            new: true,
           
        },function (error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        })
      
    } 
});

module.exports= router;