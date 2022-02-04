import React from 'react'
import './../style/popup.css'

const popupmsg = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>{props.text}</h1>
                <button className="closeBtn" onClick={()=> props.setTrigger}>Close</button>
                
            </div>
        </div>)

        : "";
}

export default popupmsg
