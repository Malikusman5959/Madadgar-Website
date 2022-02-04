import React from 'react'

import InfoCards from './InfoCards'
import './../style/adminhomepage.css'

import { useState, useEffect } from "react";
import axios from "axios";


export default function AdminHomePage() {
    const[questions, setQuestions]=useState([]);
    

    useEffect(() => {
        const getQuestions = async () => {
          try {
            const res = await axios.get("http://localhost:8000/v1/allquestions/" );
            setQuestions(res.data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getQuestions();
      }, []);

     
console.log(questions);


    return (
        <div className='adminhomepage'  >
            <div className='mainHeading'>
                <span className='topHeading'> All Questions: {questions.length}</span>
                
            </div>
            {questions.map((q)=>(
                      <InfoCards question={q} />   
            ))}
          
        </div>
    )
}
