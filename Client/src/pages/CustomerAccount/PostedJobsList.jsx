import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import PostedJobDetails from '../PostedJobDetails';


function PostedJobsList({setSelectedTab , selectedTab}) {

    const [list, setList] = useState([]);
    const [listVisible, setListVisible] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refresh, setRefresh] = useState(0);
    let id = localStorage.getItem('user');
    

    //GET JOB DATA
    const getJob = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getJobData = async () => {
        const url = `http://localhost:8000/v1/JobPostRoutes/JobsByCustomer?id=${id}`;
        const newData = await getJob(url);
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Open');
        setList(filteredResult);
        setSelectedItem(null);
        setListVisible(true);

    };


    useEffect(() => {

        getJobData();

    }, [refresh , selectedTab])

    return (

       listVisible ? 
       <div style={{ width: "100%", minHeight: '300px' }}>
       {list.length != 0 ?
           <>
           {
           list.map((item) => 
              <PostedJobCard item={item} listVisible={listVisible} setListVisible={setListVisible} setSelectedItem={setSelectedItem} />
           )
           }
           </>
           : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Jobs Found. </h2>}

   </div>
   :  selectedItem ? <PostedJobDetails setRefresh={setRefresh} setSelectedTab={setSelectedTab} setListVisible={setListVisible} item={selectedItem}  /> : null  


    )
}


function PostedJobCard({ item , listVisible , setListVisible , setSelectedItem}) {


    const [list, setList] = useState([])
    let id = localStorage.getItem('user');
    const hide = (value)=> setListVisible(value);


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

        <div style={{ marginBottom: "10px", border: "2px solid lightgray", width: "100%", height: "80px", borderRadius: "10px", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: "10px" }}>

            <div style={{ display: 'inline', width: "40%" }}>
                <h1 style={{ fontSize: "20px" }}>
                    {item.title}
                    <span style={{ fontSize: "10px" }}> ({item.jobType})</span>
                </h1>
                <h4 style={{ fontSize: "14px" }}>
                    {item.location}
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                <h4 style={{ fontSize: "14px" }}>
                    {list.length} responses
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                <h4 style={{ fontSize: "14px" }}>
                {moment(item.createdAt).format('LL')}
                </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button onClick={() => { setSelectedItem(item); hide(false) }} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}> View </button>
            </div>
        {console.log(listVisible)}
      


        </div>

    )
}


export default PostedJobsList;
