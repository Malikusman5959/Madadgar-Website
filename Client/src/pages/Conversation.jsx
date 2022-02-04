import './../style/conversation.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import User from "./../img/User.png";

export default function Conversation({conversation}) {
    
    const [user, setUser] = useState([]);
    

    useEffect(() => {
        const getUser = async () => {
          try {
            let id = localStorage.getItem('user');
            const friendId = conversation.members.find((m) => m !== id);
            const url = `http://localhost:8000/v1/serviceProvider/${friendId}`;
            let res = await axios.get(url);
        
             setUser(res.data.data.provider[0]);
            console.log(res.data.data.provider[0])
       
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);

   
    return (
        <div className="conversation">
                     {user?.profile_pic === "" ?
               (   <img className='conversationImage' alt=""  src={User} />

              ):
              (   <img className='conversationImage' alt=""  src={user?.profile_pic } />) }
          
            <span className="conversationName" style={{fontSize:'14px', fontWeight: '500',    fontFamily: 'Calibri'}}> {user?.first_name + " " + user.last_name} </span>
            
        </div>
    )
}