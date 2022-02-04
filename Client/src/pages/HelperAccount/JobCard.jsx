import React, { useState, useEffect } from 'react'
import './../../style/jobCardCss.css'
import axios from "axios";
import { style } from 'dom-helpers';
import moment from 'moment';


const JobCard = ({ item , click , unclickable , btnName , refresh }) => {

    let { _id, customerId, jobType, location, address, Budget, Description, title , createdAt} = item

    const [link, setlink] = useState(true);
    const [disableBtn, setdisableBtn] = useState(false)
    const [respond, setRespond] = useState(false);
    let [responseData, setResponseData] = useState(null);
    let id = localStorage.getItem('user');

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

    const checkResponse = (serviceProviderId, jobId) => {

        for (let i = 0; i < responseData.length; i++) {
            //console.log("Serv ID  : " + serviceProviderId + "Job ID : " + jobId + "SerId : " + responseData[i].ServiceProviderId._id + "JobId" + responseData[i].jobId._id)

            if (responseData[i].ServiceProviderId._id == serviceProviderId && responseData[i].jobId._id == jobId) {
                console.log("MAtched")
                return true;
            }
        }
        return false;
    }


    useEffect(() => {
        getResponseData();
    }, [refresh])

    useEffect(() => {
       
        if (responseData != null)
        {
            setRespond(checkResponse(id , _id)) ;
        }
        
    }, [responseData])



    return (

        <div style={{ marginBottom: "10px", border: "2px solid lightgray", width: "100%", height: "80px", borderRadius: "10px", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: "10px" }}>
            <div style={{ display: 'inline', width: "40%" }}>
                <h3 style={{ fontSize: "14px" }}>{title} <span style={{ fontSize: "10px" }} >({jobType})</span></h3>
                </div>
                <div style={{ display: 'inline', width: "40%" }}>
                <h3 style={{ fontSize: "14px" }}> {customerId.first_name} {customerId.last_name}</h3>
                </div>
                <div style={{ display: 'inline', width: "40%" }}> 
                <h4 style={{ fontSize: "14px" }}>{location}</h4>
                </div>
                <div style={{ display: 'inline', width: "40%" }}>
                <h4 style={{ fontSize: "14px" }}> { moment(createdAt).format("LL")}</h4>
                
                </div>
                <div style={{ display: 'inline', width: "40%" }}>
                <h4 style={{ fontSize: "14px" }}> Rs.{Budget}</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button value={btnName} disabled={unclickable || respond}  onClick={()=>{click()}}
                style={{ width: "80px", 
                height: '40px', 
                fontSize: '15px', 
                borderRadius: '10px', 
                backgroundColor: '#2575c0',
                 border: "none",
                  color: '#ffffff' }}> {respond ? "Responded" : "Respond"} </button>
            </div>
     
    </div >

    )
}

export default JobCard
