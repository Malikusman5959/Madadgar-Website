import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';

import './../style/user.css'

//image imports
import _6 from "./../img/ongoing.jpeg";



function ReviewCardList({item }) {

    const [list, setList] = useState([]);

    //GET REVIEW DATA
    const getReview = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getReviewData = async () => {
        const url = `http://localhost:8000/v1/Review`;
        const newData = await getReview(url);
        console.log(newData)
        const filteredResult = newData.data.reviews.filter(review => review.serviceProvidersId._id == item._id);
        console.log('REVIEWSSSS' , filteredResult);

        setList(filteredResult);

    };



    useEffect(() => {

        getReviewData();
  


    }, [])

    return (
        <>
                    <div style={{ width: "100%", minHeight: '300px' }}>
                        {list.length != 0 ?
                            <>
                                {
                                    list.map((item) =>
                                        <ReviewCard item={item} />
                                    )
                                }
                            </>
                            : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Reviews yet. </h2>}

                    </div> </>
    )
}


function ReviewCard({ item }) {



    useEffect(() => {
        console.log(item)
    }, [])


    return (
<>
        <div className="user-main__hr"></div>
        <div className="user-main__message">
            <div className="user-main__message-header">
                <span className="user-main__message__span">
                    {item.customerId.first_name} {item.customerId.last_name}
                </span>
                <span className="user-main__message__date">
                { moment(moment(item.createdAt).valueOf()).fromNow()}
                </span>
            </div>
            <span className="user-main__message__date">
                   Rating: {item.rating}
                </span>

            <p className="user-main__message-paragraph">
                {item.reviewText}
            </p>
            <div className="user-main__message-footer">
            </div>
        </div>
        </>

    )
}


export default ReviewCardList;
