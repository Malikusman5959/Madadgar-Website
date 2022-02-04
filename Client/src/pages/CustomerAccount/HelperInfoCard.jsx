import React, { useState } from 'react'
import './../../style/project.css'
import WriteReview from './WriteReview'

const HelperInfoCard = ({status , name , title , date , amount }) => {
    const [review, setReview] = useState(false);
    const [home, setHome] = useState(true);
    const [rating, setRating] = useState(0);
    // const [status, setstatus] = useState("");
    // const [date, setdate] = useState();
    // const [amount, setamount] = useState("0");

    return (
        <div >

            <div className="our-team">
                <div className="picture">
                    <img className="img-fluid" src="https://picsum.photos/130/130?image=1027" />
                </div>
                <div className="team-content">
                    <h3 className="name">{name}</h3>
                    <h4 className="title">{title}</h4>
                    <br />
                    <br />
                    <h4 className="HiredInfo"><b>Status : {status}</b></h4>
                    <h4 className="HiredInfo"><b>Hired date: {date}</b></h4>
                    <h4 className="PaymentDisplay"><b>Payable: {amount}</b></h4>
                    {{ status } == "Completed" ?
                        <button className="bye" onClick={() => { setReview(true); }}>Review</button> : null
                    }
                    {review == true ?
                        <WriteReview rating={rating} onRating={(rate) => setRating(rate)} onClick={() => { setHome(true) }} /> : null
                    }
                </div>
            </div>


        </div>
    )
}

export default HelperInfoCard
