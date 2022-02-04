import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Nav from './nav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';


const ForgotPassword = () => {

  const emailRef = useRef();
  const [otp, setOtp] = useState(false)
 

  function changeBackground(e) {
    e.target.style.background = 'white';
    e.target.style.color = '#2757c0';
  }
  function changeToDefault(e) {
    e.target.style.background = '#2757c0';
    e.target.style.color = 'white';

  }

  const sendOtp = async () => {
    try {
      let url = 'http://localhost:8000/v1/sendEmail'
      let options = {
        method: 'POST',
        url: url,
        data: {
          email: emailRef.current.value
        }
      }
      let response = await axios(options)
      console.log(response.data)
      let record = response.data.status.response;
      if (record.statusText == 'Success') {
        toast.info( record.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
          setOtp(true)

      }else{
        toast.error( record.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
         
          });
      }
    } catch (error) {
      console.log(error)
    }

  }

  let navigate = useNavigate();
  return (
    <div>
      <div className="auth" >
        <header >
          <Nav></Nav>
        </header>
        {otp ? <ResetPasswordForm email={emailRef.current.value}/> :
        <div style={{ height: "300px", width: "50%", backgroundColor: "#2575c0", margin: "13% 0% 0% 25%", borderRadius: "20px", padding: '5%' }}>
          <h1 style={{ marginBottom: "3%", fontSize: "26px", color: "white", fontWeight: 'bold' }}>Forgot Password: </h1>
          <input style={{ fontSize: "14px", width: "100%", borderRadius: '5px', fontWeight: '600' }} type="email" name='email' ref={emailRef} placeholder='Enter your email address' />
          <button style={{
            backgroundColor: '#2575c0',
            padding: '2%',
            color: 'white',
            fontSize: '14px',
            marginTop: '3.5%',
            border: '3px solid #ffffff',
            borderRadius: '5px',
            fontWeight: '600',
            float: 'right',
            outline: 'none'
          }}
            onMouseEnter={changeBackground}
            onMouseLeave={changeToDefault}

            onClick={sendOtp}
          >

            Send OTP

          </button>
        </div>}
      </div>
      <div style={{fontSize:'16px'}}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
    </div>
  )
}

export default ForgotPassword
