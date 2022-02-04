import React from 'react'

const footer = () => {
    return (
        <div style={{

            backgroundColor: " var(--main-navbar-color)",
            color: "#ffffff",
            position: "relative",
            bottom: 0,
            width: "100%",
            padding: "8%"
        }}>
            <footer>
                <div style={{
                    paddingLeft: "40%",
                    listStyle: "none",
                    textAlign: "center",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    marginBottom: 0,
                    display: "flex",
                    alignContent: "center",
                    position: "relative"

                }}>
                    <a style={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        lineHeight: "40px",
                        display: "inline-block",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "1px solid rgb(255, 255, 255)",
                        margin: "0 8px",
                        color: "inherit",
                        opacity: "0.75",
                    }} href="#"><i class="icon ion-social-instagram"></i></a>
                    <a style={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        lineHeight: "40px",
                        display: "inline-block",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "1px solid rgb(255, 255, 255)",
                        margin: "0 8px",
                        color: "inherit",
                        opacity: "0.75",
                    }}
                        href="#">
                        <i class="icon ion-social-snapchat">
                        </i>
                    </a>
                    <a style={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        lineHeight: "40px",
                        display: "inline-block",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "1px solid rgb(255, 255, 255)",
                        margin: "0 8px",
                        color: "inherit",
                        opacity: "0.75",
                    }} href="#">
                        <i class="icon ion-social-twitter">
                        </i>
                    </a>
                    <a style={{
                        fontSize: "24px",
                        width: "40px",
                        height: "40px",
                        lineHeight: "40px",
                        display: "inline-block",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "1px solid rgb(255, 255, 255)",
                        margin: "0 8px",
                        color: "inherit",
                        opacity: "0.75",
                    }} href="#">
                        <i class="icon ion-social-facebook"></i>
                    </a>
                </div>
                <ul style={{
                    paddingLeft: "33%",
                    listStyle: "none",
                    textAlign: "center",
                    fontSize: "18px",
                    lineHeight: 1.6,
                    marginBottom: 0,
                    display: "inline-block",
  
                }}>
                    <li ><p>Gulzar Heights, Sector G-9, Islamabad Pakistan</p></li>
                    <li ><p>Email: Madadagar@gmail.com</p></li>
                </ul>
                <p style={{
                    justifyContent: "center",
                    marginTop: "15px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "rgb(255, 255, 255)",
                    marginBottom: 0,
                  
                }} >Madadgar © 2021</p>
            </footer >
        </div >
    )
}

export default footer
