import React from 'react'
import { useState, useEffect , useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import { Snackbar } from '@material-ui/core';
import './../style/snackbar.css'
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";



export default function PostAnswer({qId, customerId ,getData }) {

   
     const [body, setBody] = useState('');
     const [file, setFile] = useState('');
     const [user, setUser] = useState([null]);
     const[newAnswer, setNewAnswer]= useState([null]);
 
     const questionId= qId;
     
     const socket = useRef();
     socket.current = io("ws://localhost:8900");    
      

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
   
    

 
     
    const handleSubmit = async (e) => {

        e.preventDefault();


        if( body!="" ){
       const formData= new FormData();
        formData.append("spId", user?._id);
        formData.append("qId", questionId);
        formData.append("answer", body);
        formData.append("file", file);
       
        socket.current.emit("Notification", {
           spname : user?.first_name + " " + user?.last_name,
           customerId,
           body
          });

       try {
            const res = await axios.post("http://localhost:8000/v1/answer/", formData);

             setNewAnswer(res.data);
             getData(newAnswer);
            
             
          //   alert('Your answer posted successfully');
           
            setBody("");
             setFile("");


           } catch (err) {
             console.log(err);
          }
         }

    };


      
    return (
        <div>
       
      


            <div className='mainHeading' style={{display:'flex'}}>
                <span className='topHeading' > Post Your Answer  
                <span className='Caution'style={{fontSize:'18px', color:'grey'}}> (Only Service Provider Can Post Answer)</span>
                </span>
              
            </div>
            {user.user_type=='Customer'?
            (
            <>
             <div className="featured">
                <div className="featuredItem">
                    <form method='post'  >
                    <fieldset disabled="disabled" style={{opacity:'0.5'}}>

                        <label className="InputLabel"  >Body</label>
                        <textarea required type='textarea' className='titleInput'
                            style={{ width: '100%', overflow: 'scroll' }} rows='10' value={body} name='body'
                            onChange={(e) => { setBody( e.target.value) }}  />

                        <label className="InputLabel">Attach File (if necessary)</label>
                        <input type="file" name='file' onChange={(e) => { setFile( e.target.files[0]) }}/>
                        <br></br>

                        <button className='post' type='submit' onClick={handleSubmit}  >Post</button>
                        </fieldset>
                    </form>
                </div>
            </div>
            
            </>

            )
            :
            (
            <>
            <div className="featured">
                <div className="featuredItem">
                    <form method='post' >
                        <label className="InputLabel"  >Body</label>
                        <textarea required type='textarea' className='titleInput'
                            style={{ width: '100%', overflow: 'scroll' }} rows='10' value={body} name='body'
                            onChange={(e) => { setBody( e.target.value) }}  />

                        <label className="InputLabel">Attach File (if necessary)</label>
                        <input type="file" name='file' onChange={(e) => { setFile( e.target.files[0]) }}/>
                        <br></br>

                        <button className='post' type='submit' onClick={handleSubmit}  >Post</button>
                    </form>
                </div>
            </div>


            </>)
        
        
        }
           
        </div>


    )
}
//
                                // 

                              //  

                            //   