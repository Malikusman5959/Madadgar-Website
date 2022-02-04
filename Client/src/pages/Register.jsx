
import "./../App";
import "./../style/auth.css";
import "./../style/normalize.css";
import "./../style/fonts.css";
import "./../style/variables.css";
import "./../style/text.css";
import "./../style/base.css";
import "./../style/home.css";
import "./../style/header.css";
import "./../style/top-bar.css";
import "./../style/footer.css";
import "./../style/inputs.css";
import "./../style/burger-menu.css";
import "./../style/media-queries.css";
import "./../style/pay.css";
import "./../style/payments.css";
import "./../style/select.css";
import "./../style/user.css";
import Selector from "./selectorMenu";
import _1 from "./../img/logo.png";
import _4 from "./../img/sign-in.png";
import _2 from "./../img/employee.svg";
import _3 from "./../img/CustomerRegister.png";
import _5 from "./../img/no-picture.png";
import _6 from "./../img/plus.svg";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from 'react-router-dom';
import Nav from './nav';
//validation methods
import VM from "./ValidationMethods";



const valdiateForm = (first, last, dob, gender, cnic, email, mobile, city, password, confirmPass) => {

    if (first !== "" && last !== "" && VM.validateDOB(dob) && VM.validateCnic(cnic) && VM.validateMobile(mobile) && VM.validatePassword(password) === true && password === confirmPass && VM.validateEmail(email) === true) {
        return true;
    } else {
        return false;
    }
};
const valdiateFormCustomer = (first, last, dob, gender, cnic, email, mobile, city, password, confirmPass, address) => {

    if (first !== "" && last !== "" && VM.validateDOB(dob) && VM.validateMobile(mobile) && VM.validatePassword(password) === true && password === confirmPass && VM.validateEmail(email) === true && address !== '') {
        return true;
    } else {
        return false;
    }
};

const valdiateEducationForm = (Ins, deg, frm, till) => {

    if (Ins === "" || deg === "") {
        return false
    }

    if (VM.validateFromDate(frm, till) && VM.validateTillDate(till, frm)) {
        return true;
    } else {
        return false;
    }

};

function Register() {


    //education tag 
    function EducationCard({ item }) {
        let { institution, degree, start_date, end_date } = item;
        return (
            <>
                <div className="edu-card">
                    <p className="institute">
                        {institution}
                    </p>
                    <p className="degree"> {degree}</p>
                    <p className="year "> {start_date} - {end_date} </p>
                    <div className="close-btn" onClick={() => { removeEdu(item) }}>
                        x
                    </div>
                </div>
            </>
        )
    }

    //skill tag 
    function SkillCard({ item }) {

        return (
            <>
                <div className="skill-card">
                    <p className="skill">{item}</p>
                    <div className="close-btn" onClick={() => { removeSkill(item) }}>
                        x
                    </div>
                </div>
            </>
        )
    }

    // Image
    const [url, setUrl] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg");

    const updatePhoto = (file) => {

        postImage(file);
    };

    const postImage = (file) => {

        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "qitwzs7qac");
        data.append("cloud_name", "madadgar");
        fetch("https://api.cloudinary.com/v1_1/madadgar/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
                loadModels();
            })
            .catch((err) => {
                console.log(err);
            });

    };
    //Selector options

    const cityOptions = [
        { value: "Islamabad" },
        { value: "Rawalpindi" },
        { value: "Lahore" },
        { value: "Karachi" },

    ];

    const genderOptions = [
        { value: "Male" },
        { value: "Female" },

    ];

    //page state
    let [page, setPage] = useState(0);
    let [count, setCount] = useState(1);
    //form state
    const [formData, setFormData] = useState([{}]);
    // user type
    const [userType, setuserType] = useState('')
    //data field states
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('Male');
    const [cnic, setcnic] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('Islamabad');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [address, setaddress] = useState('')
    //education fields
    const [Institute, setInstitute] = useState('');
    const [Degree, setDegree] = useState('');
    const [yearFrom, setYearFrom] = useState(2021);
    const [yearTill, setYearTill] = useState(2021);
    //skill field
    const [skill, setSkill] = useState('');

    //Education add/remove
    let [eduArr, setEduArr] = useState([]);

    // setData
    let [data, setData] = useState([]);


    //validation states
    const [emptyMsg, setEmptyMsg] = useState('')
    const [empty, setEmpty] = useState(false)

    //...........Face Detection for profile picture.............

    const [initializing, setInitializing] = useState(false);
    const [noFaceMsg, setNoFacemsg] = useState('')
    const [invisibleFaceMsg, setInvisibleFaceMsgmsg] = useState('')
    const canvasRef = useRef();
    const imageRef = useRef();
    const [result, setResult] = useState(true);
    const [imgScore, setimgScore] = useState(0.80);
    const [msgNum, setMsgNum] = useState(false)


    //.............. Method for profile picture verification......................
    const handleImageClick = async () => {
        try {
            if (initializing) {
                setInitializing(false);
            }
   
            setTimeout(() => {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    imageRef.current
                );
            }, 2000);

            const displaySize = {
                width: 220,
                height: 300
            };
            faceapi.matchDimensions(canvasRef.current, displaySize);

            const detections = await faceapi.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            console.log(detections)
            console.log(detections != undefined)
            if (detections != undefined) {
                setResult(true)
                const resizeDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current
                    .getContext("2d")
                    .clearRect(0, 0, imageRef.current.width, imageRef.current.height);
                faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
                console.log(resizeDetections.detection._classScore)
                setimgScore(resizeDetections.detection._classScore)
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections)
            }
            else {
                setResult(false);
            console.log(" in else block",result)

                return result
            }

            if(imgScore >=0.70 && result == true){
                setMsgNum(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    //.......... method for removing education...........
    const removeEdu = (education) => {
        let updatedEduArr = eduArr.filter((item) =>
            item !== education ? item : null
        );
        setEduArr(updatedEduArr);
    };

    // API CALL

    const getData = async (url, sub_Data) => {
        let res = await axios.post(url, sub_Data);
        return res.data;
    };

    // skills: [searchItem]
    let getSearchedData = async (event) => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getData(url, formData);
        console.log(newData)
        setData(newData.status);
    }
    let [skillArr, setSkillArr] = useState([]);

    const removeSkill = (skill) => {
        let updatedSkillArr = skillArr.filter((item) =>
            item !== skill ? item : null
        );
        setSkillArr(updatedSkillArr);
    };
    let navigate = useNavigate();
    //............Method for loading face detection models........................

    const loadModels = async () => {
        const MODEL_URL = process.env.PUBLIC_URL + "/models";
        setInitializing(true);
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])
            .then(console.log("success", MODEL_URL)).then(handleImageClick)
            .catch((e) => console.error(e));
    };



    useEffect(() => {
        if (count === 2) {
            console.log(formData)
            getSearchedData()
            setCount(3)
            navigate('/user/login')
        }
    }, [count])

    useEffect(() => {

        setNoFacemsg('Unclear or No face found. Please Upload an other Image')

    }, [result])

    useEffect(() => {

        setInvisibleFaceMsgmsg('Face is no visible. Please choose another Image')

    }, [imgScore])

    useEffect(()=>{
        setEmptyMsg('Please fill up the missing fields. OR upload the correct profile picture')
    }, [empty])


    return (
        <div id="full-page" className="auth">
            <header>
                <Nav />
            </header>

            <main className="auth-main sign-up-main">
                <div className="container">
                    <div className="auth-main__row row">
                        <div className="auth-main__row__left-col col-sm-6 col-12">
                            <h1>
                                Welcome, create new account and join <span> Madadgar </span>
                            </h1>
                        </div>

                        <div className="auth-main__row__right-col col-sm-6 col-12">
                            {page === 0 ? (
                                <div>
                                    <form action="#">
                                        <div className="sign-up__start-section sign-up__individual-section active">
                                            <p className="sign-up__section-label">WHO ARE YOU?</p>
                                            <div className="sign-up__start-section__plan">
                                                <div className="sign-up__start-section__plan-block individual active">
                                                    <div>
                                                        <img src={_2} alt="Employee" />
                                                    </div>
                                                    <p>Helper</p>
                                                </div>
                                                <div id='10' className="sign-up__start-section__plan-block corporate ">
                                                    <div>
                                                        <img src={_3} alt="Employee" />
                                                    </div>
                                                    <p>Customer</p>
                                                </div>
                                            </div>
                                            <div className="save-btn main-btn choose-account-btn" onClick={() => {
                                                // console.log(document.getElementById('sign-up__start-section__plan-block corporate'));
                                                document.getElementById('10').classList.contains('active') === true ?
                                                    setPage(3) : setPage(0);

                                            }}>
                                                Next
                                            </div>
                                            <p className="auth-copyright">
                                                Copy Rights Madadgar 2021, All Rights Reserved
                                            </p>
                                        </div>

                                        <div className="sign-up__individual-section section-step sign-up-individual">
                                            <div className="user-top-bar">
                                                <div
                                                    style={{ textAlign: "center" }}
                                                >
                                                    <div
                                                        className="user-top-bar__img-container"
                                                        style={{
                                                            maxWidth: "25em",
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        <div>

                                                            <span style={{ fontSize: "15px", marginRight: "5px" , color: 'green' }}>
                                                                
                                                                {imgScore >=0.70 && result == true  && msgNum == true? "Face Detected" : null}</span>
                                                           
                                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                                <img style={{fontSize: "15px" , textAlign: "center" , border: "2px solid #2575c0"}} ref={imageRef} src={url} alt="Upload a photo" crossOrigin='anonymous' height="300px" width="220px" />
                                                                <canvas style={{ position: "absolute", color: "blue" }} ref={canvasRef} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{
                                                height: "30px",

                                            }}>
                                                {console.log(result === false)}
                                                {result === false ? <div style={{ fontSize: "14px", display: "block" }}>
                                                    <p><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {noFaceMsg}</p>
                                                </div> : null}

                                                {imgScore <= 0.70 && result == true ?   <div style={{ fontSize: "14px" }}>
                                                    <p style={{ }}><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {invisibleFaceMsg} </p>
                                                </div>: null }
                                            </div>

                                            <div className="splited-col">
                                                <label>
                                                    First Name
                                                    <input type="text" id='fn' onChange={(e) => {
                                                        setFirst(e.target.value); 
                                                        setuserType('Helper')
                                                        setEmpty(false);

                                                    }}

                                                    />
                                                </label>
                                                <label>
                                                    Last Name
                                                    <input type="text" id='ln' onChange={(e) => { setLast(e.target.value);
                                                        setEmpty(false);
                                                    }} />
                                                </label>
                                            </div>

                                            <label>
                                                Picture
                                                <input type="file" onChange={(e) => {
                                                    updatePhoto(e.target.files[0]);
                                                    setResult(true);
                                                    setimgScore(0.80);
                                                    setEmpty(false);

                                                }}

                                                />
                                            </label>

                                            <label>
                                                Date of Birth
                                                <input type="date" className="tata" id="birthday" name="birthday"
                                                    style={{
                                                        border:
                                                            dob === ""
                                                                ? ""
                                                                : VM.validateDOB(dob) === true
                                                                    ? "solid 1px #707070"
                                                                    : "1px solid red",
                                                    }}
                                                    onChange={(e) => { setDob(e.target.value);
                                                        setEmpty(false);
                                                     }} />
                                            </label>
                                            <div className="custom-theme-select__container">
                                                Gender
                                                <Selector setOption={setGender} choosenOption={gender} optionList={genderOptions} />
                                            </div>
                                            <label>
                                                CNIC
                                                <input type="text"
                                                    style={{
                                                        border:
                                                            cnic === ""
                                                                ? ""
                                                                : VM.validateCnic(cnic) === true
                                                                    ? "solid 1px #707070"
                                                                    : "1px solid red",
                                                    }}
                                                    onChange={(e) => { setcnic(e.target.value)
                                                        setEmpty(false);
                                                     }} />
                                            </label>
                                            <label>
                                                Email Address
                                                <input type="email"
                                                    onChange={(event) => {
                                                        setEmail(event.target.value);
                                                        setEmpty(false);

                                                    }}
                                                    type="email"
                                                    style={{
                                                        border:
                                                            email === ""
                                                                ? ""
                                                                : VM.validateEmail(email) === true
                                                                    ? "solid 1px #707070"
                                                                    : "1px solid red",
                                                    }}
                                                />
                                            </label>

                                            <label>
                                                Mobile Number
                                                <input type="text"
                                                    onChange={(event) => {
                                                        setMobile(event.target.value);
                                                        setEmpty(false);

                                                    }}
                                                    style={{
                                                        border:
                                                            mobile === ""
                                                                ? ""
                                                                : VM.validateMobile(mobile) === true
                                                                    ? "solid 1px #707070"
                                                                    : "1px solid red",
                                                    }}
                                                />
                                            </label>

                                            <div className="custom-theme-select__container">
                                                City
                                                <Selector setOption={setCity} choosenOption={city} optionList={cityOptions} />
                                            </div>

                                            <label>
                                                Password
                                                <input type="password" className="password-input"
                                                    onChange={(event) => {
                                                        setPassword(event.target.value);
                                                        setEmpty(false);

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
                                                <p className="password-input__security-btn">Show</p>
                                            </label>
                                            <label>
                                                Confirm Password
                                                <input type="password" className="password-input"

                                                    onChange={(event) => {
                                                        setConfirmPass(event.target.value);
                                                        setEmpty(false)

                                                    }}
                                                    style={{
                                                        border:
                                                            confirmPass === ""
                                                                ? ""
                                                                : VM.validatePassword(confirmPass) === true
                                                                    ? password === confirmPass ? "solid 1px #707070" : "1px solid red"
                                                                    : "1px solid red",
                                                    }}

                                                />
                                                <p className="password-input__security-btn">Show</p>
                                            </label>
                                           {empty ?  <div>
                                                 <p style={{fontSize: "16px" }}><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {emptyMsg}</p>
                                            </div>: null}
                                            <div
                                                onClick={() => {
                                                    if (valdiateForm(first, last, dob, gender, cnic, email, mobile, city, password, confirmPass) === true && (imgScore >=0.70 && result == true) == true) { setPage(1) } 
                                                    else { setPage(0)
                                                            setEmpty(true)
                                                    }
                                                }}
                                                className="save-btn main-btn"
                                            >
                                                Next
                                            </div>
                                            <p className="auth-copyright">
                                                Copy Rights Madadgar 2021, All Rights Reserved
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : null}

                            {/* form2  */}

                            {page === 1 ? (
                                <div>
                                    <form action="#">
                                        <div className="sign-up__individual-section section-step sign-up-individual active">
                                            <p className="sign-up__section-label">
                                                Enter your educational background.
                                            </p>

                                            {/* education cards */}
                                            {eduArr.map((item, index) => (
                                                <EducationCard key={index} item={item}> </EducationCard>

                                            ))}
                                            <div className="splited-col" style={{ marginTop: "5px" }}>
                                                <label>
                                                    Institute
                                                    <input type="text" value={Institute} onChange={(e) => { setInstitute(e.target.value) }} />
                                                </label>
                                                <label>
                                                    Degree
                                                    <input type="text" value={Degree} onChange={(e) => { setDegree(e.target.value) }} />
                                                </label>
                                            </div>
                                            <div className="splited-col">
                                                <label>
                                                    From
                                                    <input
                                                        type="Number"
                                                        value={yearFrom}
                                                        style={{
                                                            maxWidth: "40%",
                                                            border:
                                                                VM.validateFromDate(yearFrom, yearTill) === true
                                                                    ? "solid 1px #707070" : "1px solid red",
                                                        }}
                                                        onChange={(e) => { setYearFrom(e.target.value) }}
                                                    />
                                                </label>
                                                <label>
                                                    Till
                                                    <input type="Number" value={yearTill}
                                                        style={{
                                                            maxWidth: "40%",
                                                            border:
                                                                VM.validateTillDate(yearTill, yearFrom) === true
                                                                    ? "solid 1px #707070" : "1px solid red",
                                                        }}
                                                        onChange={(e) => { setYearTill(e.target.value) }} />
                                                </label>
                                            </div>
                                            <div className="splited-col">
                                                <div className="save-btn main-btn"
                                                    onClick={() => {

                                                        if (valdiateEducationForm(Institute, Degree, yearFrom, yearTill) === true) {
                                                            //create education object
                                                            console.log(Institute + Degree + yearFrom + yearTill);
                                                            const test = {
                                                                institution: Institute,
                                                                degree: Degree,
                                                                start_date: yearFrom.toString(),
                                                                end_date: yearTill.toString()
                                                            }
                                                            setEduArr([...eduArr, test]);
                                                            setInstitute('');
                                                            setDegree('');
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </div>
                                                <div
                                                    className="save-btn main-btn"
                                                    onClick={() => setPage(2)}
                                                    style={{ maxWidth: "35%", marginLeft: "5%" }}
                                                >
                                                    Next
                                                </div>
                                            </div>
                                            <p className="auth-copyright">
                                                Copy Rights Madadgar 2021, All Rights Reserved
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : null}
                            {page === 2 ? (
                                <div>
                                    <form action="#">
                                        <div className="sign-up__individual-section section-step sign-up-individual active">
                                            <p className="sign-up__section-label">Enter your Skills.</p>

                                            {/* skill cards */}
                                            <div className="skills-container">

                                                {skillArr.map((item, index) => (
                                                    <SkillCard key={index} item={item}> </SkillCard>
                                                ))}

                                            </div>
                                            <label>
                                                Skill
                                                <input type="text" value={skill} onChange={(e) => { setSkill(e.target.value) }} />
                                            </label>

                                            <div className="splited-col">
                                                <div className="save-btn main-btn"
                                                    onClick={() => {
                                                        if (skill !== "") {
                                                            setSkillArr([...skillArr, skill]);
                                                            setSkill('');
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </div>
                                                <div
                                                    className="save-btn main-btn"
                                                    style={{ maxWidth: "35%", marginLeft: "5%" }}
                                                    onClick={() => {
                                                        (valdiateForm(first, last, dob, gender, cnic, email, mobile, city, password, confirmPass) === false) ?
                                                            alert('All fields are required') :
                                                            setFormData({
                                                                first_name: first,
                                                                last_name: last,
                                                                user_type: "Helper",
                                                                dbo: dob,
                                                                gender: gender,
                                                                cnic: cnic,
                                                                email: email,
                                                                phone_number: mobile,
                                                                city: city,
                                                                password: password,
                                                                eduction: eduArr,
                                                                skill: skillArr.map(item => item.toUpperCase()),
                                                                rating: 1,
                                                                profile_pic: url,
                                                                address: address,

                                                            });

                                                        setCount(2);
                                                    }
                                                    }
                                                >
                                                    Save
                                                </div>
                                            </div>

                                            <p className="auth-copyright">
                                                {data == "success" ? "Data Added" : "Fail to add Data"}
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : null}

                            {page === 3 ? (
                                <div>
                                    <form action="#">
                                        {/* Customer form */}
                                        <div className="sign-up__individual-section section-step sign-up-corporate active">
                                            <p className="sign-up__section-label">
                                                CUSTOMER REGISTRATION FORM
                                            </p>
                                            <div className="splited-col">
                                                <label>
                                                    First Name
                                                    <input type="text" id='fn' onChange={(e) => { setFirst(e.target.value); setuserType('Customer') }} />

                                                </label>
                                                <label>
                                                    Last Name
                                                    <input type="text" id='ln' onChange={(e) => { setLast(e.target.value) }} />
                                                </label>
                                            </div>
                                            <label>
                                                Date of Birth
                                                <input type="date" className="tata" id="birthday" name="birthday"
                                                    style={{
                                                        border:
                                                            dob === ""
                                                                ? ""
                                                                : VM.validateDOB(dob) === true
                                                                    ? "solid 1px #707070"
                                                                    : "1px solid red",
                                                    }}
                                                    onChange={(e) => { setDob(e.target.value) }} />
                                            </label>
                                            <label>
                                                Email Address
                                                <input type="email" onChange={(event) => { setEmail(event.target.value); }}
                                                    type="email"
                                                    style={{
                                                        border:
                                                            email === "" ? "" : VM.validateEmail(email) === true ? "solid 1px #707070" : "1px solid red",
                                                    }}
                                                />
                                            </label>

                                            <div className="splited-col-1-5">
                                                <label>
                                                    Phone Number
                                                    <input type="text"
                                                        onChange={(event) => {
                                                            setMobile(event.target.value);
                                                        }}
                                                        style={{
                                                            border: mobile === "" ? "" : VM.validateMobile(mobile) === true ? "solid 1px #707070" : "1px solid red",
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <div className="custom-theme-select__container">
                                                City
                                                <Selector setOption={setCity} choosenOption={city} optionList={cityOptions} />
                                            </div>
                                            <label>
                                                Address
                                                <input type="text" onChange={(e) => { setaddress(e.target.value) }} />
                                            </label>
                                            <label>
                                                Password
                                                <input type="password" className="password-input"
                                                    onChange={(event) => {
                                                        setPassword(event.target.value);
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
                                                <p className="password-input__security-btn">Show</p>
                                            </label>
                                            <label>
                                                Confirm Password
                                                <input type="password" className="password-input"

                                                    onChange={(event) => {
                                                        setConfirmPass(event.target.value);
                                                    }}
                                                    style={{
                                                        border:
                                                            confirmPass === ""
                                                                ? ""
                                                                : VM.validatePassword(confirmPass) === true
                                                                    ? password === confirmPass ? "solid 1px #707070" : "1px solid red"
                                                                    : "1px solid red",
                                                    }}

                                                />
                                                <p className="password-input__security-btn">Show</p>
                                            </label>
                                            <div className="custom-theme-select__container">
                                                Gender
                                                <Selector setOption={setGender} choosenOption={gender} optionList={genderOptions} />
                                            </div>
                                            <div
                                                className="save-btn main-btn"
                                                style={{ maxWidth: "35%", marginLeft: "5%" }}
                                                onClick={() => {
                                                    valdiateFormCustomer(first, last, dob, gender, cnic, email, mobile, city, password, confirmPass, address) === false ?
                                                        alert('All fields are required') :
                                                        setFormData({
                                                            first_name: first,
                                                            last_name: last,
                                                            user_type: userType,
                                                            dbo: dob,
                                                            gender: gender,
                                                            cnic: '',
                                                            email: email,
                                                            phone_number: mobile,
                                                            city: city,
                                                            password: password,
                                                            eduction: [],
                                                            skill: [],
                                                            rating: 0,
                                                            profile_pic: url,
                                                            address: address,

                                                        });

                                                    setCount(2);
                                                }
                                                }

                                            >
                                                Save
                                            </div>

                                            <p className="auth-copyright">
                                                Copy Rights Madadgar 2021, All Rights Reserved
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
}
export default Register;
