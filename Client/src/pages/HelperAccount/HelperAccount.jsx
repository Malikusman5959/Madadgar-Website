import { useState, useEffect } from 'react';
import './../../style/HelperAccount.css'

//Component imports
import DashboardCard from './dashboardCard';
import Footer from '../footer';
import Contact from './../Contact';
import HelperProfile from './HelperProfile';

import Setup from './SetPassword';
import CurrentJobs from './CurrentJobs';
import JobRequests from './JobRequests';
import FinishedJobList from './FinishedJobList';

//images imports
import _1 from "./../../img/logo2.png";
import _2 from "./../../img/sign-in.png";
import _3 from "./../../img/suggestedJobs.jpg";
import _4 from "./../../img/requests.jpg";
import _5 from "./../../img/profile.jpg";
import _6 from "./../../img/bgImg.jpg";
import _7 from "./../../img/WorkBg.jpg";
import _8 from "./../../img/todo.jpg";
import _33 from "./../../img/r3.png";
import active from "./../../img/activeJob.jpg";
import complete from "./../../img/jobDone.jpg";




//package imports
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { fontSize } from '@material-ui/system';
import PostedJobs from './PostedJobs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { borderRadius } from 'react-select/src/theme';
import LearnMore from './LearnMore';

library.add(fas)





const HelperAccount = () => {
    //USESTATE:
    let navigate = useNavigate();
    let [userData, setUserData] = useState({});
    const [contactform, setcontactform] = useState(false);
    const [profile, setProfile] = useState(false);
    const [home, setHome] = useState(true);
    const [toggle, settoggle] = useState(false);
    const [setup, setSetup] = useState(false);
    const [postedJobs, setPostedJobs] = useState(false);
    const [currentJobs, setCurrentJobs] = useState(false);
    const [jobRequest, setJobRequest] = useState(false)
    const [finishedJob, setFinishedJob] = useState(false)
    const [learnMore, setLearnMore] = useState(false)


    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    //get user info
    let getSearchedData = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getData(url);
        console.log(newData.data.provider[0])
        setUserData(newData.data.provider[0])
    };


    useEffect(() => {
        getSearchedData();
    }, [])

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    if (Object.keys(userData).length === 0 && userData.constructor === Object) {
        return <div>Fetching data</div>
    }
    else {
        return (
            <div syle={{ marginTop: "3%", height: "100%" }}>
                <div className="user" >
                    <header >
                        <div className="top-bar user sticky">
                            <div className="row top-bar__row">
                                <div className="col-lg-2 col-md-2 col-3 pl-5 top-bar__row-col__logo">
                                    <a href="index.html"><img src={_1} alt="Logo" /></a>
                                </div>
                                <nav className="col-lg-7 col-md-8 col-12 top-bar__row-col__nav " id="homeNav">
                                    <ul>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    navigate('/user/helperAccount');
                                                    setcontactform(false);
                                                    setProfile(false);
                                                    setHome(true);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setPostedJobs(false);
                                                    setJobRequest(false);
                                                    setCurrentJobs(false);
                                                    setFinishedJob(false);
                                                    setLearnMore(false);

                                                }} > Home</a>
                                        </li>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    // navigate('/user/user');
                                                    setcontactform(false);
                                                    setProfile(true);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setJobRequest(false);
                                                    setPostedJobs(false);
                                                    setFinishedJob(false);
                                                    setLearnMore(false);

                                                }} > Profile</a>
                                        </li>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    // navigate('/user/Contact');
                                                    setcontactform(true);
                                                    setProfile(false);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setPostedJobs(false);
                                                    setJobRequest(false);
                                                    setFinishedJob(false);
                                                    setCurrentJobs(false);
                                                    setLearnMore(false);

                                                }} > Contact Us</a>
                                        </li>

                                        <li>
                                            <a onClick=
                                                {() => {
                                                    navigate('/user/adminpanel');
                                                    setcontactform(false);
                                                    setProfile(false);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setPostedJobs(false);
                                                    setJobRequest(false);
                                                    setCurrentJobs(false);
                                                    setFinishedJob(false);
                                                    setLearnMore(false);


                                                }} > FAQ </a>
                                        </li>

                                        <li>
                                            <a onClick=
                                                {() => {
                                                    navigate('/user/Messenger');
                                                    setcontactform(false);
                                                    setProfile(false);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setPostedJobs(false);
                                                    setJobRequest(false);
                                                    setCurrentJobs(false);
                                                    setFinishedJob(false);
                                                    setLearnMore(false);

                                                }}>Inbox</a>
                                        </li>

                                    </ul>
                                </nav>

                                <input className="profileImg" type="image" src={userData.profile_pic} name="" alt="submit" onClick={() => { settoggle(!toggle) }} />

                                {toggle == true ? <div style={{ width: "20%", backgroundColor: "var(--main-navbar-color)", position: "absolute", right: "0", top: "48px" }}>
                                    <ul className="toggleList">
                                        <li onClick={() => {
                                            setcontactform(false);
                                            setProfile(false);
                                            setHome(false);
                                            settoggle(false);
                                            setSetup(true);
                                            setPostedJobs(false);
                                            setCurrentJobs(false);
                                            setFinishedJob(false);
                                            setJobRequest(false);
                                            setLearnMore(false);



                                        }} >
                                            Change Password</li>
                                        <li onClick={() => {
                                            navigate('/user/login');
                                            localStorage.setItem('user', null);
                                        }}>
                                            Logout</li>
                                    </ul>
                                </div> : null}
                            </div>
                        </div>
                    </header>
                    <div style={{ minHeight: "100%", width: "auto", marginTop: "3%" }}>
                        {home == true ? (
                            <div style={{ minHeight: "100%", width: "auto", }}>

                                {/*Top section  */}
                                <div style={{
                                    display: "inline-flex",
                                    width: "98%",
                                    margin: "1%",
                                    marginTop: "1%",
                                    justifyContent: " space-between",
                                }}>
                                    {/* left section */}
                                    <div style={{
                                        backgroundColor: "#ffc107",
                                        height: "250px",
                                        width: "20%",
                                        boxShadow: " grey -1px -1px 8px",
                                        padding: "3%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        color: "white"
                                    }}>

                                        <h1 style={{
                                            fontSize: "20px",
                                            fontFamily: "Roboto, sans-serif",

                                        }}>
                                            Welcome {userData.first_name} {userData.last_name},
                                        </h1>
                                        <h1 style={{ fontSize: "16px" }}>
                                            Get started by Finding the right job for you.
                                        </h1>
                                        <button onClick={() => {
                                            setPostedJobs(true);
                                            setcontactform(false);
                                            setProfile(false);
                                            setHome(false);
                                            settoggle(false);
                                            setSetup(false);
                                            setCurrentJobs(false);
                                            setJobRequest(false);
                                            setFinishedJob(false);
                                            setLearnMore(false);
                                        }}
                                            style={{
                                                backgroundColor: "var(--main-navbar-color)",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                margin: " 0px 2px",
                                                padding: "3%",
                                                borderRadius: "2px",
                                                border: "none",
                                            }}>
                                            View Jobs
                                        </button>
                                    </div>
                                    {/* right section slider */}
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            height: "250px",
                                            width: "79%",
                                            boxShadow: " grey -1px -1px 8px",

                                            padding: "2%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            backgroundImage: `url(${_6})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            alignItems: "flex-start",
                                        }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "70%",
                                        }}>
                                            <h1
                                                style={{
                                                    width: "79%",
                                                    marginTop: "1%",
                                                    padding: "1%",
                                                    fontSize: "40px",
                                                    display: "flex",
                                                    color: "white",
                                                    fontFamily: "Roboto, sans-serif",
                                                }}
                                            >New to Madadgar</h1>
                                            <h4
                                                style={{
                                                    width: "79%",
                                                    marginTop: "1%",
                                                    padding: "1%",
                                                    fontSize: "20px",
                                                    display: "flex",
                                                    color: "white",
                                                    fontFamily: "sans-serif",
                                                }}
                                            >Learn how to get most out of Madadgar?</h4>
                                        </div>

                                        <button onClick={() => {
                                            setPostedJobs(false);
                                            setcontactform(false);
                                            setProfile(false);
                                            setHome(false);
                                            settoggle(false);
                                            setSetup(false);
                                            setCurrentJobs(false);
                                            setJobRequest(false);
                                            setFinishedJob(false);
                                            setLearnMore(true);
                                        }}
                                            style={{
                                                backgroundColor: "var(--main-yellow-color)",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "20px",
                                                margin: " 0px 2px",
                                                padding: "2% 4%",
                                                borderRadius: "2px",
                                                position: "relative",
                                                bottom: "-30%",
                                                border: "none"
                                            }}>
                                            Learn More </button>
                                    </div>
                                </div>
                                <p style={{
                                    fontSize: "20px",
                                    fontFamily: "Roboto, sans-serif",
                                    margin: "2% 0%",
                                    fontWeight: "bolder",
                                    backgroundColor: "#a8cff92e",
                                    paddingLeft: "5%"


                                }}>
                                    Dashboard
                                </p>
                                <div style={{
                                    width: "auto",
                                    display: 'grid',
                                    gridTemplateColumns: "repeat(3, 1fr)",

                                }}>
                                    {/* SUGGESTED JOBS HERE */}


                                    <div style={{
                                        backgroundColor: "rgb(255, 193, 7)",
                                        height: "90%",
                                        width: "60%",
                                        marginTop: "2%",
                                        boxShadow: "grey -1px -1px 8px",
                                        padding: "3%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        float: "right",
                                        // marginRight: "6%",
                                        marginLeft: "18%",
                                        position: "sticky",
                                        textAlign: 'center',
                                        selfAlign: 'center'



                                    }} >
                                        <img src={_3} style={{
                                            height: "60%",
                                            width: "90%",
                                            alignSelf: 'center'
                                        }} />
                                        <button
                                            onClick={() => {
                                                setPostedJobs(true);
                                                setcontactform(false);
                                                setProfile(false);
                                                setHome(false);
                                                settoggle(false);
                                                setSetup(false);
                                                setCurrentJobs(false);
                                                setJobRequest(false);
                                                setFinishedJob(false);
                                                setLearnMore(false);
                                            }}
                                            style={{
                                                backgroundColor: "#0062cc",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontFamily: "Roboto, sans-serif",
                                                fontWeight: "bold",
                                                margin: " 0px 2px",
                                                padding: "8%",
                                                borderRadius: "5px",
                                                border: "none",
                                            }} >
                                            View Suggest Jobs
                                        </button>
                                    </div>
                                    <p style={{
                                        fontSize: "20px",
                                        fontFamily: "sans-serif",
                                        margin: "0% 2% 2% 0%",
                                        padding: "3% 8%",
                                        fontWeight: "500",
                                        // backgroundColor: "#5ea6ed",
                                        borderRadius: "25px",
                                        width: "90%",
                                        textAlign: "justify",


                                    }}>
                                        <h1 style={{
                                            fontSize: "26px",
                                            marginBottom: "1%",
                                            fontFamily: "Roboto, sans-serif",
                                            fontWeight: "bolder",
                                            color: "var(--main-navbar-color)",
                                            selfAlign: "center",
                                            textAlign: "center"


                                        }}>Skill Based Jobs</h1>
                                        Madadgar brings you all the jobs that are related to the Skills you have add.
                                        You Also receive job offers directlty from a customer.
                                        Best way to get most jobs is to maintain good profile and Rating.

                                    </p>
                                    {/* jOB REQUESTS HERE */}

                                    <div style={{
                                        backgroundColor: "rgb(255, 193, 7)",
                                        height: "90%",
                                        width: "60%",
                                        marginTop: "3%",
                                        boxShadow: "grey -1px -1px 8px",
                                        padding: "3%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        float: "right",
                                        marginRight: "6%",
                                        marginLeft: "10%",
                                        position: "sticky",
                                        textAlign: 'center',
                                        selfAlign: 'center'



                                    }} >
                                        <img src={_4} style={{
                                            height: "60%",
                                            width: "90%",
                                            alignSelf: 'center'
                                        }} />
                                        <button
                                            onClick={() => {
                                                setPostedJobs(false);
                                                setcontactform(false);
                                                setProfile(false);
                                                setHome(false);
                                                settoggle(false);
                                                setSetup(false);
                                                setCurrentJobs(false);
                                                setJobRequest(true);
                                                setFinishedJob(false);
                                                setLearnMore(false);

                                                console.log("hello")
                                            }}
                                            style={{
                                                backgroundColor: "#0062cc",
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: "16px",
                                                fontFamily: "Roboto, sans-serif",
                                                fontWeight: "bold",
                                                margin: " 0px 2px",
                                                padding: "8%",
                                                borderRadius: "5px",
                                                border: "none",
                                            }} >
                                            Job Requests
                                        </button>
                                    </div>
                                </div>
                                {/* ON GOING TASKS HERE */}
                                <div style={{
                                    backgroundColor: "var(--main-yellow-color)",
                                    width: "auto",
                                    height: "400px",
                                    backgroundImage: `url(${_7})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    alignItems: "flex-start",
                                    marginBottom: "10px"

                                }}
                                >
                                    <div style={{
                                        display: "inline-flex",
                                        flexDirection: "row",
                                        width: "60%",
                                        margin: "0"
                                    }}>
                                    <div style={{
                                        display: "inline-flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        height:"100%",
                                        margin: "0"
                                    }}>
                                        <h1
                                            style={{
                                                width: "79%",
                                                marginTop: "1%",
                                                paddingTop: "10%",
                                                paddingLeft: "5%",
                                                fontSize: "40px",
                                                display: "flex",
                                                color: "white",
                                                fontFamily: "Roboto, sans-serif",
                                            }}
                                        >Currently assigned Tasks</h1>
                                        <h4
                                            style={{
                                                width: "79%",
                                                marginTop: "1%",
                                                padding: "5%",
                                                paddingTop: "2%",
                                                fontSize: "20px",
                                                display: "flex",
                                                color: "white",
                                                fontFamily: "sans-serif",
                                            }}
                                        >All your current projects can be manage in this section. Click open to view the projects</h4>
                                    </div>
                                    </div>
                                    <div style={{
                                        display: "inline-flex",
                                        width: "40%",
                                        height:'100%',
                                        margin: "0",
                                        flexDirection: "row",
                                            justifyContent: "space-around",
                                    }}>
                                        <div style={{
                                            backgroundColor: "rgb(255, 193, 7)",
                                            height: "75%",
                                            width: "40%",
                                            marginTop: "8%",
                                            boxShadow: "grey -1px -1px 8px",
                                            padding: "3%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            float: "right",
                                            marginRight: "6%",
                                           



                                        }} >
                                            <img src={active} style={{
                                                height: "70%",
                                                width: "100%",
                                            }} />
                                            <button
                                                onClick={() => {
                                                    setPostedJobs(false);
                                                    setcontactform(false);
                                                    setProfile(false);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setCurrentJobs(true);
                                                    setJobRequest(false);
                                                    setLearnMore(false);
                                                    setFinishedJob(false);

                                                    console.log("hello")
                                                }}
                                                style={{
                                                    backgroundColor: "#0062cc",
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                    fontFamily: "Roboto, sans-serif",
                                                    fontWeight: "bold",
                                                    margin: " 0px 2px",
                                                    padding: "8%",
                                                    borderRadius: "5px",
                                                    border: "none",
                                                }} >
                                                Active Jobs
                                            </button>
                                        </div>
                                        <div style={{
                                            backgroundColor: "rgb(255, 193, 7)",
                                            height: "75%",
                                            width: "40%",
                                            marginTop: "8%",
                                            boxShadow: "grey -1px -1px 8px",
                                            padding: "3%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            float: "right",
                                            marginRight: "2%",



                                        }} >
                                            <img src={complete} style={{
                                                height: "70%",
                                                width: "100%",
                                            }}
                                                alt="" />
                                            <button
                                                onClick={() => {
                                                    setPostedJobs(false);
                                                    setcontactform(false);
                                                    setProfile(false);
                                                    setHome(false);
                                                    settoggle(false);
                                                    setSetup(false);
                                                    setCurrentJobs(false);
                                                    setJobRequest(false);
                                                    setFinishedJob(true);
                                                    setLearnMore(false);

                                                    console.log("hello")
                                                }}
                                                style={{
                                                    backgroundColor: "#0062cc",
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                    fontFamily: "Roboto, sans-serif",
                                                    fontWeight: "bold",
                                                    margin: " 0px 2px",
                                                    padding: "8%",
                                                    borderRadius: "5px",
                                                    border: "none",

                                                }} >
                                                Compeleted job
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {profile == true ? <HelperProfile firstName={userData.first_name.capitalize()} lastName={userData.last_name.capitalize()} email={userData.email} city={userData.city} contact={userData.phone_number} profile={userData.profile_pic} item={userData} /> : null}
                        {contactform == true ? <Contact /> : null}
                        {setup == true ? <Setup /> : null}
                        {postedJobs == true ? <PostedJobs /> : null}
                        {currentJobs == true ? <CurrentJobs /> : null}
                        {jobRequest == true ? <JobRequests /> : null}
                        {finishedJob == true ? <FinishedJobList /> : null}
                        {learnMore == true ? <LearnMore /> : null}




                    </div>

                </div>

                <div style={{ height: "300px", width: "auto" }}>  <Footer /></div>


            </div >
        )
    }
}

export default HelperAccount
