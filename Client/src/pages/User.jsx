import { useState, useEffect } from 'react';
import './../style/PostJob.css'
import Selector from "./selectorMenu";
import '../App'
import './../style/auth.css'
import './../style/normalize.css'
import './../style/fonts.css'
import './../style/variables.css'
import './../style/text.css'
import './../style/base.css'
import './../style/home.css'
import './../style/header.css'
import './../style/top-bar.css'
import './../style/footer.css'
import './../style/inputs.css'
import './../style/burger-menu.css'
import './../style/media-queries.css'
import './../style/pay.css'
import './../style/payments.css'
import './../style/select.css'
import './../style/user.css'
import moment from 'moment';


import _1 from "./../img/logo2.png";
import _2 from "./../img/sign-in.png";
import _3 from "./../img/people-image.jpg";
import _4 from "./../img/plus.svg";
import _5 from "./../img/plus.svg";
import Popup from './../pages/Popup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReviewCardList from './ReviewCardList';

function User({ item, sethome, setSellerProfile, setsearchPage}) {

    let navigate = useNavigate();

    let id = localStorage.getItem('user');
    const [isOpenReportForm, setIsOpenReportForm] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [reportText, setReportText] = useState("");
    const [reportSubject, setReportSubject] = useState("");
    const [reportSubmitted, setReportSubmitted] = useState(false);



    const backBtn = () => {
        console.log(id == "null")
      
        if (id == "null") {
            setSellerProfile(null);
            setsearchPage(true);

        }
        else if(id != "null" ) {
   
            setsearchPage(true);
            setSellerProfile(null);

        }
        else{
            sethome(true);
            setSellerProfile(null);
        }
    }



    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggleLoginPopup = () => {
        setIsLoginOpen(!isLoginOpen);
    }



    const toggleReportFrom = () => {
        setIsOpenReportForm(!isOpenReportForm);
    }


    //post Report DATA
    const post = async (url, data) => {
        let res = await axios.post(url, data);
        return res.data;
    };

    let postReport = async () => {

        const url = `http://localhost:8000/v1/Report`;
        const newData = await post(url,
            {
                customerId: id,
                serviceProvidersId: item._id,
                reportedBy: 'Customer',
                ReportSubject: reportSubject,
                ReportText: reportText,
            });
    };

    useEffect(() => {

        // getReviewData();
        if (reportSubmitted == true) {

            postReport();
            toggleReportFrom();
            setReportSubmitted(false)


        }

    }, [reportSubmitted])


    if (Object.keys(item).length === 0 && item.constructor === Object) {
        return <div>Fetching data</div>
    }
    else {
        return (
            <div className='user' style={{ marginTop: "5%", }}>

                <div className="user-top-bar" style={{ marginTop: "20px", marginBottom: "2%" }}>
                    <div className="container">
                        <div className="user-top-bar__wrap">
                            <div className="d-flex">
                                <form action="#">
                                    <div className="d-flex flex-column to">
                                        <div className="user-top-bar__img-container">
                                            <div className="user-top-bar__img-wrap">
                                                <img src={item.profile_pic} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="d-flex flex-column top-bar__user-info">
                                    <span className="user-main-span user-top-bar__name" >
                                        {item.first_name} {item.last_name}
                                        <i class="fas fa-flag" style={{ marginLeft: "1%" }} onClick={() => {
                                            toggleReportFrom();
                                        }}></i>
                                    </span>


                                    <p>
                                        Rating : {item.rating.toFixed(1)}
                                    </p>
                                    <p>
                                        {item.city}
                                    </p>
                                    <p>
                                        Member Since {moment(item.registrationDate).format("YYYY")}
                                    </p>
                                    <p style={{ fontStyle: "italic", fontWeight: "50", fontFamily: 'Segoe UI', color: '#2575c0' }}>
                                        Certified
                                    </p>

                                </div>
                            </div>
                            <div className="d-flex update-profile-btn__col">
                                <button className="update-profile-btn" onClick={() => { id == "null" ? toggleLoginPopup() : togglePopup() }}>
                                    HIRE HELPER
                                </button>
                                <button className="update-profile-btn" onClick={() => { backBtn() }}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <main className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 user-main-left-col col-md-6 col-12">
                                <div className='user-main__left-col'>
                                    <span className="user-main-span">
                                        Profile
                                    </span>
                                    <p className='pt-5 pb-0 d-flex justify-content-between align-items-center'>
                                        Joined : {moment(item.registrationDate).format("ll")}
                                        <button className="cancel-subscription-btn">
                                            Message
                                        </button>
                                    </p>
                                    <p>
                                        Jobs Done: 53
                                    </p>
                                    <p>
                                        Job Success: 98%
                                    </p>

                                    <p>
                                        Phone No.  {item.phone_number}
                                    </p>
                                    <p>
                                        Email : {item.email}
                                    </p>
                                    <div className="user-main__hr"></div>
                                    <span className="user-main-span" >
                                        Education
                                    </span>

                                    {item.eduction.map((item, index) => (
                                        <div key={index} className="edu-back">
                                            <p className='institute'> {item.institution} </p>
                                            <p className='degree'> {item.degree}</p>
                                            <p className='year '> {item.start_date} {item.end_date}</p>
                                        </div>
                                    ))}

                                    <div className="user-main__hr"></div>
                                    <span className="user-main-span" >
                                        Skills
                                    </span>
                                    <br /><br />

                                    {(item.skill).map((item, index) => (
                                        <div key={index} className="skillnode">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6 col-12 user-main-right-col pr-0">
                                <div className="user-main__right-col">
                                    <div className="d-flex justify-content-between">
                                        <span className="user-main-span">
                                            Reviews
                                        </span>
                                    </div>

                                    <ReviewCardList item={item} />

                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {isOpen && <Popup
                    content={<div className="Popupcontent">

                        <RequestForm item={item} togglePopup={togglePopup} />

                    </div>}
                    handleClose={togglePopup}
                />}

                {isLoginOpen && <Popup
                    content={<div className="Popupcontent">
                        <div style={{ padding: "5%", textAlign: "center" }} >
                            <h1 style={{ color: "red", fontSize: "large", textAlign: "center", marginBottom: "5px", }}>You need to Login before you can perform this action</h1>
                            <h1 style={{ color: "grey", fontSize: "large", textAlign: "center", marginBottom: "10px" }}>Go to login page</h1>
                            <button style={{
                                color: "white",
                                fontSize: "large",
                                fontWeight: "Bold",
                                textAlign: "center",
                                padding: "2%",
                                border: "none",
                                backgroundColor: "#ffc107",
                                boxShadow: " 0px 0px 5px 1px #a1a3a3",
                                borderRadius: "10px"
                            }}
                                onClick={() => {
                                    navigate("/user/login");
                                }}
                            >Login page</button>
                        </div>

                    </div>}
                    handleClose={toggleLoginPopup}
                />}

                {/* Report Form */}
                {isOpenReportForm && <Popup
                    content={

                        // sPID , customerId , jobId , review , rating 

                        <div className="Popupcontent">

                            <div>
                                <b style={{ fontSize: '15px' }} className="titleFiled"> Subject </b>
                                <input type="text" style={{
                                    fontSize: "16px",
                                    width: "80%",
                                    marginRight: "8%",
                                    marginLeft: "8%",
                                    marginBottom: "2%",
                                    marginTop: "2%"
                                }} value={reportSubject} placeholder="Enter subject" onChange={(e) => { setReportSubject(e.target.value) }} />
                            </div>

                            <div>
                                <b style={{ fontSize: '15px' }} className="titleFiled">Description </b>
                                <textarea className="ResponseTextarea" type="text" value={reportText} placeholder="Description" onChange={(e) => { setReportText(e.target.value) }} />
                            </div>

                            <button className="greenBtn" onClick={() => {
                                if (reportText != '' && reportSubject != '') {
                                    setReportSubmitted(true);
                                }
                            }} >Submit</button>
                        </div>
                    }
                    handleClose={toggleReportFrom}
                />}
            </div>
        )
    }
}

export default User;




function RequestForm({ togglePopup, item }) {


    //Usestates
    const [title, setTitle] = useState("");

    const [formData, setFormData] = useState([{}]);
    const [description, setDescription] = useState("");
    const [Budget, setBudget] = useState(1);
    const [jobType, setJobType] = useState("Online");
    const [city, setCity] = useState("Islamabad");
    const [submit, setSubmit] = useState("");
    const [address, setAddress] = useState("");
    const [skill, setSkill] = useState('');
    let [skillArr, setSkillArr] = useState([]);
    let id = localStorage.getItem('user');
    const [emptyMsg, setEmptyMsg] = useState(false);

    //Api calls and posting form to Db
    //Create job
    const getData = async (url, sub_Data) => {
        let res = await axios.post(url, sub_Data);
        return res.data;
    };

    let getSearchedData = async (event) => {

        const url = "http://localhost:8000/v1/JobPostRoutes";
        const newData = await getData(url, formData);


        setSubmit(2);


    }

    //GET JOB DATA
    const getJob = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getJobData = async () => {

        const url = "http://localhost:8000/v1/JobPostRoutes";
        const newData = await getJob(url);
        console.log(newData.data.joblist.pop())

    };

    //GET SERVICE PROVIDERS DATA
    const getSpJob = async (url, sub_data) => {
        let res = await axios.post(url, sub_data);
        return res.data;
    };

    let getSPJobData = async () => {

        let skills = JSON.stringify(skillArr)
        const url = "http://localhost:8000/v1/JobPostRoutes/matchSkills";
        const newData = await getSpJob(url, { "skills": skillArr });
        console.log(newData.data.provider);
        //notify 


        // setSubmit(3);


    };



    useEffect(() => {

        if (submit == 1) {
            var data = getSearchedData();
        }

        if (submit == 3) {

            setBudget("1");
            setAddress("");
            setSkill("");
            setSkillArr([]);
            setDescription("");
            setTitle("");
            setCity("Islamabad");

            togglePopup();


        }

        if (submit == 2) {


            getSPJobData();
            setSubmit(3);
            //getJobData();
        }

    }, [submit])



    const cityOptions = [
        { value: "Islamabad" },
        { value: "Rawalpindi" },
        { value: "Lahore" },
        { value: "Karachi" },

    ];




    return (
        <div className="formContainer">

            <label className="Lname" ><b className="blabel">Job Title</b></label>
            <input className="IIB" type="text" value={title} placeholder="Enter job title here" onChange={(e) => { setEmptyMsg(false); setTitle(e.target.value) }} />

            <label className="Lname" ><b className="blabel">description</b></label>
            <textarea className="IIB" type="text" value={description} placeholder="Enter description" onChange={(e) => { setEmptyMsg(false); setDescription(e.target.value) }} />

            <label for="psw-repeat" className="Lname"><b className="blabel" >Location</b></label>
            <Selector setOption={setCity} choosenOption={city} optionList={cityOptions} />

            <label className="Lname" ><b className="blabel">Budget</b></label>
            <input className="IIB" type="text" value={Budget} style={{ textAlign: "center", border: '1px solid gray', borderColor: isNaN(Budget) ? 'red' : null }} onChange={(e) => { setEmptyMsg(false); setBudget(e.target.value) }} />

            <label className="Lname"><b className="blabel">Job Type</b></label>
            <div>
                <div className="btn-group">
                    <button className="bye" onClick={() => { setJobType("Online") }}>Online</button>
                    <button className="hello" onClick={() => { setJobType("Physical") }} >Physical</button>
                </div>
            </div>

            {jobType == "Physical" ? <> <label className="Lname" ><b className="blabel">Address</b></label>
                <textarea className="IIB" type="text" placeholder="Enter Address" value={address} onChange={(e) => { setEmptyMsg(false); setAddress(e.target.value) }} /> </> : null}

            {emptyMsg ?
                <label style={{ color: 'red', fontSize: '15px' }} className="Lname" >All fields must be filled.</label>
                : null}
            <br />

            <button className="Jobbtn" onClick={() => {
                if (title == '' || description == '' || Budget == '') {
                    setEmptyMsg(true);
                }
                else {
                    if (!isNaN(Budget)) {
                        setFormData({
                            customerId: id,
                            title: title,
                            Description: description,
                            Budget: Budget,
                            location: city,
                            address: address,
                            jobType: jobType,
                            jobStatus: "Request",
                            serviceProvidersId: item._id
                        });
                        //console.log(formData)
                        setSubmit(1);
                    }

                }


            }}> Post </button>


            <></>


        </div>
    )
}



