const forgotPassword = require("../model/ForgotPasswordOtp");
const serviceProvider = require("../model/ServiceProivder");
const nodemailer = require("nodemailer");


//Create a review
exports.sendEmail = async function (req, res) {
    try {
        const data = await serviceProvider.findOne({ email: req.body.email });

        console.log(new Date().getTime() + 300 *1000)
        const response = {}
        if (data) {
            let otpCode = Math.floor((Math.random() * 10000) + 1);
            let otpData = new forgotPassword({
                email: req.body.email,
                code: otpCode,
                expiry: new Date().getTime() + 300 *1000
            })
            let otpResponse = await otpData.save();
            response.statusText = 'Success'
            mailer(req.body.email,otpCode);
            response.message = 'Code sent. Please check your Email'
        }
        else {
            response.statusText = 'unsuccessfull'
            response.message = 'Email address not registered'
        }
        res.status(201).json({
            status: { response },
        });
    } catch (e) {
        res.status(400).json({
            status: "unable to send email",
            message: e,
        });
    }
};

//Get All reviews
exports.changePassword = async function (req, res) {
    try {
        let data = await forgotPassword.findOne({email: req.body.email , code: req.body.code })
        const response = {};
        if(data){
           
            let currentTime = new Date().getTime();
            console.log("current time"+currentTime)
            let diff = data.expiry - currentTime;
            console.log("diff time"+diff)

            if(diff <0){
                response.message = 'Code Expired'
                response.statusText = 'error'
            }
            else{
                let user =  await serviceProvider.findOne({email:req.body.email})
                user.password = req.body.password
                user.save();
                response.message = 'password changed successfully'
                response.statusText = 'Success'
            }
        }
        else{
            response.message = 'Invalid OTP'
            response.statusText = 'error'
        }
        res.status(201).json({
            status: {response},
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "failed to get data from db",
        });
    }
};

const mailer = (email, otp) => {


        //send email
        let transporter = nodemailer.createTransport({
          service : 'gmail',
          auth: {
              user: 'madadgarco@gmail.com', // ethereal user
              pass: 'madadgar123', // ethereal password
          },
      });
      
      const msg = {
          from: 'Madadgar Co. <madadgarco@gmail.com>', // sender address
          to: `${email}`, // list of receivers
          subject: "Your OTP Code", // Subject line
          text: `Hello Dear User, 
          
          It has come to our knowledge that you have forgotten your password. Here is the OTP to reset your password: 
          
         Code: ${otp}
          
         If you are still not able to reset your password please contact the administartion
         
         Regards,
         Madadgar Management`, // plain text body
      }
         
         // send mail with defined transport object
          const info =  transporter.sendMail(msg,
              (error) => {
                  if (error) {
                      return res.json({
                          error: "This email doesnt exist.",
                      });
                  }
                  ;
              });


}



