import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import Img from "../../img/User.png";
import axios from "axios";
import Webcam from 'react-webcam';




const FindFace = (img) => {

    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: 'user'
    };
    const [initializing, setInitializing] = useState(false);
    const [image, setImage] = useState(Img);
    const canvasRef = useRef();
    const imageRef = useRef();
    const [result, setResult] = useState(false)
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
  let [data, setData] = useState([]);

      
  const getData = async (url, sub_Data) => {
    let res = await axios.post(url, sub_Data);
    return res.data;
  };

  // skills: [searchItem]
  let getSearchedData = async () => {
    const data = {
      email: email,
      password: password,
    };
    
    const url = "http://localhost:8000/v1/login";
    const newData = await getData(url, data);
    setData(newData.data.provider);
    console.log(newData);}

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + "/models";
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ])
                .then(console.log("success", MODEL_URL)).then(handleImageClick)
                .catch((e) => console.error(e));
        };
        loadModels();
    }, []);

    const handleImageClick = async () => {
        try {
            if (initializing) {
                setInitializing(false);
            }
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                imageRef.current
            );
            const displaySize = {
                width: 500,
                height: 350
            };
            faceapi.matchDimensions(canvasRef.current, displaySize);

            const detections = await faceapi.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
            console.log(detections)
            console.log(detections != undefined)
            if (detections != undefined) {
                setResult(true)
                const resizeDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current
                    .getContext("2d")
                    .clearRect(0, 0, imageRef.current.width, imageRef.current.height);
                faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
                console.log(resizeDetections.detection._classScore)

                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections)
            }
            else{  return result
    
              
            }
        }

        catch (error) {
            console.log(error)
        }


    };


    return (
        <div className="App">
            {/* <span>{initializing ? "Initializing" : "Ready"}</span>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img ref={imageRef} src={image} alt="face" crossOrigin='anonymous' height="350px" width="500px" />
                <canvas style={{ position: "absolute", color: "blue" }} ref={canvasRef} />
                {result == true ? null : <div style={{fontSize: "20px"}}>
                    NO face found
                </div>}
            </div> */}
                    <div>
            <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={350}
                videoConstraints={videoConstraints}
            />
            <button onClick={()=>{}}>Click Me!</button>
   
        </div>
        </div>
    );
};

export default FindFace;