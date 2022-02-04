import './../../style/reviewpage.css'
import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";



library.add(faStar);

const WriteReview = ({ count, rating, color, onRating, onClick, text }) => {


    


    const [star, setstar] = useState("0")
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return color.filled;
        } else if (!hoverRating && rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FontAwesomeIcon
                    key={idx}
                    className="cursor-pointer"
                    icon="star"
                    onClick={() => onRating(idx)}
                    style={{ color: getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ));
    }, [count, rating, hoverRating]);

    return (
        <div className="RatingClass">

            <h1><b>Rate Helper</b></h1>
            <div className="ReviewStars">{starRating}</div>
            <h1><b>Post a review</b></h1>
            <textarea className="II" type="text" placeholder="Enter description" >{text}</textarea>
            <button className="RateBtn" onClick={onClick}>post</button>
        </div>
    )


}

WriteReview.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    },
};


WriteReview.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "#DCDCDC",
    },
};


export default WriteReview
