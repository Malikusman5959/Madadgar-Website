import React, { useState, useEffect, useRef  } from 'react';
import axios from "axios";
import moment from 'moment';
import { io } from "socket.io-client";
import Popup from './Popup';

const PostedJobDetails = ({ item, setListVisible, setSelectedTab, setRefresh }) => {

    const [responsesVisible, setResponsesVisible] = useState(false);
    const arr = item.skills.map(x => x);
    console.log(item)

    

    return (

        <div style={{ width: "100%", minHeight: '300px' }}>
            <div style={{ width: "100%", }}>

                <div style={{
                    padding: "2%",
                    backgroundColor: "#fff",
                    height: "100%",
                    border: "1px solid transparent",
                    WebkitBoxShadow: "0 1px 1px rgb(0 0 0 / 5%)",
                    display: "flex",
                    flexDirection: "column"

                }}>

                    <div style={{
                        padding: "2%",
                        fontWeight: "300px",
                        marginBottom: "20px",
                        borderTop: "5px solid var(--main-yellow-color)",
                        backgroundColor: "#fff",
                        color: "black"

                    }}>
                        <div style={{ display: "inline-flex", justifyContent: "space-between", width: "100%" }}>


                            <h1 style={{
                                fontSize: "22px",
                                fontWeight: 600,
                                margin: "0 0 20px",
                                fontFamily: "Roboto ,serif",
                                color: "#2575c0"

                            }}>
                                Job Detail

                            </h1>
                            <button onClick={() => { setListVisible(true); }} style={{
                                width: "80px",
                                height: '40px',
                                fontSize: '15px',
                                borderRadius: '10px',
                                backgroundColor: '#2575c0',
                                border: "none",
                                color: '#ffffff',
                                alignSelf: "flex-end"
                            }}>
                                Back </button>


                        </div>
                        <div className="row" style={{ paddingLeft: "20%" }}>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0px 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Job title
                                    </span>
                                    :{item.title}
                                </p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Type
                                    </span>
                                    : {item.jobType}</p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Posted by
                                    </span>
                                    : {item.customerId.first_name.capitalize()} {item.customerId.last_name.capitalize()}</p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Started date
                                    </span>
                                    : {moment(item.createdAt).format("LL")} </p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Budget
                                    </span>
                                    : {item.Budget}</p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Status
                                    </span>
                                    : {item.jobStatus}</p>
                            </div>
                            <div style={{
                                width: "50%",
                                float: "left",
                                marginBottom: "10px",
                                padding: "0 15px"
                            }}>
                                <p style={{
                                    fontSize: "16px"
                                }}><span style={{
                                    width: "100px",
                                    display: "inline-block",
                                    fontSize: "16px"
                                }}>
                                        Required skills
                                    </span>
                                    : {arr.map(x => x + " , ")}</p>
                            </div>
                        </div>
                        <div><h1 style={{
                            fontSize: "16px",
                            margin: "0 0 20px",
                            fontWeight: "bold"

                        }}>
                            Job Description:

                        </h1>
                            <p ><span style={{
                                width: "90%",
      
                                display: "inline-block",
                                fontSize: "16px",

                                borderRadius: "5px",
                                marginLeft: "5%",
                            }}>
                                {item.Description}
                            </span>
                            </p>
                        </div>
                    </div>
                            
                    <button onClick={() => { setResponsesVisible(!responsesVisible) }}
                        style={{
                            width: "140px",
                            height: '40px',
                            fontSize: '15px',
                            borderRadius: '10px',
                            backgroundColor: '#2575c0',
                            border: "none",
                            color: '#ffffff',
                            alignSelf: "center"
                        }}> {responsesVisible ? 'Hide Responses' : 'Show Responses'} </button>

                </div>

                <div >
                    {responsesVisible ? <ResponseList setRefresh={setRefresh} setSelectedTab={setSelectedTab} item={item} /> : null}
                </div>



            </div>
        </div>
    )
}


function ResponseList({ item, setSelectedTab, setRefresh }) {

    
    const [list, setList] = useState([])
    let id = localStorage.getItem('user');
    // const hide = (value)=> setListVisible(value);


    //GET RESPONSE DATA
    const getresponses = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getResponseData = async () => {

        const url = "http://localhost:8000/v1/JobPostRoutes/responces";
        const newData = await getresponses(url);
        const filteredResult = newData.data.posted_response.filter(response => response.jobId._id == item._id);
        setList(filteredResult);
    };


    useEffect(() => {
        getResponseData();

    }, [])



    return (

        list.length == 0 ? null :
            <>
                {
                    list.map((item) =>
                        <ResponseCard item={item} setRefresh={setRefresh} setSelectedTab={setSelectedTab} />
                    )
                }
            </>
    )
}

function ResponseCard({ item, setSelectedTab, setRefresh }) {

    let id = localStorage.getItem('user');
    let [user, setUser] = useState(null);
    const socket = useRef();
    socket.current = io("ws://localhost:8900");

    const changeTab = (status) => {
        setSelectedTab(status);
    }
    const [hired, setHired] = useState(false);
    const [popup, setPopup] = useState(false)

    const togglePopup = () => {
        setPopup(!popup);
    }


    console.log(item)

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
 

    //UPDATE JOB STATUS
    const update = async (url) => {
        let res = await axios.patch(url, { jobStatus: "Hired" });
        return res.data;
    };


    let sendJobStatus = async () => {

        const url = `http://localhost:8000/v1/JobPostRoutes?id=${item.jobId._id}`;
        const newData = await update(url);

        setHired(true);
        setRefresh(2);
        changeTab('Active Jobs');
    
    };

    
    //Create hired Helper
    const add = async (url) => {
        let res = await axios.post(url,
            {
                serviceProviderId: item.ServiceProviderId._id,
                jobId: item.jobId._id,
                customerId: id,
                payment: item.Budget,
                startDate: moment(new Date()).format('L'),
            }

        );
        return res.data;
    };

    let addHiredJob = async () => {

        const url = `http://localhost:8000/v1/HiredJobs`;
        const newData = await add(url);

        socket.current.emit("hireNotification", {
            sp: item.ServiceProviderId._id,
            customer: user.first_name + " " + user.last_name
        });


    };


    //add sp id in job
    const addsp = async (url) => {
        let res = await axios.patch(url,
            {
                serviceProvidersId: item.ServiceProviderId._id,
            }
        );
        return res.data;
    };

    let addspId = async () => {

        const url = `http://localhost:8000/v1/AddJobSP?spId=${item.jobId._id}`;
        const newData = await addsp(url);

    };

    // //get response data
    // const getResponse = async (url) => {
    //     let res = await axios.get(url);
    //     return res.data;
    // };

    // let getResponseData = async () => {

    //     const url = `http://localhost:8000/v1/HiredJobs?jobId=${item.ServiceProviderId}`;
    //     const newData = await getResponse(url);
    //     const filteredResult = newData.data.hired_jobs[0]
    //     setActiveJobData(filteredResult);
    // };

    return (


        <div style={{ marginBottom: "10px", border: "2px solid lightgray", width: "100%", height: "80px", borderRadius: "10px", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: "10px" }}>

            <div style={{ display: 'inline', width: "40%" }}>
                <h1 style={{ fontSize: "20px" }}>
                    {item.jobId.title}
                    <span style={{ fontSize: "10px" }}> ({item.jobId.jobType})</span>
                </h1>
                <h4 style={{ fontSize: "14px" }}>
                    {item.jobId.location}
                </h4>
            </div>

            <div style={{ display: 'inline' ,  width: "20%" }}>
                <h4 style={{ fontSize: "14px" }}>
                    Responded by: {item.ServiceProviderId.first_name} {item.ServiceProviderId.last_name}
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                <h4 style={{ fontSize: "14px" }}>
                    {moment(item.createdAt).format('LL')}
                </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button onClick={() => { sendJobStatus(); addHiredJob(); addspId() }} disabled={hired} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                    {hired ? "Hired" : "Hire"}
                </button>
                <button onClick={() => { togglePopup(); }} disabled={hired} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                   view Response
                </button>

                { popup ?
                    <Popup
                    content={
            
                        // sPID , customerId , jobId , review , rating 
            
                        <div className="Popupcontent">
            
                            <div>
                                <b style={{marginLeft: "5%", fontSize: '15px'  }} className="titleFiled"> Helper's Response </b>
                            </div>
            
                            <div style={{marginTop:"1%"}} > 
                                <p style={{ marginLeft: "9rem",fontSize: '15px' }} >{item.ResponseText} </p>
                            </div>
                        </div>
                    }
                    handleClose={togglePopup}
                /> : null
                }

            </div>
        </div>





    )
}

export default PostedJobDetails