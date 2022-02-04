import React from 'react'
import './../style/chatBoxTopBanner.css'
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import User from "./../img/User.png";

export default function ChatBoxTopBanner({current}) {

    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const getUser = async () => {
          try {
            let id = localStorage.getItem('user');
            const friendId = current.members.find((m) => m !== id);
            const url = `http://localhost:8000/v1/serviceProvider/${friendId}`;
            let res = await axios.get(url);
        
             setUser(res.data.data.provider[0]);
            console.log(res.data.data.provider[0])
       
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [current]);

    return (
        <div className='ChatBoxBannerContainer'>
           {user?.profile_pic === "" ?
               (   <img className='UserImage' alt=""  src={User} />

              ):
              (   <img className='UserImage' alt=""  src={user?.profile_pic } />) }
          
            <span className="UserName"> {user?.first_name + " "  + user?.last_name}</span>
            
        </div>
    )
}