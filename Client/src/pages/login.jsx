import React from "react";
import signIn from "./../img/sign-in.png";
import logo from "./../img/logo2.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// import { Route } from 'react-router'

import { useState } from "react";
import Nav from "./nav";

const validateEmail = (data) => {
  if (
    data.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return true;
  } else {
    return false;
  }
};
const validatePassword = (data) => {
  if (
    data.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const valdiateForm = (email,password) => {
  if (validatePassword(password) === true && validateEmail(email) === true) {
    return true;
  } else {
    return false;
  }
};
const Login = (props) => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [data, setData] = useState([]);
  let [message,setMessage]=useState('');


  // call an api 
  
  const getData = async (url, sub_Data) => {
    let res = await axios.post(url, sub_Data);
    return res.data;
  };

  // skills: [searchItem]
  let getSearchedData = async () => {
    const data = {
      email: email,
      password: password,
    };
    
    const url = "http://localhost:8000/v1/login";
    const newData = await getData(url, data);
    setData(newData.data.provider);
    console.log(newData);
    
    if(newData.data.provider == null)
    {
      setMessage(" Invalid email or password")
      console.log(newData.data.provider == null)
    }
    else
    {
      console.log(newData.data.provider == null)

    if (newData.data.provider.user_type == "Helper")
    {
      if(newData.data.provider.certify == "Blocked"){
        setMessage("Account access blocked. Please contact with administration")

      }
      else{
   navigate('/user/helperAccount');
   localStorage.setItem('user', newData.data.provider._id);
      }
    }
    else if (newData.data.provider.user_type == "Customer")
    {
  navigate('/user/CustomerAccount');
  localStorage.setItem('user', newData.data.provider._id);
  
    }
  }

  };


  const findUser =(e)=>{
    e.preventDefault();
    if(valdiateForm(email,password) === true){
      getSearchedData();
  
    }
    else{
      setMessage(" Incorrect email or password")
    }

  }


  return (
    <div className="auth">
      <header >
        <Nav></Nav>
      </header>

      <main className="auth-main sign-in-main">
        <div className="container">
          <div className="auth-main__row row">
            <div
              className="auth-main__row__left-col col-sm-7 col-12"
              id="borders"
            >
             

              <h1>
                Welcome, Sign in to join <span className="ids">Madadgar</span>{" "}
              </h1>
            </div>
            <div className="auth-main__row__right-col col-sm-5 col-12">
             
              <form action="#">
                <label>
                  <label>
                    Email Address
                    <input
                      onChange={(event) => {
                        validateEmail(event.target.value) === true
                          ? setEmail(event.target.value)
                          : setEmail(event.target.value);
                          setMessage('')
                      }}
                      type="email"
                      name="email"
                      required
                      style={{
                        border:
                          email === ""
                            ? ""
                            : validateEmail(email) === true
                            ? "solid 1px #707070"
                            : "1px solid red",
                      }}
                    />
                  </label>
                  <label>
                    Password
                    <input
                      onChange={(event) =>{
                       setPassword(event.target.value)
                          setMessage('')
                      }}
                      type="password"
                      className="password-input"
                      name="password"
                      required
                      style={{
                        border:
                          password === ""
                            ? ""
                            : validatePassword(password) === true
                            ? "solid 1px #707070"
                            : "1px solid red",
                      }}
                    />
                    <p className="password-input__security-btn">Show</p>
                  </label>
                  <div style={{

                    borderBottom:message === ""? null :'1px solid red',
                    padding:"10px",
                    fontSize:'16px'

                  }}> {message === ""? null : <i class="fas fa-times" style={{color:"red" , marginRight:"5px"}}> </i>}{message}</div>
                  <button onClick={(event)=>{
                    findUser(event);
                  }} className="sign-in-btn main-btn">Sign in</button>


                  <button className="forget-password" onClick={()=>{    navigate('/user/ForgotPassword')}}>Forget password?</button>
                </label>
              </form>
              <div className="different-auth">
                <span>
                  If you don't have an account, Please create an account below
                </span>
                <a
                  className="main-btn_transparent sign-up-btn"
                  onClick = {()=>{    navigate('/user/registration')}}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
