import React, { useState, useEffect } from 'react'
import TopBar from '../TopBar'
import ReportCard from './ReportCard'
import moment from 'moment';
import axios from 'axios';
import HelperProfile from '../Helpers/HelperProfile';
import CustomerProfile from '../Customers/CustomerProfile'



function Reports({ tab }) {

    const [searchKey, setsearchKey] = useState('');
    const [Reports, setReports] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [date, setdate] = useState('Today');
    const [statusSelector, setstatusSelector] = useState('All');
    const [selected, setselected] = useState(null);



    const reload = () => {
        setrefresh(!refresh);
    }

    const getdata = async (url) => {

        let res = await axios.get(url);
        return res.data;
    };

    let fetchReports = async () => {
        const url = "http://localhost:8000/v1/Report";
        const newData = await getdata(url);
        setReports(newData.data.Reports);
    };


    useEffect(() => {

        setsearchKey('');
        fetchReports();

    }, [tab, refresh])


    const findDate = (status) => {

        if (status == 'Today') {
          return moment(new Date()).format('L')
        }
        else if (status == 'Yesterday') {
          return moment(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24)).format('L')
        }

        else if (status == 'This Week') {
            return moment(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 168)).format('L')
        }

        else {
          return moment(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 720)).format('L')
        }
    
      }
    

    return (
        <div style={{ width: '100%', height: '100%' }}>

            <TopBar heading={tab} searchKey={searchKey} setsearchKey={setsearchKey} />

            {/* Body */}


                    {/* selectors */}
                    <div style={{ height: '50px', margin: '10px', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                   <div>
                    <p style={{color : '#2575c0' , fontSize:"15px"}}>Report Date:</p>
                    <select style={{
                        border: '1px solid #2575c0', borderRadius : '5px' , width : '120px' , color : '#2575c0' , fontSize:"15px"
                    }} name="datePicker" value={date} onChange={(e)=>{setdate(e.target.value)}}>
                        <option value="All">All</option>
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                    </div>

                    <div>
                    <p style={{color : '#2575c0' , fontSize:"15px"}}>Report Stauts:</p>

                    <select style={{
                        border: '1px solid #2575c0', borderRadius : '5px' , width : '120px' , color : '#2575c0', fontSize:"15px"
                    }} name="statusPicker" value={statusSelector} onChange={(e)=>{setstatusSelector(e.target.value)}}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Responded">Responded</option>
                    </select>
</div>
                    </div>
                    
                    
                    
                    {/* Results */}


                    {
                          selected ?
                            selected.user_type == 'Helper' ?
                            <HelperProfile item={selected} setselected={setselected} report='true' /> : <CustomerProfile reload={reload} item={selected} setselected={setselected} report='true'/>
                            :

                            <div style={{ height: '70%', maxHeight: '650px',  margin: '10px', display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', justifyContent: 'flex-start', padding: '10px' }}>

                    
                            {
                                      Reports.length == 0 ?
                                          <p style={{ textAlign: 'center', marginTop: '22%', color: '#2575c0' }}> No results found </p> :
                                          Reports.map((item) => {
                                              if (searchKey == '' || item.ReportSubject.toLowerCase().includes(searchKey.toLowerCase()) )
                                              {
                                                  if ( date == 'All' || (date == 'Today' && findDate(date) == moment((item.createdAt).valueOf()).format('L')) || (date == 'Yesterday' && findDate(date) == moment((item.createdAt).valueOf()).format('L')) || ((date == 'This Week' || date == 'This Month') && findDate(date) <= moment((item.createdAt).valueOf()).format('L')) ) {
          
                                                      if (statusSelector == 'All' || (statusSelector == 'Responded' && statusSelector == item.status) || (statusSelector == 'Pending' && item.status != 'Responded')) {
                                                          return <ReportCard setselected={setselected} item={item} reload={reload} />
                                                      }
                                                      
                                                  }
                                                
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

export default Reports
