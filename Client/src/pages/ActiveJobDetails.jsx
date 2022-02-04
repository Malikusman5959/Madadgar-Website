import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import Popup from './Popup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import WriteReview from './CustomerAccount/WriteReview';
import ReactStars from "react-rating-stars-component";



library.add(faStar);

const ActiveJobDetails = ({ item, setListVisible, setSelectedTab, setRefresh }) => {

    const [activeJobData, setActiveJobData] = useState(null);
    //report details
    const [isOpenReportForm, setIsOpenReportForm] = useState(false);
    const [reportText, setReportText] = useState("");
    const [reportSubject, setReportSubject] = useState("");
    const [reportSubmitted, setReportSubmitted] = useState(false);

    //review details
    const [isOpenReviewForm, setIsOpenReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [SPrating, setSPRating] = useState(0);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [spRating, setSpRating] = useState(false);
    let rate = [];
    var avgRating = 0;




    let id = localStorage.getItem('user');


    const ratingStars = {
        size: 30,
        count: 5,
        isHalf: false,
        value: 0,
        color: "grey",
        activeColor: "#ffc107",
        onChange: (newValue) => {
            setRating(newValue);
          console.log(`Example 3: new value is ${newValue}`);
        }
      };

    const toggleReportFrom = () => {
        setIsOpenReportForm(!isOpenReportForm);
    }

    const toggleReviewFrom = () => {
        setIsOpenReviewForm(!isOpenReviewForm);
    }

    //post  DATA
    const post = async (url, data) => {
        let res = await axios.post(url, data);
        return res.data;
    };


    let postReview = async () => {

        const url = `http://localhost:8000/v1/Review`;
        console.log({
            customerId: id,
            jobId: activeJobData.jobId._id,
            serviceProvidersId: activeJobData.serviceProviderId._id,
            rating: rating,
            reviewText: reviewText,

        });
        const newData = await post(url,
            {
                customerId: id,
                jobId: activeJobData.jobId._id,
                serviceProvidersId: activeJobData.serviceProviderId._id,
                rating: rating,
                reviewText: reviewText,

            });
    };




    //post report DATA
    let postReport = async () => {

        const url = `http://localhost:8000/v1/Report`;
        const newData = await post(url,
            {
                customerId: id,
                jobId: activeJobData.jobId._id,
                serviceProvidersId: activeJobData.serviceProviderId._id,
                reportedBy: 'Customer',
                ReportSubject: reportSubject,
                ReportText: reportText,
            });
    };



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

    
    //UPDATE JOB STATUS
    const update = async (url, status) => {
        let res = await axios.patch(url, { jobStatus: status });
        console.log(res.data)
        return res.data;
       
    };

    let sendJobStatus = async (status) => {

        const url = `http://localhost:8000/v1/JobPostRoutes?id=${activeJobData.jobId._id}`;
        const newData = await update(url, status);
     



    };

            //************************************calculate Helpers rating**************************************************


    //GET REVIEW DATA
    const getReview = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getReviewData = async () => {
        
        const url = `http://localhost:8000/v1/Review`;
        const newData = await getReview(url);
        console.log(newData)
 
        const filteredResult = newData.data.reviews.filter(review => review.serviceProvidersId._id == activeJobData.serviceProviderId._id);
        rate = filteredResult.map(obj => obj.rating);
        console.log(rate);
        avgRating = calculateRating();
        console.log(calculateRating());
    };

    const calculateRating = () => {
     
            var element = 0;
            var count = 0.0;
            var sum = 0;
        for (let index = 0; index < rate.length; index++) {
             element = parseInt(rate[index]);
            sum= sum + element;   
            count+=1;  
        }       
        return sum/count;

    };

        //UPDATE user rating 
        const updateSPrating = async (url) => {
            console.log("üser rating", avgRating)
            let res = await axios.patch(url, { rating: avgRating });
            return res.data;
        };
    
        let sendSPrating = async () => {
            const waits = await getReviewData();
            const url = `http://localhost:8000/v1/serviceProvider/${activeJobData.serviceProviderId._id}`;;
            const wait = await updateSPrating(url);
    
    
    
        };


    //************************************End of calculate Helpers rating**************************************************

    useEffect(() => {
        getActiveJobData();

        
    }, [])

    useEffect(() => {

        if (reviewSubmitted == true) {
            sendJobStatus('Finished');
            postReview();
            setSpRating(true);
            toggleReviewFrom();
            setReviewSubmitted(false);
            setSelectedTab('Jobs History');
           

        }
        if(spRating == true){
            sendSPrating()
        }


    }, [reviewSubmitted])

    useEffect(() => {

        if (reportSubmitted == true) {
            sendJobStatus('Terminated');
            postReport();
            toggleReportFrom();
            setReportSubmitted(false)
            setSelectedTab('Jobs History')

        }

    }, [reportSubmitted])



    return (
        activeJobData ?
        

            <div style={{ width: "100%", minHeight: '300px' }}>
                <div style={{ width: "100%", minHeight: '200px', backgroundColor: "lightblue" }}>

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
                                           Helper's name
                                        </span>
                                        : {activeJobData.serviceProviderId.first_name.capitalize()} {activeJobData.serviceProviderId.last_name.capitalize()}</p>
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
                                        : {activeJobData.jobId.Budget}</p>
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
                                    {activeJobData.jobId.Description}
                                </span>
                                </p>
                            </div>
                        </div>
                                <button onClick={() => {

                          
                            if (activeJobData.jobId.jobStatus == 'Hired') {
                                //terminate job = open report form.                 
                                toggleReportFrom();

                            }
                            else {
                                //update job status to finished and ask for review.
                                toggleReviewFrom();
                            }

                        }} style={{
                            width: "140px",
                            height: '40px',
                            fontSize: '15px',
                            borderRadius: '10px',
                            backgroundColor: '#2575c0',
                            border: "none",
                            color: '#ffffff',
                            alignSelf: "center"
                        }}>
                            {activeJobData.jobId.jobStatus == 'Completed' ? 'Confirm Completion' : "Terminate job"}  </button>
                    </div>
                </div>


    {/* Review Form */ }
{
    isOpenReviewForm && <Popup
        content={

        
           
            // sPID , customerId , jobId , review , rating 

             <div className="Popupcontent">

                <div>
                    <b style={{ marginLeft: "5%", fontSize: '15px' }} className="titleFiled">Rating </b>
         
               </div >  
               <div style={{marginLeft: "5%"}}>
                   <ReactStars {...ratingStars} />
                   </div>
                <div>
                    <b style={{ marginLeft: "5%", fontSize: '15px' }} className="titleFiled">Review </b>
                    <textarea className="ResponseTextarea" style={{ marginLeft: "5%" }}type="text" value={reviewText} placeholder="Description" onChange={(e) => { setReviewText(e.target.value) }} />
               </div>

             <button className="greenBtn" onClick={() => {
                    if (reviewText != '' && rating != 0) {
                        setReviewSubmitted(true);
                    }
                }} >Send</button>
            </div>
            
        }
        handleClose={toggleReviewFrom}
    />
}



{/* Report Form */ }
{
    isOpenReportForm && <Popup
        content={

            // sPID , customerId , jobId , review , rating 

            <div className="Popupcontent">

                <div>
                    <b style={{marginLeft: "5%", fontSize: '15px'  }} className="titleFiled"> Subject </b>
                    <input type="text" style={{marginLeft: "5%", display:"block" , width: "90%" , marginTop:"1%" ,  fontSize: '15px' }} value={reportSubject} placeholder="Reason for job tremination" onChange={(e) => { setReportSubject(e.target.value) }} />
                </div>

                <div style={{marginTop:"1%"}} > 
                    <b style={{ marginLeft: "5%",fontSize: '15px' }} className="titleFiled">Description </b>
                    <textarea style={{ marginLeft: "9rem",fontSize: '15px' }}  className="ResponseTextarea" type="text" value={reportText} placeholder="Description" onChange={(e) => { setReportText(e.target.value) }} />
                </div>

                <button className="greenBtn" onClick={() => {
                    if (reportText != '' && reportSubject != '') {
                        setReportSubmitted(true);
                    }
                }} >Submit</button>
            </div>
        }
        handleClose={toggleReportFrom}
    />
}

            </div > : null
    )
}


export default ActiveJobDetails
