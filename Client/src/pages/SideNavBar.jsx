import React from 'react'
import './../style/sidenavbar.css'
import {
    LineStyle,
    ViewList,
    Help ,
    Notifications,
    QuestionAnswer
    
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";
import axios from "axios";


export default function Sidebar() {


  
  const [user, setUser] = useState([null]);

 

  useEffect(() => {
      const getUser = async () => {
        try {
          let id = localStorage.getItem('user');
          const url = `http://localhost:8000/v1/serviceProvider/${id}`;
          let res = await axios.get(url);
      
           setUser(res.data.data.provider[0]);
     
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }, []);

  return (
    <div className="sidebar">
       <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/user/adminpanel" className="link">
            <li className="sidebarListItem active"
            id={ window.location.pathname== '/user/adminpanel'? 'active': ''}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        {user.user_type=='Customer'? 
        (
        <>
         <div className="sidebarMenu" >
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/user/askquestion" className="link">
              <li className="sidebarListItem" 
               id={ window.location.pathname == '/user/askquestion'? 'active': ''}
               onClick={()=>{console.log(window.location.pathname)}}>
                <Help className="sidebarIcon" />
                Ask a Question
              </li>
            </Link>
            <Link to="/user/viewyourquestions" className="link"  >
              <li className="sidebarListItem"
                id={ window.location.pathname == '/user/viewyourquestions'? 'active': ''}
                onClick={()=>{console.log(window.location.pathname == '/user/viewyourquestions')}}
                >

                <ViewList className="sidebarIcon" />
                View Your Questions
              </li>
            </Link>
            <Link to="/user/notification" className="link"  >
              <li className="sidebarListItem"
               id={ window.location.pathname == '/user/notification'? 'active': ''}>
                <Notifications className="sidebarIcon" />
               Notifications
              </li>
            </Link>

          </ul>
        </div>
        </>
        )
        :
        (
        <> 
         <div className="sidebarMenu" >
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            
            <Link to="/user/notification" className="link"  >
              <li className="sidebarListItem"
              id={ window.location.pathname == '/user/notification'? 'active': ''}>
                <Notifications className="sidebarIcon" />
                 Notifications
              </li>
            </Link>
          </ul>
        </div>

        </>
        )
        }
       
        
      </div>
    </div>
  );
}