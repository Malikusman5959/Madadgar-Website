import React from 'react'
import axios from "axios";
import './../../style/notification.css'
import {format} from 'timeago.js'
import { useState, useEffect } from 'react';
import User from "./../../img/User.png";

export default function JobNotification() {
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const getNotification = async () => {
            try {
                let userId = localStorage.getItem('user');
                const res = await axios.get(`http://localhost:8000/v1/getJobNotifications/${userId}`);
                setNotifications(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNotification();
    }, []);

   

    return (
       
        


<div className='NotificationContainer' style={{fontSize:'14px' , margin: 'auto', width:'60%', padding: '10px', marginTop:'5%'}}>

<h1 style={{textAlign:'center'}}> Job Notifications </h1>          




{notifications.length===0 ?
            (
                <span className='NoNotification'> No Notifications Yet </span>

            ) : (
                <>
            
            {notifications.map((n) => (
                <>
         <div className='NotificationBox'  >
          

         {n.notifications[0].user.profile_pic  === "" ?
               (   <img className='NotificationImage' style={{width:'42px', height :'42px', borderRadius:'50%', objectFit:'cover'}} src={User} />

              ):
              (   <img className='NotificationImage' style={{width:'42px', height :'42px', borderRadius:'50%', objectFit:'cover'}} src={n.notifications[0].user.profile_pic } />) }
          
             {(n.notifications[0].user.user_type==='Helper' && n.notifications[0].type==='newResponse')?
             (
                <p className='NotificationUser'> {n.notifications[0].user.first_name + " " +
                n.notifications[0].user.last_name} responded to a job 
                <div className='NotificationText'> <strong > <a href="">{n.notifications[0].text} </a> </strong></div>
               <span style={{color:'grey'}}>{format(n.notifications[0].date)}</span>
                </p>    

             ):(
                 <>
                 {n.notifications[0].type==='newJob'?
                 (
                    <p className='NotificationUser'> {n.notifications[0].user.first_name + " " +
                    n.notifications[0].user.last_name} posted a job 
                    <div className='NotificationText'> <strong > <a href="">{n.notifications[0].text} </a> </strong></div>
                   <span style={{color:'grey'}}>{format(n.notifications[0].date)}</span>
                    </p>  

                 ):(
                    <p className='NotificationUser'> {n.notifications[0].user.first_name + " " +
                    n.notifications[0].user.last_name} hired you for a job 
                    <div className='NotificationText'> <strong > <a href="">{n.notifications[0].text} </a> </strong></div>
                   <span style={{color:'grey'}}>{format(n.notifications[0].date)}</span>
                    </p>  
                 )}
               
                </>  
             )}
            
    </div>
        <hr className='divider'></hr>
        </>
            ))}
        </>

        
        )
    }

</div>

    )
}