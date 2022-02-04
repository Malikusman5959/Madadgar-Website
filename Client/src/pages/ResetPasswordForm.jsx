import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Nav from './nav';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const ResetPasswordForm = (email) => {
    const codeRef = useRef();
    const passRef = useRef();
    const conPassRef = useRef();
    let navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [match, setMatch] = useState(true);
    const [msg, setMsg] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const validatePassword = (data) => {
        if (
            data.match(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
            )
        ) {
            return true
        } else {
            return false
        }
    };

    function checkEmpty() {
        if (password == "" || confirmPass == "") {
            setMatch(false)
            setMsg("All fields are required")
        } else {
            passwordMatch(passRef.current.value, conPassRef.current.value)
        }
    }

    function passwordMatch(pass1, pass2) {
        console.log(pass1 + "pass2" + pass2)
        if (pass1 === pass2) {
            sendOtp()
        }
        else {
            setMatch(false)
            setMsg("Password Mismatch")

        }
    }

    function changeBackground(e) {
        e.target.style.background = 'white';
        e.target.style.color = '#2757c0';
    }
    function changeToDefault(e) {
        e.target.style.background = '#2757c0';
        e.target.style.color = 'white';

    }
    //..........Change password method...........
    const sendOtp = async () => {
        try {
            let url = 'http://localhost:8000/v1/changePassword'

            let options = {
                method: 'POST',
                url: url,
                data: {
                    code: codeRef.current.value,
                    password: passRef.current.value,
                    email: email.email
                }
            }
            let response = await axios(options)
            console.log(response.data.status.response)
            let record = response.data.status.response;
            if (record.statusText == 'Success') {
                toast.info(record.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                setTimeout(() => {
                    navigate('/user/login')
                }, 2000);


            } else {
                toast.error(record.message, {
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


    useEffect(() => {

    }, [match])


    return (
        <div>
            <div className="auth" >
                <header >
                    <Nav></Nav>
                </header>
                <div style={{ height: "300px", width: "50%", backgroundColor: "#2575c0", margin: "13% 0% 0% 25%", borderRadius: "20px", padding: '3%' }}>
                    <h1 style={{ marginBottom: "3%", fontSize: "26px", color: "white", fontWeight: 'bold' }}>Reset Password: </h1>
                    <input style={{ fontSize: "14px", width: "100%", borderRadius: '5px', fontWeight: '600' }} type="text" name='code' ref={codeRef} placeholder='Enter 4-digit OTP' />
                    <input style={{
                        fontSize: "14px", width: "100%", borderRadius: '5px', fontWeight: '600', border:
                            password === ""
                                ? ""
                                : validatePassword(password) === true
                                    ? "solid 1px #707070"
                                    : "1px solid red",
                    }}
                        type="password" name='password' placeholder='Enter New Password' ref={passRef}
                        onChange={(e) => {
                            setMatch(true);
                            setPassword(e.target.value);

                        }}

                    />
                    <input style={{
                        fontSize: "14px", width: "100%", borderRadius: '5px', fontWeight: '600', border:
                            confirmPass === ""
                                ? ""
                                : validatePassword(confirmPass) === true
                                    ? "solid 1px #707070"
                                    : "1px solid red",
                    }} type="password" name='confirmPassword' placeholder='Confirm Password' ref={conPassRef} onChange={(e) => {
                        setConfirmPass(e.target.value)
                        setMatch(true);
                    }}

                    />
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

                        onClick={(e) => { checkEmpty() }}
                    >
                        Reset password
                    </button>
                    {match ? null : <p style={{ fontSize: "16px", color: 'white' }}><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {msg}</p>}
                </div>
            </div>
            <div style={{ fontSize: '16px' }}>
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

export default ResetPasswordForm
