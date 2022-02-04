import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';


const WebcamCapture = () => {
  let navigate = useNavigate();
    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: 'user'
    };

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(`imageSrc = ${imageSrc}`)
            //for deployment, you should put your backend url / api
            let id = localStorage.getItem('user');
            const url = `http://localhost:8000/v1/serviceProvider/${id}`;
             axios.patch(url, { face: imageSrc })
                .then(res => {
                    navigate('/user/FindFace');
                    console.log(`response = ${res.data}`)
        
                })
                .catch(error => {
                    console.log(`error = ${error}`)
                })
        },
        [webcamRef]
    );

    return (
        <div>
            <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Click Me!</button>
   
        </div>
    );

};

export default WebcamCapture;