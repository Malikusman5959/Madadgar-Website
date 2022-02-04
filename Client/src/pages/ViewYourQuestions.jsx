import React from 'react'

import './../style/viewyourquestions.css'
import './../style/adminhomepage.css'

import { useState, useEffect } from "react";
import axios from "axios";
import AdminTopbar from './AdminTopbar';
import Sidebar from './SideNavBar';
import { Link } from "react-router-dom";
import {  ControlCameraOutlined, DeleteOutline, Edit } from "@material-ui/icons";
import { useNavigate } from 'react-router';



export default function ViewYourQuestion() {
   const navigate = useNavigate();
    const[ownQuestions, setOwnQuestions]= useState([]);
    const[newquestionList, setNewQuestionList]= useState([]);
  
    useEffect(() => {
            const getOwnQuestions = async () => {
              try {
                let id = localStorage.getItem('user');
                
                const res = await axios.get(`http://localhost:8000/v1/yourquestions/${id}` );
                setOwnQuestions(res.data);
                 console.log(res.data);
              
              } catch (err) {
                console.log(err);
              }
            };
            getOwnQuestions();
          }, [newquestionList]);
      
          



          const deleteQuestion = (id) => {
            var questionId = id;
            var confirm = window.confirm("Are you sure? Delete ");
            if (confirm) {
              axios
                .delete(`http://localhost:8000/v1/yourquestions/${questionId}`)
                .then((response) => {
                  if (response.status === 200) {
                    alert("Deletion Successful");
                    setNewQuestionList([]);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
            }
          };      
          

      
         
          
     


    return (
        <>

        <div >
        <AdminTopbar />
       
        <div className="cont" style={{fontSize:'14px', display:'flex', flex:'1', marginTop: '10px'}}>
            <Sidebar />
            <div className='others' style={{fontSize:'14px', flex:'4'}} > 
            <div className='adminhomepage'  >
            <div className='mainHeading'>
                <span className='topHeading'> Your Questions : {ownQuestions.length}</span>
                
            </div>
            {ownQuestions.map((q)=>(
                 <div className="featured">
                 <div className="featuredItem">
                 <div className="postTop">
          <div className="postTopLeft">
          <div className="featuredQuestionContainer">
                  
                   <span className="featuredQuestion" onClick={()=>navigate('/user/viewquestion',{state: {
              _id:  q?._id,
              customerId : q?.customerId,
              title: q?.title,
              body : q?.body,
              file : q?.file,
              createdAt: q?.createdAt
            }})} >{q?.title}</span>
                   
                  
                    
                   </div>
            
          </div>
          <div className="postTopRight" >
            <Edit style={{fontSize:'20px', color:'green', margin:'15px'}} onClick={()=>navigate('/user/editquestion',{state: {
              _id:  q?._id,
              title: q?.title,
              body : q?.body,
              file : q?.file
            }})} />
            <DeleteOutline style={{fontSize:'20px', color:'red'}} onClick={()=>deleteQuestion(q?._id)} />
          </div>
        </div>
                   

                   <div className='featuredRate'>


                   <div className='featureUser'> 
                   <span className="askedby">Asked By: </span>
                   <span className="username">
                       You
                     </span>
                   </div>
                   </div>
           
                   
                 </div>
                 
                 
               </div>
                       
            ))}
          
           </div>
           
            </div>
            <div style={{fontSize:'14px', flex:'1'}} > 
            </div>
         
        </div>

        </div>
       
        </>
    )
}
