import React from 'react'
import { Divider, Feed } from "semantic-ui-react";
import './../style/notification.css'
import { useNavigate } from 'react-router';
import {format} from 'timeago.js'
import User from "./../img/User.png";

export default function AnswerNotification({notification}) {
    const navigate = useNavigate();
    console.log(notification);
    
    return (
        <>
        {notification.user.user_type==='Customer' ? (
        <div className='NotificationBox'  >
           {notification.user.profile_pic === "" ?
               (   <img className='NotificationImage' style={{width:'42px', height :'42px', borderRadius:'50%', objectFit:'cover'}} src={User} />

              ):
              (   <img className='NotificationImage' style={{width:'42px', height :'42px', borderRadius:'50%', objectFit:'cover'}} src={notification.user.profile_pic } />) }
          
             
             <p className='NotificationUser'>  {notification.user.first_name+ " " + notification.user.last_name} voted your answer on question
             <div className='NotificationText'> <strong onClick={()=>navigate('/user/viewquestion',{state: {
              _id:  notification.question._id,
              customerId : notification.question.customerId,
              title: notification.question.title,
              body : notification.question.body,
              file : notification.question.file,
              createdAt: notification.question.createdAt
            }})}>{notification.question.title}</strong></div>
            <span style={{color:'grey'}}>{format(notification.date)}</span>
             </p>    
    </div>
    ): 
    (
      <div className='NotificationBox'  >
               <img className='NotificationImage' style={{width:'42px', height :'42px', borderRadius:'50%', objectFit:'cover'}} src={notification.user.profile_pic } />
             <p className='NotificationUser'>  {notification.user.first_name+ " " + notification.user.last_name} answered your question
             <div className='NotificationText'> <strong onClick={()=>navigate('/user/viewquestion',{state: {
              _id:  notification.question._id,
              customerId : notification.question.customerId,
              title: notification.question.title,
              body : notification.question.body,
              file : notification.question.file,
              createdAt: notification.question.createdAt
            }})}>{notification.question.title}</strong></div>
            <span style={{color:'grey'}}>{format(notification.date)}</span>
             </p>    
    </div>
    )}
       
      
   
        
      </>
    )
}