import React from 'react'
import './../style/viewquestion.css'
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import { format } from 'timeago.js'
import { useNavigate } from 'react-router';
import EditAnswer from './EditAnswer';
import {io} from "socket.io-client";
import { Snackbar } from '@material-ui/core';
import './../style/snackbar.css'
import SnackbarContent from "@material-ui/core/SnackbarContent";
export default function AnsweredCard({answer, getData}) {
 const navigate = useNavigate();


   
 const socket = useRef();
    const [user, setUser] = useState([null]);
    const [votes, setVotes] = useState([null]);
    const [count, setCount] = useState(0);
    const [deletedAnswer, setDeletedAnswer] = useState([null]);
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);

    socket.current = io("ws://localhost:8900");
      
      
  
    
 


   
  

    const deleteAnswer = (answerid) => {
        var answerId = answerid;
        let userId = localStorage.getItem('user');

        var confirm = window.confirm("Are you sure? Delete ");
        if (confirm) {
          axios
            .delete(`http://localhost:8000/v1/answer/delete/${answerId}/${userId}`)
            .then((response) => {
              if (response.status === 200) {
                alert("Deletion Successful");
           
              }
               setDeletedAnswer([]);
              getData(deletedAnswer);
        
            })
            .catch((err) => {
                alert("You cannot delete other user Answers");
            });
        }
      }; 

      const getComponent = () => {
          console.log('clicked');
          navigate('/user/editanswer',{state:{_id:answer?._id,
            spId: answer?.spId,
            qId:answer?.qId,
        answer: answer?.answer}});
          
      }; 



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




 const handleClick = async (e) => {

        e.preventDefault();
        const vote = {
          customerId:user?._id,
          answerId: answer?._id,
          voted: true
        }
        
        socket.current.emit("VoteNotification", {
          customer_name: user?.first_name + " " + user?.last_name,
          spId: answer.spId
         });

       try {
            const res = await axios.post("http://localhost:8000/v1/vote/",vote);
            setVotes(res.data);
            // alert('Voted Successfully')

           } catch (err) {
            alert('You have already Voted')
             
             console.log(err);
          }
         

    };


   

    useEffect(() => {
      const getVotes = async () => {
          try {
              const url = `http://localhost:8000/v1/votes/${answer?._id}`;
              let res = await axios.get(url);
              setCount(res.data)
          
          } catch (err) {
              console.log(err);
          }
      };
      getVotes();
  }, [votes]);

      
    return (
        <>
      
        
        
        <div className='WrapUpContainer' style={{display:'flex' }}> 
        {user.user_type==='Customer'?(
          <div className='votesContainer' style={{flex:'1' }} > 
          <button class="pushable" onClick={handleClick}>
    <span class="front">
      {count.length}
    </span>
  
      </button>
          <span> Votes</span>
          </div>
        ):(
          <div className='votes' style={{flex:'1' }}  > 
        <button class="diabledButton" disabled  >
  <span class="DisabledFront" disabled >
    {count.length}
  </span>

    </button>
        <span> Votes</span>
        </div>
        )
        }
        
       
        <div className='AnsweredContainer' style={{margin:'0px', flex:'10'}} >
            <div className='AnswerHeading'>
                <span className='AnsweredBy'> Answered By :
                    <span className='heading2'> {answer.spId.first_name + " " + answer.spId.last_name }</span>
                </span>

            </div>

            <div className='AnsweredText'>{answer?.answer}
            </div>

            <div className='AnsweredTime' style={{color: 'grey', marginTop:'25px'}}>{format (answer?.createdAt)}
            </div>

        </div> 
      
            </div>
            <div className='AnswerAction' style={{display:'flex', color:'grey' , margin:'0px 0px 20px 100px' }}>
              <span style={{padding:'6px', cursor:'pointer'  }} onClick={getComponent}> Edit</span>
              <span style={{padding:'6px', cursor:'pointer'}} onClick={()=>deleteAnswer(answer?._id)}> Delete</span>
            </div>
        </>
    )
}
