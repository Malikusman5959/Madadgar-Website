import React from 'react'
import AdminTopbar from "./AdminTopbar";
import Sidebar from './SideNavBar';
import "./../style/inputs.css";
import './../style/askquestion.css';

import { useState, useEffect } from "react";
import axios from "axios";

import {NavLink,useHistory, useLocation} from 'react-router-dom';

export default function EditQuestion() {
   let location =useLocation();



  
   const questionId= location.state._id;
   console.log(questionId);
 

   const [question,setQuestion]= useState({
       
     title :location.state.title,
     body: location.state.body
  });


  let name ,value;
    
  const handleInputs = (e) =>{
     name= e.target.name;
     value= e.target.value;

     setQuestion({
         ...question , 
         [name]:value
     })
  }
  

      const UpdateData = async (e) =>{
        e.preventDefault();
        const {title, body} = question;
   
         const res = await fetch(`http://localhost:8000/v1/yourquestions/edit/${questionId}`, {
             method:"PUT", 
             headers:{
               "Content-Type" : "application/json"
             },
             body: JSON.stringify({
               title, body
             })
         });
   
          const data= await res.json();
          console.log(data.status);
           if(data.status === 401 || !data){
            alert("You cannot edit other user Answers");
              
           }
           else{
               window.alert('Successfully updated');
               setQuestion({
               title:'', body:''
                  
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
                    <span className='topHeading'> Ask a Question</span>
                </div>
                <div className="featured">
                    <div className="featuredItem">
                        <form  >
                            <label className="InputLabel" >Title</label>
                            <input  type="text" className='titleInput' name='title'
                             style={{ width: '100%' }} 
                             value={question.title}
                             onChange={handleInputs}  required/>
                            
                            
                            <label className="InputLabel"  >Body</label>
                            <textarea required  type='textarea' className='titleInput' name='body' 
                            style={{ width: '100%', overflow: 'scroll' }} rows='10'
                            value={question.body}
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
