import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import JobHistoryDetails from '../JobHistoryDetails';


function JobHistory({ setSelectedTab, selectedTab }) {

    const [list, setList] = useState([]);
    const [listVisible, setListVisible] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    let id = localStorage.getItem('user');


    //GET JOB DATA
    const getJob = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getJobData = async () => {
        const url = `http://localhost:8000/v1/JobPostRoutes/JobsByCustomer?id=${id}`;
        const newData = await getJob(url);
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Finished' || job.jobStatus == 'Terminated'  );
        setList(filteredResult);
        setSelectedItem(null);
        setListVisible(true);
    };
 

   
    useEffect(() => {

        getJobData();
        
    }, [selectedTab])

 

    return (

        listVisible ?
            <div style={{ width: "100%", minHeight: '300px' }}>
                {list.length != 0 ?
                    <>
                        {
                            list.map((item) =>
                                <JobHistoryCard item={item} listVisible={listVisible} setListVisible={setListVisible} setSelectedItem={setSelectedItem} />
                            )
                        }
                    </>
                    : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Jobs Found. </h2>}

            </div>
            : selectedItem ? <JobHistoryDetails setSelectedTab={setSelectedTab} setListVisible={setListVisible} item={selectedItem} /> : null

    )
}


function JobHistoryCard({ item, listVisible, setListVisible, setSelectedItem }) {


    const hide = (value) => setListVisible(value);
    const [date, setDate] = useState(null);
    const [reviewDate, setReviewDate] = useState(null)



    const getdata = async (url , data) => {
        let res = await axios.get(url , data);
        return res.data;
    };

    // //get review posted date
    // let getReviewByJobId = async () => {

    //     const url = `http://localhost:8000/v1/ReviewByJobId`;
    //     const newData = await getdata(url, {jobId : item._id});
    //     const filteredResult = newData.data.reviews[0];
    //     console.log('Review' , item , newData.data.reviews);
    //     setDate(filteredResult.createdAt);
    // };

        //GET REVIEW DATA
        const getReview = async (url) => {
            let res = await axios.get(url);
            return res.data;
        };
    
        let getReviewData = async () => {
            const url = `http://localhost:8000/v1/Review`;
            const newData = await getReview(url);
            const filteredResult = newData.data.reviews.filter(review => review.jobId._id == item._id);
            setReviewDate(filteredResult[0])
            console.log(filteredResult[0].createdAt)
        };
     //get report posted date
     let getReportByJobId = async () => {

        const url = `http://localhost:8000/v1/ReportByJobId`;
        const newData = await getdata(url, {jobId : item._id});
        const filteredResult = newData.data.reports[0]
        setDate(filteredResult.createdAt);
    };

    useEffect(() => {
        if (item.jobStatus == 'Finished')
        {
            getReviewData();
        }
        else
        {
            getReportByJobId();
        }
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
                    {item.jobStatus}
                </h4>
            </div>

            <div style={{ display: 'inline' }}>
                {reviewDate == null ? 
                null:
                    <h4 style={{ fontSize: "14px" }}>
                       { moment(moment(reviewDate.createdAt).valueOf()).fromNow()}
                       {/* moment(moment(activeJobData.createdAt).valueOf()).fromNow() */}

                    </h4> }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
                <button onClick={() => { setSelectedItem(item); hide(false) }} style={{ width: "80px", height: '40px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                    View </button>
            </div>



        </div>

    )
}


export default JobHistory;
