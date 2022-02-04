import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const UpdatePro = ({handleClose}) => {


    //...........Face Detection for profile picture.............

    const [initializing, setInitializing] = useState(false);
    const [noFaceMsg, setNoFacemsg] = useState('')
    const [invisibleFaceMsg, setInvisibleFaceMsgmsg] = useState('')
    const canvasRef = useRef();
    const imageRef = useRef();
    const [result, setResult] = useState(true);
    const [imgScore, setimgScore] = useState(0.80);
    const [msgNum, setMsgNum] = useState(false)
    const emailRef = useRef();
    const codeRef = useRef();
    const [empty, setEmpty] = useState(false)

    const [url, setUrl] = useState("https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg");

    const updatePhoto = (file) => {

        postImage(file);
    };

    const close = () =>{
        handleClose()
    }
    
        //to update data
    let updateData = async (data) => {
try{
        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        let res = await axios.patch(url, {"profile_pic": data});
        console.log(res.data)
        close()
        return res.data;
        
        

    }catch(e){
        console.log(e)
    }

    };
    
    const postImage = (file) => {

        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "qitwzs7qac");
        data.append("cloud_name", "madadgar");
        fetch("https://api.cloudinary.com/v1_1/madadgar/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
                loadModels();
            })
            .catch((err) => {
                console.log(err);
            });

    };

    //.............. Method for profile picture verification......................
    const handleImageClick = async () => {
        try {
            if (initializing) {
                setInitializing(false);
            }

            setTimeout(() => {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
                    imageRef.current
                );
            }, 2000);

            const displaySize = {
                width: 140,
                height: 200
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
                setimgScore(resizeDetections.detection._classScore)
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections)
            }
            else {
                setResult(false);
                console.log(" in else block", result)

                return result
            }

            if (imgScore >= 0.70 && result == true) {
                setMsgNum(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    };
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


    useEffect(() => {

        setNoFacemsg('Unclear or No face found. Please Upload an other Image')

    }, [result])

    useEffect(() => {

        setInvisibleFaceMsgmsg('Face is no visible. Please choose another Image')

    }, [imgScore])


    return (
     

            <div
                style={{ textAlign: "center", height: "350px", display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center" }} >
                <div   
                    style={{
                        maxWidth: "25em",

                    }}
                >
                        <h1 style={{ fontSize: "15px", color: 'green'  }}>

                            {imgScore >= 0.70 && result == true && msgNum == true ? "Face Detected" : null}</h1>

                        <div style={{ display: "flex", justifyContent: "center", }}>
                            <img style={{ fontSize: "15px", textAlign: "center", border: "2px solid #2575c0" }} ref={imageRef} src={url} alt="Upload a photo" crossOrigin='anonymous' height="200px" width="140px" />
                            <canvas style={{ position: "absolute", color: "blue" }} ref={canvasRef} />
                        </div>
                   
                </div>

                <input style={{marginTop:"1%"}} type="file" onChange={(e) => {
                    updatePhoto(e.target.files[0]);
                    setResult(true);
                    setimgScore(0.80);
                    setEmpty(false);

                }}

                />
                <button className="save-btn main-btn choose-account-btn" style={{width:"100px" ,marginTop:"1%", padding:"1%"}} onClick={() => {
                        if(imgScore >= 0.70 && result == true){
                            updateData(url);
                            updateData(url);
                        }
                }}>
                    Update
                </button>
                {result === false ? <div style={{ fontSize: "14px", display: "block" }}>
                    <p><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {noFaceMsg}</p>
                </div> : null}

                {imgScore <= 0.70 && result == true ? <div style={{ fontSize: "14px" }}>
                    <p style={{}}><i class="fas fa-times" style={{ color: "red", marginRight: "5px" }}> </i> {invisibleFaceMsg} </p>
                </div> : null}

            </div>
    
    )
}

export default UpdatePro
