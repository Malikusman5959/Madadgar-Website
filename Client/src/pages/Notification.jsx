import React from 'react'
import AdminTopbar from './AdminTopbar'
import Sidebar from './SideNavBar'
import AnswerNotification from './AnswerNotification'
import axios from "axios";
import './../style/notification.css'

import { useState, useEffect } from 'react';

export default function Notification() {


    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const getNotification = async () => {
            try {
                let userId = localStorage.getItem('user');
                const res = await axios.get(`http://localhost:8000/v1/getNotifications/${userId}`);
                setNotifications(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNotification();
    }, []);
 
    console.log(notifications===null);

    return (
        <div >
        <AdminTopbar />
       
        <div className="cont" style={{fontSize:'14px', display:'flex', flex:'1', marginTop: '10px'}}>
            <Sidebar />
            <div className='others' style={{fontSize:'14px', flex:'4'}} > 
            <div className='NotificationContainer'>

            {notifications.length===0 || notifications===null?
            (
                <span className='NoNotification'> No Notifications Yet </span>

            ) :
            (
                <>
                {notifications.map((n) => (
                    <>
                    <AnswerNotification notification={n}  />
                    <hr className='divider'></hr>
                    </>
                ))}

                </>

            )
            
            }
           
            </div>
            
            </div>
            <div style={{fontSize:'14px', flex:'1'}} > 
            </div>
         
        </div>

        </div>
        
    )
}