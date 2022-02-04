import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';

//Component Imports
import JobRequestDetails from './JobRequestDetails';

//image imports
import _6 from "./../../img/pro.jpg";



function JobRequests({  }) {

    const [list, setList] = useState([]);
    const [listVisible, setListVisible] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    let id = localStorage.getItem('user');


    const setreloadList = ()=> {
        setRefresh(!refresh);
    }

    //GET JOB DATA
    const getJob = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getJobData = async () => {
        const url = `http://localhost:8000/v1/JobPostRoutes/JobsBySP?id=${id}`;
        const newData = await getJob(url);
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Request');
        setList(filteredResult);
        setSelectedItem(null);
        setListVisible(true);
    };


    useEffect(() => {
        
        getJobData();
        
    }, [refresh])

    return (

        <>
 
      <div
      style={{
        backgroundColor: "white",
        height: "250px",
        width: "100%",
        boxShadow: " grey -1px -1px 8px",
        padding: "2%",
        display: "flex",
        justifyContent: "space-between",
        backgroundImage: `url(${_6})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "flex-start",
    }}>
         <h1
                    style={{
                        backgroundColor: "#2575c06e",
                        height: "200px",
                        width: "100%",
                        padding: "8%",
                        fontSize: "30px",
                        color: "white",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column"

                    }}>
                    Manage Job Requests <br /> <span style={{ fontSize: "medium" }}>See the list of all the request sent by the customers</span>

                </h1>
        
       </div>
       <div> 
           
           {
                listVisible ?
                <>
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

                        <div style={{ display: 'inline', width: "39%", color: '#2575c0' }}>
                            <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
                                Job title
                            </h4>

                        </div>

                        <div style={{ display: 'inline' }}>
                            <h4 style={{ fontSize: "16px", color: '#2575c0', fontWeight: "600" }}>
                               Requested by
                            </h4>
                        </div>
                        <div style={{ display: 'inline', color: '#2575c0' }}>
                            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                               Request Status

                            </h4>
                        </div>
                        <div style={{ display: 'inline', color: '#2575c0' }}>
                            <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                               Requested on

                            </h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                            <h4 style={{ fontSize: "16px", color: '#2575c0', fontWeight: "600", marginRight: "50%" }}>
                                Action

                            </h4>
                        </div>

                    </div>
                <div style={{ width: "100%", minHeight: '300px' }}>
                    {list.length != 0 ?
                        <>
                            {
                                list.map((item) =>
                                    <JobRequestCard item={item} listVisible={listVisible} setListVisible={setListVisible} setSelectedItem={setSelectedItem}/>
                                )
                            }
                        </>
                        : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Jobs Found. </h2>}
    
                </div></>
                : selectedItem ? 
                
                <JobRequestDetails setListVisible={setListVisible} item={selectedItem} setreloadList={setreloadList}/>
                 : null
    
           }
       </div>
        </>
    )
}


function JobRequestCard({ item, listVisible, setListVisible , setSelectedItem}) {


    const hide = (value) => setListVisible(value);

    useEffect(() => {
      console.log(item)
    }, [])

    return (

     
        <div style={{ marginBottom: "10px", marginLeft : '10px' , marginRight : '10px' , border: "2px solid lightgray", height: "80px", borderRadius: "10px", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: "10px" }}>

            <div style={{ display: 'inline', width: "35%" }}>
                <h1 style={{ fontSize: "20px" }}>
                    {item.title}
                    <span style={{ fontSize: "10px" }}> ({item.jobType})</span>
                </h1>
                <h4 style={{ fontSize: "14px" }}>
                    {item.location}
                </h4>
            </div>

            <div style={{ display: 'inline'}}>
               
                   
               
                <h4 style={{ fontSize: "15px" }}>
                Posted By :  {item.customerId.first_name} {item.customerId.last_name}
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                <h4 style={{ fontSize: "14px" , color: item.jobStatus == 'Completed' ? 'green' : '#2575c0'}}>
                    {item.jobStatus == 'Request' ? 'Requested' : null }
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                    <h4 style={{ fontSize: "14px" }}>
                       { moment(moment(item.createdAt).valueOf()).fromNow()}
                    </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button onClick={() => { setSelectedItem(item); hide(false) }} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                    View</button>
            </div>

        </div> 

    )
}


export default JobRequests;
