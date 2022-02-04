import './../style/infocards.css'
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
export default function InfoCards({question}) {



  const navigate = useNavigate();
   const [customers, setCustomers]= useState([]);
   useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/v1/serviceProvider/${question.customerId}` );
        setCustomers(res.data.data.provider[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, [question]);

  const [answers, setAnswers] = useState([]);
  console.log(question._id);


  useEffect(() => {
      const getAnswers = async () => {
          try {
              const res = await axios.get(`http://localhost:8000/v1/answers/${question._id}`);
              setAnswers(res.data);

          } catch (err) {
              console.log(err);
          }
      };
      getAnswers();
  }, [question]);


console.log(answers.length);

  return (
    <div className="featured">
      <div className="featuredItem">
        <div className="featuredQuestionContainer">
        <span className="featuredQuestion" onClick={()=>navigate('/user/viewquestion',{state: {
              _id:  question?._id,
              customerId: question?.customerId,
              title: question?.title,
              body : question?.body,
              file : question?.file,
              createdAt: question?.createdAt
            }})} >{question?.title}</span>
         
        </div>
        <div className='featuredRate'>
          <div className='featureRateAnswers'>
          <span className="featuredAnswer">Answers: </span>
        <span className="Answer"> {answers.length}</span>
          </div>
      


        <div className='featureUser'> 
        <span className="askedby">Asked By: </span>
        <span className="username">
            {customers?.first_name + " " + customers?.last_name}
          </span>
        </div>
        </div>

        
      </div>
      
      
    </div>
  );
}