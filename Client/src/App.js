import "./App.css";
import "./style/auth.css";
import "./style/normalize.css";
import "./style/fonts.css";
import "./style/variables.css";
import "./style/text.css";
import "./style/base.css";
import "./style/home.css";
import "./style/header.css";
import "./style/top-bar.css";
import "./style/footer.css";
import "./style/inputs.css";
import "./style/burger-menu.css";
import "./style/media-queries.css";
import "./style/payments.css";
import "./style/select.css";
import "./style/pay.css";
import { useState, useEffect , useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { Snackbar } from '@material-ui/core';

import SnackbarContent from "@material-ui/core/SnackbarContent";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BodyHolder,
  Homepage,
  Search,
  Login,
  HiringStep,
  Registration,
  User,
  Images,
  Messenger,
  AdminPanel,
  AskQuestion,
  ViewYourQuestion,
  EditQuestion,
  ViewQuestion,
  HelperAccount,
  EditAnswer,
  Notification,
  CustomerAccount,
  AdminHome,
  JobNotification,
  ForgotPassword,
} from "./pages/pages";

const App = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(null);
  const [notification, setNotification] = useState(null);
 
  const option = {
    Vote: 'Voted Your Answer on Question',
    Answer: 'Answered Your Question',
    NewJob: "Posted A New Job",
    NewResponse: "Responded To Your Job Request",
    Hire: "Hired You For A Job",
    Complete:"Completed Your Job"
} 
 const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
     socket.current.on("getNotification", (data) => {
      handleClick(data.spname, option.Answer);
      // alert(data.spname + " answered your question ");
     });

     socket.current.on("sendNotification", (data) => {
         
        handleClick(data.customer_name, option.Vote);
   
       });

       socket.current.on("sendJobNotification", (data) => {
       
         
        handleClick(data, option.NewJob);
   
       });

       socket.current.on("sendResponseNotification", (data) => {

        handleClick(data, option.NewResponse);
   
       });

       socket.current.on("sendHireNotification", (data) => {

        handleClick(data, option.Hire);
   
       });

       socket.current.on("sendCompleteJobNotification", (data) => {

        handleClick(data, option.Complete);
   
       });
    
    

  }, []);

  const [user, setUser] = useState([null]);
  
  
  useEffect(() => {
      const getUser = async () => {
          try {
             let id = localStorage.getItem('user');
              const url = `http://localhost:8000/v1/serviceProvider/${id}`;
              let res = await axios.get(url);
              setUser(res.data.data.provider[0]);

          } catch (err) {
              console.log(err);
          }
      };
      getUser();
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
 //     setOnlineUsers(
 //       user.followings.filter((f) => users.some((u) => u.userId === f))
 //     );
    });
  }, [user]);


  
  const handleClick = (data, option) => {
    setNotification(data);
    setOptions(option);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <>
        <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <SnackbarContent style={{
      fontSize:'14px',
      height:'50px'
    }}
    message={<span id="client-snackbar">{notification + " " } {options} </span>}
  />
      </Snackbar>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>


          <Route path="/user" element={<BodyHolder />}>

            <Route path="home" element={<Homepage />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="hiring" element={<HiringStep />}></Route>
            <Route path="registration" element={<Registration />}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="images" element={<Images />}></Route>
            <Route path="messenger" element={<Messenger />}></Route>
            <Route path="adminpanel" element={<AdminPanel />}></Route>
            <Route path="askquestion" element={<AskQuestion />}></Route>
            <Route path="viewyourquestions" element={<ViewYourQuestion />}></Route>
            <Route path="editquestion" element={<EditQuestion />}></Route>
            <Route path="viewquestion" element={<ViewQuestion />}></Route>
            <Route path="helperAccount" element={<HelperAccount />}></Route>  
            <Route path="customerAccount" element={<CustomerAccount />}></Route>
            <Route path="editanswer" element={<EditAnswer />}></Route>     
            <Route path="notification" element={<Notification />}></Route>
            <Route path="adminHome" element={<AdminHome />}></Route>\
            <Route path="jobNotification" element={<JobNotification />}></Route> 
            <Route path="ForgotPassword" element={<ForgotPassword />}></Route> 
            
          </Route>
        </Routes>
      </div>
    </Router>
  </>
  );
};

export default App;
