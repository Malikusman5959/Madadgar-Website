import React, { useState, useEffect, useRef } from 'react'
import JobCard from './JobCard'
import Popup from './../../pages/Popup';
import './../../style/PopupBox.css'
import axios from "axios";
import { io } from "socket.io-client";
import _6 from "./../../img/pro.jpg";
import { configConsumerProps } from 'antd/lib/config-provider';



const PostedJobs = () => {


    let [userData, setUserData] = useState(null);
    let [jobData, setJobData] = useState(null);
    let [responseData, setResponseData] = useState(null);
    let [refresh, setrefresh] = useState(true);
    const [jId, setjId] = useState(null);
    let id = localStorage.getItem('user');
    const [responseText, setResponseText] = useState("");
    const [job, setJob]=useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const socket = useRef();
    socket.current = io("ws://localhost:8900");

    const reload = () => {
        setrefresh(!refresh);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }


    //GET USER DATA
    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getUserData = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getData(url);
        console.log(newData.data.provider[0])
        setUserData(newData.data.provider[0])
    };

    //GET JOB DATA
    const getJob = async (url) => {

        console.log("ARRAY OF SKILLS ", userData.skill)
        let res = await axios.post(url, { "skills": userData.skill });
        return res.data;
    };

    let getJobData = async () => {
        const url = "http://localhost:8000/v1/JobPostRoutes/relatedJobs";
        const newData = await getJob(url);
        console.log(newData);
        //filter
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Open' );
        setJobData(filteredResult);
    };

    //SEND RESPONSE DATA
    const sendJobResponse = async (url, sub_data) => {
        let res = await axios.post(url, sub_data);
    
        console.log("fired")
        return res.data;
    };

    console.log(userData);
    let sendResponseData = async (formData) => {

        const url = "http://localhost:8000/v1/JobPostRoutes/responces";
        const newData = await sendJobResponse(url, formData);

        socket.current.emit("NewResponseNotification", {
            sp: userData.first_name + " "+ userData.last_name,
            customer: job
        });
        
        setResponseText("");
      
        getResponseData();
        getJobData();
    }


    //GET RESPONSE DATA
    const getresponses = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getResponseData = async () => {

        const url = "http://localhost:8000/v1/JobPostRoutes/responces";
        const newData = await getresponses(url);
        console.log(newData.data.posted_response)
        setResponseData(newData.data.posted_response);

    };

    useEffect(() => {
      
        getUserData();
            
    }, [  ])


    useEffect(() => {
        if (userData != null)
        {
            getResponseData();
            getJobData();
        }

    }, [ userData , refresh ])
console.log(jId);
console.log(job);
    return (

        <div style={{    minHeight: "600px"}}>
             <div
                style={{
                    backgroundColor: "white",
                    height: "280px",
                    width: "auto",
                    boxShadow: " grey -1px -1px 8px",
                    padding: "2%",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage: `url(${_6})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    alignItems: "flex-start",
                    marginBottom: "1%"
                }}>
                <h1
                    style={{
                        backgroundColor: "#2575c06e",
                        height: "230px",
                        width: "100%",
                        padding: "9%",
                        fontSize: "30px",
                        color: "white",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column"

                    }}>
                    Jobs Matched by Skills<br /> <span style={{ fontSize: "medium" }}>See the list of jobs that match your skills and respond to get hired quickly</span>

                </h1>
            </div>
            <div style={{
                        marginBottom: "10px",

                        width: "100%",
                        height: "30px",
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: 'space-between',
                        padding: "2px 10px",
                        backgroundColor: "rgb(187 187 187 / 43%)",


                    }}>

                        <div style={{ display: 'inline', width: "10%", color: '#2575c0' }}>
                            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                                Job title
                            </h4>

                        </div>
                        <div style={{ display: 'inline',  color: '#2575c0' , marginLeft: "12%"}}>
                            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                                City
                            </h4>

                        </div>

                        <div style={{ display: 'inline' }}>
                            <h4 style={{ fontSize: "16px", color: '#2575c0', fontWeight: "600" }}>
                                Posted Date </h4>
                        </div>

                        <div style={{ display: 'inline', color: '#2575c0' }}>
                            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                                Budget

                            </h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                            <h4 style={{ fontSize: "16px", color: '#2575c0', fontWeight: "600", marginRight: "50%" }}>
                                Action

                            </h4>
                        </div>

                    </div>

            {(userData && jobData && responseData) ? jobData.map((item, index) =>
                <JobCard refresh={refresh}  key={index} item={item} click={() => {
                    togglePopup();
                    setjId(item._id);
                   setJob(item.customerId);


                }} />) :

                <><h1 style={{ fontSize: "xx-large" }}>No jobs</h1>
                </>}
            {isOpen && <Popup
                content={<div className="Popupcontent">
                    <b className="titleField">Why choose me?</b>
                    <textarea className="ResponseTextarea" type="text" value={responseText} placeholder="Description" onChange={(e) => { setResponseText(e.target.value) }} />
                    <button className="greenBtn" onClick={() => {
                        sendResponseData(
                            {
                                ServiceProviderId: id,
                                jobId: jId,
                                ResponseText: responseText,
                                Status: "active"
                            }
                        )
                        setIsOpen(!isOpen);
                        reload();

                    }} >Send</button>
                </div>}
                handleClose={togglePopup}
            />}
        </div>
    )
}

export default PostedJobs