const router = require("express").Router();
const Question = require("../model/Question");

const {upload} = require('../helpers/filehelper');
const Answer = require("../model/Answer");
const Notification = require("../model/Notification");



router.post("/question",upload.single('file'), async (req,res, next)=>{
    const { customerId, title, body } = req.body;
    const { file } = req;
    
    const newQuestion = new Question({
        customerId,
        title,
        body,
        file: (file && file.filename) || null,
      });

    try{
       const savedQuestion = await newQuestion.save();
       res.status(200).json(savedQuestion);
    }catch(error) {
        res.status(400).send(error.message);
    }
}); 


router.get("/allquestions", async(req, res)=>{
    try{
        const questions = await Question.find().sort({createdAt:-1});
        res.status(200).send(questions);
    }catch(error) {
        res.status(400).send(error.message);
    }

});

router.get("/yourquestions/:id", async(req, res)=>{
    const questions = await Question.find({
        customerId : req.params.id
    }).sort({createdAt:-1});
    res.status(200).json(questions);

});

router.delete("/yourquestions/:id", async (req, res, next) => {
    var questionID = req.params.id;
    if (!questionID) {
      resStatusAndMessage(res, 400, "Null ID");
    } else {
        let result=await Answer.deleteMany({qId:questionID});
    
       
        console.log( JSON.stringify(result1));
        //console.log(result1);
        await Question.deleteOne({
            _id : questionID
        } , function (error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        })
      
    } 
});



router.put("/yourquestions/edit/:id", async (req, res, next) => {
    var questionID = req.params.id;
    if (!questionID) {
      resStatusAndMessage(res, 400, "Null ID");
    } else {
        await  Question.findOneAndUpdate({
            _id: questionID
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