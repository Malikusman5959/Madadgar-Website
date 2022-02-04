import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import Popup from './../pages/Popup'

const JobHistoryDetails = ({ item, setListVisible, setSelectedTab, setRefresh }) => {

    const [activeJobData, setActiveJobData] = useState(null);
    let id = localStorage.getItem('user');

    //GET active job DATA
    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getActiveJobData = async () => {

        const url = `http://localhost:8000/v1/HiredJobs?jobId=${item._id}`;
        const newData = await getData(url);
        const filteredResult = newData.data.hired_jobs[0]
        setActiveJobData(filteredResult);
    };


    
    useEffect(() => {
        getActiveJobData();

    }, [])


    
    return (
        activeJobData ?
            // <div style={{ width: "100%", minHeight: '300px' }}>
            //     <div style={{ width: "80%", minHeight: '200px', backgroundColor: "lightblue" }}>
            //         <p>{activeJobData.serviceProviderId.first_name}</p>
            //         <p>{activeJobData.jobId.title}</p>
            //         <p>{activeJobData.payment}</p>
            //         <p>{activeJobData.startDate}</p>



            //         <button onClick={() => { setListVisible(true); }} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}> Back </button>
                 
            //     </div>


              

            // </div> 
            <div style={{ width: "100%", }}>
            <div >
                
    
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
                            }}> Back </button>
    
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
                                    :{activeJobData.jobId.title}
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
                                    : {activeJobData.jobId.jobType}</p>
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
                                    : {activeJobData.customerId.first_name.capitalize()} {activeJobData.customerId.last_name.capitalize()}</p>
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
                                    : {moment(activeJobData.createdAt).format("LL")} </p>
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
                                    : {activeJobData.payment}</p>
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
                                    : {activeJobData.jobId.jobStatus}</p>
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
                                    : {activeJobData.jobId.skills.map(x => x + " , ")}</p>
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
                                {item.Description}
                            </span>
                            </p>
                        </div>
                    </div>
    
    
                </div>
    
    
    
    
    
            </div>
        </div>
            : null
    )
}


export default JobHistoryDetails
