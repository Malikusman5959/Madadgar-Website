import React, { useState, useEffect } from 'react'
import axios from 'axios';


function Numerics() {


    const [helpers, sethelpers] = useState(null);
    const [customers, setcustomers] = useState(null);
    const [jobs, setjobs] = useState(null);

    const getdata = async (url) => {

        let res = await axios.get(url);
        return res.data;
    };

    let fetchHelpers = async () => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getdata(url);
        const filteredResult = newData.data.providers.filter(user => user.user_type == 'Helper');
        sethelpers(filteredResult.length);
    };

    let fetchCustomers = async () => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getdata(url);
        const filteredResult = newData.data.providers.filter(user => user.user_type == 'Customer');
        setcustomers(filteredResult.length);
    };

    let fetchJobs = async () => {
        const url = "http://localhost:8000/v1/JobPostRoutes";
        const newData = await getdata(url);
        const filteredResult = newData.data.joblist.filter(job => job.jobStatus == 'Open' || job.jobStatus == 'Hired' || job.jobStatus == 'Request' || job.jobStatus == 'Completed');
        setjobs(filteredResult.length);
    };


    useEffect(() => {

        fetchHelpers();
        fetchCustomers();
        fetchJobs();

    }, [])


    return (


        helpers && customers && jobs ?
            <div style={{ display: 'flex', flexDirection: 'row', height: '230px', width: '750px', backgroundColor: '#ffffff', justifyContent: 'center' }}>
                <div style={{ margin: '10px', marginTop: '70px', width: '180px', height: '100px', backgroundColor: '#ffffff', border: '1px solid #2575c0', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {customers} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> CUSTOMERS </p>

                </div>
                <div style={{ margin: '10px', marginTop: '70px', width: '180px', height: '100px', backgroundColor: '#ffffff', border: '1px solid #2575c0', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {helpers} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> HELPERS </p>

                </div>
                <div style={{ margin: '10px', marginTop: '70px', width: '180px', height: '100px', backgroundColor: '#ffffff', border: '1px solid #2575c0', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ fontSize: '45px', fontWeight: 'bold', color: '#2575c0' }}> {jobs} </div>
                    <p style={{ color: '#2575c0', letterSpacing: '2px', margin: 0, fontSize: '13px' }}> JOBS ACTIVE </p>

                </div>
            </div>
            : null

    )
}

export default Numerics
