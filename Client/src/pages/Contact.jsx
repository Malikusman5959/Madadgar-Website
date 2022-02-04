import React from 'react'
// import './../App'
// import './../style/auth.css'
// import './../style/normalize.css'
// import './../style/fonts.css'
// import './../style/variables.css'
// import './../style/text.css'
// import './../style/base.css'
// import './../style/home.css'
// import './../style/header.css'
// import './../style/top-bar.css'
import './../style/footer.css'
// import './../style/inputs.css'
// import './../style/burger-menu.css'
// import './../style/media-queries.css'
// import './../style/pay.css'
// import './../style/payments.css'
// import './../style/select.css'
// import './../style/user.css'

import _34 from "./../img/phone-call.svg";
import _35 from "./../img/group-74.svg";
import _36 from "./../img/group-75.svg";

const Contact = () => {
    return (
        <div>
           <footer className="footer contact-us">
                <div className="row">
                    <div className="col-sm-6 col-12 contact-us__form-col">
                        <div className="div">
                            <h1 className="section-title" id='contact-us'>
                                Contact <span>Us</span>
                            </h1>
                            <p className="section-description">
                                We respond to emails, phone calls and give
                                solutions that everyone's seek it, keep in touch
                                </p>
                            <form action="#">
                                <label>
                                    Name
                                        <input type="text" name='name' required />
                                </label>
                                <label>
                                    Email Address
                                        <input type="email" name='email' required />
                                </label>
                                <label>
                                    Mobile Number
                                        <input type="number" name='number' />
                                </label>
                                <label>
                                    Message
                                        <textarea name="message" rows="6" required></textarea>
                                </label>
                                <button className="contact-us-btn main-btn">
                                    Contact us
                                    </button>
                            </form>
                            <p className="privacy-policy__paragraph">
                                Copy Rights Madadgar 2021, All Rights Reserved
                                </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12 contact-us__info-col">
                        <div className="div">
                            <a className="contact-us__block" href='tel:+96789095432'>
                                <img src={_34} alt="Contact Us Phone Number" />
                                <p className='pt-4'>Mobile Number</p>
                                <p>+923107139928</p>
                            </a>
                            <a className="contact-us__block" href='mailto:invictus@gmail.com'>
                                <img src={_35} alt="Contact Us Email" />
                                <p className='pt-4'>Email Address</p>
                                <p>Madadgar@gmail.com</p>
                            </a>
                            <a className="contact-us__block" href='https://www.google.com/maps/search/Box+No.4325+El-Sheikh+Mohammed+bin+Rashid-Dubai+UAE/@25.0750853,54.947555,10z/data=!3m1!4b1'>
                                <img src={_36} alt="Contact Us Map" />
                                <p className='pt-4'>Address</p>
                                <p>Gulzar Heights, Sector G-9<br />Islamabad Pakistan</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="haha">

                </div>
            </footer> 
        </div>
    )
}

export default Contact



