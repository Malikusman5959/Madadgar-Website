import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import ActiveJobDetails from '../ActiveJobDetails';


function ActiveJobList({ setSelectedTab, selectedTab }) {

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
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Hired' || job.jobStatus == 'Completed'  );
        setList(filteredResult);
        setSelectedItem(null);
        setListVisible(true);

    };


    useEffect(() => {

        getJobData();
        
    }, [selectedTab , refresh])

    return (

        listVisible ?
            <div style={{ width: "100%", minHeight: '300px' }}>
                {list.length != 0 ?
                    <>
                        {
                            list.map((item) =>
                                <ActiveJobCard item={item} listVisible={listVisible} setListVisible={setListVisible} setSelectedItem={setSelectedItem} />
                            )
                        }
                    </>
                    : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Jobs Found. </h2>}

            </div>
            : selectedItem ? <ActiveJobDetails setRefresh={setRefresh} setSelectedTab={setSelectedTab} setListVisible={setListVisible} item={selectedItem} /> : null


    )
}


function ActiveJobCard({ item, listVisible, setListVisible, setSelectedItem }) {


    const hide = (value) => setListVisible(value);
    const [activeJobData, setActiveJobData] = useState(null)


    //GET active job DATA
    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getActiveJobData = async () => {

        const url = `http://localhost:8000/v1/HiredJobs?jobId=${item._id}`;
        const newData = await getData(url);
        const filteredResult = newData.data.hired_jobs[0];
    
        setActiveJobData(filteredResult);
    };


    useEffect(() => {

        getActiveJobData();
   console.log("hello2")
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
                <h4 style={{ fontSize: "14px" , color: item.jobStatus == 'Completed' ? 'green' : '#2575c0'}}>
                    {item.jobStatus == 'Completed' ? 'Completed' : 'In Progress' }
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                {activeJobData == null ? 
                null:
                    <h4 style={{ fontSize: "14px" }}>
                       { moment(moment(activeJobData.createdAt).valueOf()).fromNow()}
   


                    </h4> }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button onClick={() => { setSelectedItem(item); hide(false) }} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                    View </button>
            </div>




        </div>

    )
}


export default ActiveJobList;
