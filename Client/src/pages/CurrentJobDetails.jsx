import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import moment from 'moment';
import { borderRadius } from 'react-select/src/theme';
import { io } from "socket.io-client";

const CurrentJobDetails = ({ item, setListVisible, setRefresh }) => {
    let [user, setUser] = useState(null);
    const socket = useRef();
    socket.current = io("ws://localhost:8900");
    let id = localStorage.getItem('user');

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
        let res = await axios.patch(url, { jobStatus: "Completed" });
        return res.data;
    };

    let sendJobStatus = async () => {

        const url = `http://localhost:8000/v1/JobPostRoutes?id=${item.jobId._id}`;
        const newData = await update(url);
        socket.current.emit("CompleteJobNotification", {
            sp: user.first_name + " "+ user.last_name,
            customer: item.jobId.customerId
        });
        
    };

    console.log("Line 20 in current jobs"+item)

    const arr = item.jobId.skills.map(x=>x);

    return (
        // Posted by
        // posted date
        // job title
        // city
        // des
        <div style={{ width: "100%", minHeight: '300px' }}>
            <div style={{ width: "100%", minHeight: '200px', backgroundColor: "lightblue" }}>
                {item.jobId.jobStatus == 'Completed' ? <div> You have marked this job as completed. Please wait until the customer confirms its completion </div> : null}

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
                            <button onClick={() => { setRefresh(3); setListVisible(true); }} style={{
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
                        <div className="row" style={{paddingLeft:"20%"}}>
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
                                    :{item.jobId.title}
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
                                    : {item.jobId.jobType}</p>
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
                                    : { moment(item.createdAt).format("LL")} </p>
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
                                    : {item.jobId.Budget}</p>
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
                                    : {item.jobId.jobStatus}</p>
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
                                    : {arr.map(x=>x + " , ")}</p>
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
                                height: "200px",
                                display: "inline-block",
                                fontSize: "16px",
                         
                                borderRadius: "5px",
                                marginLeft: "5%",
                            }}>
                                {item.jobId.Description}
                            </span>
                            </p>
                        </div>
                    </div>
                    {item.jobId.jobStatus == 'Hired' ? <button onClick={() => { sendJobStatus(); setRefresh(4); }} style={{
                        width: "140px",
                        height: '40px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        backgroundColor: '#2575c0',
                        border: "none",
                        color: '#ffffff',
                        alignSelf: "center"

                    }}>
                        Complete job </button> : null}

                </div>





            </div>
        </div>
    )
}

export default CurrentJobDetails