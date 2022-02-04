import React from 'react'
import AdminTopbar from './AdminTopbar';
import Sidebar from './SideNavBar';
import PostAnswer from './PostAnswer';
import './../style/viewquestion.css'
import AnsweredCard from "./AnsweredCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'timeago.js'

import { useHistory, useLocation } from 'react-router-dom';



export default function ViewQuestion() {
    let location = useLocation();
    const [answers, setAnswers] = useState([]);
    const [UpdatedAnswers, setUpdatedAnswers] = useState(null);
    const questionId = location.state._id;


    const getData = (answer) => { // the callback. Use a better name
      setUpdatedAnswers(answer);
    };

    

    
    useEffect(() => {
        const getAnswers = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/v1/answers/${questionId}`);
                setAnswers(res.data);
                

            } catch (err) {
                console.log(err);
            }
        };
        getAnswers();
    }, [UpdatedAnswers]);
 
  

    const [questions, setQuestions] = useState({

        customerId: location.state.customerId,
        title: location.state.title,
        body: location.state.body,
        file: location.state.file,
        createdAt: location.state.createdAt
    });

    const [user, setUser] = useState([null]);



    useEffect(() => {
        const getUser = async () => {
            try {
                const url = `http://localhost:8000/v1/serviceProvider/${questions?.customerId}`;
                let res = await axios.get(url);
                setUser(res.data.data.provider[0]);

            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [UpdatedAnswers]);




    return (

        <>

            <div >
                <AdminTopbar />

                <div className="cont" style={{ fontSize: '14px', display: 'flex', flex: '1', marginTop: '10px' }}>
                    <Sidebar />
                    <div className='others' style={{ fontSize: '14px', flex: '4' }} >
                        <div className='adminhomepage'  >
                            <div className='mainHeading'>
                                <span className='topHeading'> {questions.title}</span>
                            </div>
                            <div className='subHeading'>
                                <span className='heading1'> Asked:
                                    <span className='heading2'>{format(questions.createdAt)}</span>
                                </span>

                            </div>
                            <hr className='divider'></hr>
                            <div className='BodyContainer'>
                                <div className='AskedByHeading'>
                                    <span className='AskedBy'> Asked By :
                                        <span className='heading2'> {user?.first_name + " " + user?.last_name}</span>
                                    </span>

                                </div>
                                {questions.body}
                            </div>

                            {questions.file == null ? (
                                <>
                                    <div className='AttachedFile'>
                                        <span className='fileHeading1'>No File Attached</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='AttachedFile'>
                                        <span className='fileHeading'>Attached File</span>

                                    </div>
                                    <div className='AttachedFileContainer'>



                                        <embed
                                            src={`http://localhost:8000/uploads/${questions.file}`}
                                            type="application/pdf"
                                            frameBorder="0"
                                            scrolling="auto"
                                            height="100%"
                                            width="100%"
                                        ></embed>
                                    </div>
                                </>
                            )}


                            <hr className='divider'></hr>
                            <div className='mainHeading'>
                                <span className='topHeading'> Answers: {answers.length}</span>
                            </div>
                            {answers.map((a) => (
                         
                                <AnsweredCard answer={a} getData={getData}  />

                            ))}

                            
                          


                        </div>
                        <hr className='divider'></hr>
                        <div className='PostAnswerContainer'>
                            <PostAnswer qId={questionId}  customerId={questions?.customerId}
                        getData={getData} />
                            </div>
                   

                    </div>
                    <div style={{ fontSize: '14px', flex: '1' }} >
                    </div>

                </div>

            </div>

        </>

    )
}
