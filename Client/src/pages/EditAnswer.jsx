import React from 'react'
import AdminTopbar from "./AdminTopbar";
import Sidebar from './SideNavBar';
import "./../style/inputs.css";
import './../style/askquestion.css';

import { useState, useEffect } from "react";
import axios from "axios";
import {NavLink,useHistory, useLocation} from 'react-router-dom';
export default function EditAnswer() {
    let location =useLocation();
 
    const answerId = location.state._id;
    const spId = location.state.spId;
    const questionID = location.state.qId;

    const [answerField,setAnswer]= useState({
       
        answer :location.state.answer,
     });
   
   
     let name ,value;
       
     const handleInputs = (e) =>{
        name= e.target.name;
        value= e.target.value;
   
        setAnswer({
            ...answerField , 
            [name]:value
        })
     }
     
   
         const UpdateData = async (e) =>{
           e.preventDefault();
           const {answer} = answerField;
           let userId = localStorage.getItem('user');
            const res = await fetch(`http://localhost:8000/v1/answer/edit/${answerId}/${userId}`, {
                method:"PUT", 
                headers:{
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                  answer
                })
            });
      
             const data= await res.json();
              if(data.status === 422 || !data){
                  window.alert('Invalid Data');
                 
              }
              else{
                  window.alert('Successfully updated');
                  setAnswer({
                  answer:''
                     
                  });
      
   
              }
        }


    return (
        <div>
        <AdminTopbar />
        <div className='LeftContainer' style={{ display:'flex'}}>

            <div className="sidebarContainer" style={{ fontSize: '14px', flex: '1', marginTop: '10px' }}>
                <Sidebar />
            </div>

            <div className="mainContainer" style={{ fontSize: '14px', flex: '4' }}>
                <div className='mainHeading'>
                    <span className='topHeading'> Edit Your Answer</span>
                </div>
                <div className="featured">
                    <div className="featuredItem">
                        <form  >
                            <textarea required  type='textarea' className='titleInput' name='answer' 
                            style={{ width: '100%', overflow: 'scroll' }} rows='10'
                            value={answerField.answer}
                            onChange={handleInputs} />


                            <button className='post' type='submit' onClick={UpdateData}  >Post</button>
                            
                        </form>
                   
                        

                    </div>
                </div>
            </div>
            <div className='others' style={{flex:1}}></div>


        </div>
    </div>
    )
}
