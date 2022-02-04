import { useState, useEffect } from 'react';
import "../../App";

import "./../../style/normalize.css";
import "./../../style/fonts.css";
import "./../../style/variables.css";
import "./../../style/text.css";
import "./../../style/base.css";
import "./../../style/home.css";
import "./../../style/header.css";
import "./../../style/top-bar.css";

import "./../../style/inputs.css";
import "./../../style/burger-menu.css";
import "./../../style/media-queries.css";
import "./../../style/pay.css";
import "./../../style/payments.css";
import "./../../style/select.css";
import "./../../style/user.css";
import "./../../style/setPassClass.css"

import axios from "axios";
import VM from "../ValidationMethods";

const SetPassword = () => {

    //UseStates
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    let [data, setData] = useState([]);
    const [formData, setFormData] = useState([{}]);
    let [userData, setUserData] = useState({});
    const [formfilled, setformfilled] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [passAlert, setPassAlert] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [msg, setmsg] = useState(false)

    //API methods

    const getData = async (url, sub_Data) => {
        let res = await axios.patch(url, sub_Data);
        return res.data;
    };
    const getuserData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    //getset methods

    let getSearchedData = async () => {
        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getData(url, formData);
        console.log(newData)
        setData(newData.status);
    }

    let getSearchedPassword = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getuserData(url);
        console.log(newData.data.provider[0])
        setUserData(newData.data.provider[0])
    };
    useEffect(() => {
        getSearchedPassword();
        if (formfilled === true) {
            getSearchedData()

        }
    }, [formfilled, passAlert])

    return (
        
            <div className="passwordcontainer" >
                    <div className="splited-col">
                        <h1 style={{fontSize: "x-large"}}><b>Change Password</b></h1>
                        <label style={{ display: "block" , fontSize: "medium"}}>
                            Current Password
                            <input type="password" className="setPassClass" value={oldPassword}
                                onChange={(event) => {
                                    setOldPassword(event.target.value);
                                    setPassAlert(false);
                                    setEmpty(false);
                                    setmsg(false);
                                }}
                                required />
                        </label>
                        <label style={{ display: "block" ,fontSize: "medium"}}>
                            Password
                            <input type="password" className="setPassClass" value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setPassAlert(false);
                                    setEmpty(false);
                                    setmsg(false);
                                }}
                                style={{
                                    border:
                                        password === ""
                                            ? ""
                                            : VM.validatePassword(password) === true
                                                ? "solid 1px #707070"
                                                : "1px solid red",
                                }}
                            />
                        </label>
                        <label style={{ display: "block" , fontSize: "medium"}}>
                            Confirm Password
                            <input type="password" className="setPassClass" value={confirmPass}

                                onChange={(event) => {
                                    setConfirmPass(event.target.value);
                                    setPassAlert(false);
                                    setEmpty(false);
                                    setmsg(false);

                                }}
                                style={{
                                    border:
                                        confirmPass === ""
                                            ? ""
                                            : VM.validatePassword(confirmPass) === true
                                                ? password === confirmPass ? "solid 1px #707070" : "1px solid red"
                                                : "1px solid red",
                                }} />
                        </label>
                        <div
                            className="passwordbtn"
                            style={{ maxWidth: "35%", marginLeft: "5%", marginTop: "0" }}
                            onClick={() => {
                                if (password !== "" && oldPassword !== "" && confirmPass !== "") {
                                    if (userData.password !== oldPassword) {
                                        setPassAlert(true)
                                        setPassword("")
                                        setOldPassword("")
                                        setConfirmPass("")

                                    }
                                    else {
                                        if(confirmPass === password){
                                        setformfilled(true)
                                        setPassword("")
                                        setOldPassword("")
                                        setConfirmPass("")
                                        setFormData({
                                            password: password,
                                        });
                                    }
                                else{
                                    setmsg(true);
                                    setEmpty(false);
                                    setformfilled(false)
                                    setPassword("")
                                    setOldPassword("")
                                    setConfirmPass("")
                                    setPassAlert(false)
                                }}
                                }
                                else {
                                    setEmpty(true);
                                    setformfilled(false)
                                    setPassword("")
                                    setOldPassword("")
                                    setConfirmPass("")
                                    setPassAlert(false)
                                }
                            }}
                        >
                            Save
                        </div>
                        {passAlert == true ? <div style={{ border: "1px solid red", width: "100%" }}><p style={{ color: "red", fontSize: "15px" }}>
                            Incorrect current password </p></div> : null}

                        {formfilled == true ? <div style={{ border: "1px solid green", width: "100%" }}><p style={{ color: "green", fontSize: "15px" }}>
                            password Updated
                        </p></div> : null}

                        {empty == true ? <div style={{ border: "1px solid red", width: "100%" }}><p style={{ color: "red", fontSize: "15px" }}>
                            All fields required
                        </p></div> : null}
                        {msg == true ? <div style={{ border: "1px solid red", width: "100%" }}><p style={{ color: "red", fontSize: "15px" }}>
                            Password did not match
                        </p></div> : null}


                    </div>
               
            </div>
    )
}

export default SetPassword
