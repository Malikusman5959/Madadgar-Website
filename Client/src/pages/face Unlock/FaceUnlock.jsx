import React, {Component} from 'react';
import Webcam from 'react-webcam';
import WebcamCapture from './Webcam'


const FaceUnlock = () => {
    return (
        <div>
        <div>
          <h2>Live Face Recognition run on the Web</h2>
        </div>
        <WebcamCapture/>
      </div>
    )
}

export default FaceUnlock


