import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2'

function DoughnutChart() {


    const [data, setdata] = useState({
        labels : [ 'Helpers' , 'Customers'],
        datasets : [
            {
                data : [0 , 0],
                borderColor: ['#2575c0' , '#FF7F7F'],
                backgroundColor: ['#2575c0' , '#FF7F7F'],
            }
    
        ]
    })


    const [helpers, sethelpers] = useState(null);
    const [customers, setcustomers] = useState(null);
    const [blocked, setblocked] = useState(null);

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

    let fetchBlocked = async () => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getdata(url);
        const filteredResult = newData.data.providers.filter(user => user.certify == 'Blocked');
        setblocked(filteredResult.length);
    };


    useEffect(() => {

        fetchHelpers();
        fetchCustomers();
        fetchBlocked();

    }, [])

    
    useEffect(() => {

       if (blocked != null && customers != null  && helpers != null )
       {
            setdata({
                labels : [ 'Helpers' , 'Customers' , 'Blocked'],
                datasets : [
                    {
                        data : [helpers , customers , blocked],
                        borderColor: ['#2575c0' ,'#99cc00' , '#FF7F7F'],
                        backgroundColor: ['#2575c0', '#99cc00' , '#FF7F7F'],
                    }
            
                ]
            })
       }

    }, [blocked , customers , helpers])



   


    return (
        <Doughnut data={data}/>
    )
}

export default DoughnutChart
