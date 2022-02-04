import React, { useState, useEffect } from 'react'
import TopBar from '../TopBar'
import HelperCard from './HelperCard'
import HelperProfile from './HelperProfile'
import axios from 'axios';


function Helpers({ tab }) {

    const [searchKey, setsearchKey] = useState('');
    const [helpers, setHelpers] = useState([]);
    const [selected, setselected] = useState(null);
    const [refresh, setrefresh] = useState(false);
    const [statusSelector, setstatusSelector] = useState('All');


    const reload = () => {
        setrefresh(!refresh);
    }


    const getdata = async (url) => {

        let res = await axios.get(url);
        return res.data;
    };

    let fetchHelpers = async () => {
        const url = "http://localhost:8000/v1/serviceProvider";
        const newData = await getdata(url);
        const filteredResult = newData.data.providers.filter(user => user.user_type == 'Helper' );
        setHelpers(filteredResult);
    };

    
    useEffect(() => {

        setselected(null);
        setsearchKey('');
        fetchHelpers();

    }, [tab, refresh])


    return (
        <div style={{ width: '100%', height: '100%' }}>

            <TopBar heading={tab} searchKey={searchKey} setsearchKey={setsearchKey} />

           {/* selectors */}
           <div style={{ height: '50px', margin: '10px', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>

            <select style={{
                border: '1px solid #2575c0', borderRadius : '2px' , width : '120px' , color : '#2575c0' , height: "20px" , fontSize: "15px"
           
            }} name="statusPicker" value={statusSelector} onChange={(e)=>{setstatusSelector(e.target.value)}}>
                <option value="All">All</option>
                <option value="Blocked">Blocked</option>
            </select>

            </div>

            {/* Body */}
            {

                selected ?
                    <HelperProfile reload={reload} item={selected} setselected={setselected} />
                    :
                    <div style={{ height: '70%', maxHeight: '450px', margin: '10px', display: 'flex', flexWrap: 'wrap', marginLeft: '5%',overflowY: 'scroll', justifyContent: 'flex-start', padding: '10px' }}>

                        {/* Results */}

                        {
                            helpers.length == 0 ?
                                <p style={{ textAlign: 'center', marginTop: '22%', color: '#2575c0' }}> No results found </p> :
                                helpers.map((item) => {
                                    if ((searchKey == '' || item.first_name.toLowerCase().includes(searchKey.toLowerCase()) || item.last_name.toLowerCase().includes(searchKey.toLowerCase())))
                                    {

                                        if ((statusSelector == 'All' && item.certify != 'Blocked') || (statusSelector == 'Blocked' && item.certify == 'Blocked')) {
                                            return <HelperCard setselected={setselected} item={item} />
                                        }
                                      
                                    }
                                    else
                                    {
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

export default Helpers
