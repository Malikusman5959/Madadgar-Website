import React from 'react'

import _6 from "./../../img/bgImg.jpg";

const LearnMore = () => {
    return (
        <>
            <div
                style={{
                    backgroundColor: "white",
                    height: "280px",
                    width: "auto",
                    boxShadow: " grey -1px -1px 8px",
                    padding: "2%",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage: `url(${_6})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    alignItems: "flex-start",
                    marginBottom: "1%"
                }}>
                <h1
                    style={{
                        backgroundColor: "#2575c06e",
                        height: "230px",
                        width: "100%",
                        padding: "9%",
                        fontSize: "30px",
                        color: "white",
                        fontFamily: "Roboto, sans-serif",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column"

                    }}>
                    Learn about Us? <br /> <span style={{ fontSize: "medium" }}>Learn how you can get more with Madadgar</span>

                </h1>
            </div>
            <div><h1 style={{


                width: "100%",
                padding: "2%",
                fontSize: "30px",
                color: "#ffc107",
                fontFamily: "Roboto, sans-serif",

                display: "flex",
                flexDirection: "column"

            }} >Maitaining a Good Profile</h1>
                <p style={{
                    paddingLeft: "2%",
                    paddingRight: "4%",
                    paddingBottom: "4%",
                    fontSize: "20px",
                    color: "black",
                    fontFamily: "Roboto, sans-serif",
                }}>Maitaining a Good Profile.Maitaining a Good Profile Maitaining a Good Profile Maitaining a Good Profile Maitaining
                    a Good Profile Maitaining a Good Profile Maitaining a Good ProfileMaitaining a Good Profile Maitaining a Good Profile Maitaining
                    a Good Profile Maitaining a Good ProfileMaitaining a Good Profile Maitaining a Good Profile Maitaining a Good Profile</p>
            </div>
            <div
                // style={{
                //     width: "auto",
                //     display: 'grid',
                //     gridTemplateColumns: "repeat(3, 1fr)",
                // }}
            >
                <h1 style={{


                    width: "100%",
                    padding: "2%",
                    fontSize: "30px",
                    color: "#ffc107",
                    fontFamily: "Roboto, sans-serif",
                    display: "flex",
                    flexDirection: "column"

                }} >What Skills to Enter</h1>
                <p style={{
                    paddingLeft: "2%",
                    paddingRight: "4%",
                    paddingBottom: "4%",
                    fontSize: "20px",
                    color: "black",
                    fontFamily: "Roboto, sans-serif",
                }}>the things you can do the best should be entered as skills. skills are all customer are looking for. and to get good reviews and rating only add the skills that you are really good at and get higher rating. gain more customers</p>
            </div>

        </>
    );
}


export default LearnMore
