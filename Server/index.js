const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path= require('path');


// Routers
const conversationRouter= require("./router/conversation");
const messageRouter= require("./router/message");
const service_provider = require("./router/r_serviceProvider");
const login = require("./router/r_login");
const search = require("./router/r_search");
const questionRouter = require('./router/question');
const answerRouter = require('./router/answer');
const helperAccount = require('./router/HelperAccount');
const notificationRouter = require('./router/notifications');
const voteRouter = require('./router/vote');
const JobPostRoutes = require('./router/JobRoutes');
const ReviewRoute = require('./router/ReviewRoute');
const ReportRoute = require('./router/ReportRoute');
const forgotPasswordRoutes = require("./router/ForgotPasswordRoutes");
const emailVerificationroutes = require("./router/emailVerificationRoutes");

// Middlwares
const app = express();

app.use(bodyParser.json());;
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// .env
const port = process.env.PORT || 8000;

// connection
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected..."))
  .catch((er) => console.log(er));



// call routers
app.use("/v1", login);
app.use("/v1", search);
app.use("/v1", messageRouter);
app.use("/v1", conversationRouter);
app.use("/v1", questionRouter);
app.use("/v1", answerRouter);
app.use("/v1", service_provider);
app.use("/v1", helperAccount);
app.use("/v1", notificationRouter);
app.use("/v1", voteRouter);
app.use("/v1", JobPostRoutes);
app.use("/v1", ReviewRoute);
app.use("/v1", ReportRoute);
app.use("/v1", forgotPasswordRoutes);
app.use("/v1", emailVerificationroutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// information
app.listen(port, () => {
  console.log("server Activited");
});
