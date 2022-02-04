import React, { useState, useEffect } from 'react'
import TopBar from '../TopBar'
import CustomerCard from './CustomerCard'
import CustomerProfile from './CustomerProfile'
import axios from 'axios';



function Customers({ tab }) {

    const [searchKey, setsearchKey] = useState('');
    const [Customers, setCustomers] = useState([]);
    const [selected, setselected] = useState(null);
    const [refresh, setrefresh] = useState(false);

    const reload = () => {
        setrefresh(!refresh);
    }

    const getdata = async (url) => {

        let res = await axios.get(url);
        return res.data;
    };

    let fetchCustomers = async () => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getdata(url);
        const filteredResult = newData.data.providers.filter(user => user.user_type == 'Customer' );
        setCustomers(filteredResult);
    };


    useEffect(() => {

        setselected(null);
        setsearchKey('');
        fetchCustomers();

    }, [tab, refresh])


    return (
        <div style={{ width: '100%', height: '100%' }}>

            <TopBar heading={tab} searchKey={searchKey} setsearchKey={setsearchKey} />

            {/* Body */}
            {
                selected ?
                    <CustomerProfile reload={reload} item={selected} setselected={setselected} />
                    :
                    <div style={{ height: '70%', maxHeight: '650px', margin: '10px', display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', justifyContent: 'flex-start', padding: '10px' }}>

                        {/* Results */}

                        {
                            Customers.length == 0 ?
                                <p style={{ textAlign: 'center', marginTop: '22%', color: '#2575c0' }}> No results found </p> :
                                Customers.map((item) => {
                                    if (searchKey == '' || item.first_name.toLowerCase().includes(searchKey.toLowerCase()) || item.last_name.toLowerCase().includes(searchKey.toLowerCase()))
                                    {
                                       return <CustomerCard setselected={setselected} item={item} />
                                    }
                                    else{
                                      return null
                                    }

                                }

                                )
                        }

                    </div>

            }

        </div>
    )
}

export default Customers
