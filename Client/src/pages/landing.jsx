import React from 'react'
import './../App'
import './../style/auth.css'
import './../style/normalize.css'
import './../style/fonts.css'
import './../style/variables.css'
import './../style/text.css'
import './../style/base.css'
import './../style/home.css'
import './../style/header.css'
import './../style/top-bar.css'
import './../style/footer.css'
import './../style/inputs.css'
import './../style/burger-menu.css'
import './../style/media-queries.css'
import './../style/pay.css'
import './../style/payments.css'
import './../style/select.css'
import './../style/user.css'

import _1 from "./../img/logo.png";
import _0 from "./../img/logo2.png";
import _2 from "./../img/sign-in.png";
import _3 from "./../img/header-11.png";
import _4 from "./../img/header-2.svg";
import _5 from "./../img/header-3.svg";
import _6 from "./../img/job1.png";
import _7 from "./../img/job2.png";
import _8 from "./../img/christopher-burns-wiu-3-w-99-t-ng-unsplash.png";
import _9 from "./../img/job4.png";
import _10 from "./../img/john-towner-b-zxq-6-z-umqkw-unsplash.png";
import _11 from "./../img/mission2.jpg";
import _12 from "./../img/phil-desforges-ow-1-m-ml-1-s-oi-0-unsplash.png";
import _13 from "./../img/j1.jpg";
import _14 from "./../img/j2.jpg";
import _15 from "./../img/j3.jpg";
import _16 from "./../img/j4.jpg";
import _17 from "./../img/j5.jpg";
import _18 from "./../img/j6.jpg";
import _19 from "./../img/Group-78.jpg";
import _20 from "./../img/map.svg";
import _21 from "./../img/construction.svg";
import _22 from "./../img/contract.svg";
import _23 from "./../img/surface-1.svg";
import _24 from "./../img/group-77.svg";
import _25 from "./../img/close.svg";
import _26 from "./../img/close.svg";
import _27 from "./../img/foto-sushi-6-anudmp-i-lw-4-unsplash.png";
import _28 from "./../img/close.svg";
import _29 from "./../img/close.svg";
import _30 from "./../img/r2.png";
import _31 from "./../img/close.svg";
import _32 from "./../img/close.svg";
import _33 from "./../img/r3.png";
import _34 from "./../img/phone-call.svg";
import _35 from "./../img/group-74.svg";
import _36 from "./../img/group-75.svg";

import { BrowserRouter as Linkn } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Nav from './nav'


function Landing() {
    
    let navigate = useNavigate();

    return (
        <div className="App" >


            <header className="header" id='home' >
                <Nav />

                <div className="header-benefits" style={{padding:"8%"}}>

                    <div className="header-benefits__block" style={{marginTop:"5%"}}>
                        <a onClick=
                                    {()=>{
                                        navigate('/user/login');
                                    }}> <img src={_3} alt="Health Care Image" /> </a>
                        <span ><p className='cir-btn-hd'> Helper </p></span>
                        <p>
                            Be a service provider<br />
                                    and reach thousands of <br />
                                    customers
                                </p>
                    </div>


                    <div className="header-benefits__block" style={{marginTop:"5%"}} >
                        <a href=""> <img src={_4} alt="Wealth Care Image" />  </a>
                        <span > <p className='cir-btn-hd'> Customer </p></span>
                        <p>
                            Search hundreds of services<br />
                                    and find the best match <br />
                                    for your requirements
                                </p>
                    </div>



                    <div className="header-benefits__block" style={{marginTop:"5%"}}>
                        <a href=""><img src={_5} alt=">Life Relation Care Image" /></a>
                        <span> <p className="cir-btn-hd"> FAQ Portal </p> </span>
                        <p>
                            Find solutions to your<br />
                                    daily life problems and <br />
                                    seek the professional's advice
                                </p>
                    </div>



                </div>
            </header>

            {/* <!-- WHO WE ARE SECTION --> */}

            <section className="who-we-are">
                <div className="container">
                    <h1 className="section-title" id="who-we-are">
                        Who <span> we </span> are
                    </h1>
                    <p className="section-description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s
                    </p>
                    <div className="who-we-are__img-container">
                        <img src={_6} alt="who we are image" />
                        <img src={_7} alt="who we are image" />
                        <img src={_8} alt="who we are image" />
                        <img src={_9} alt="who we are image" />
                    </div>
                    {/* <!-- GALLERY SECTION --> */}

                    <section className="masonry-gallery" id="masonry-gallery">
                        <div className="row">
                            <div className="col-sm-4 col-12 masonry-gallery__col">
                                <h3 className="masonry-gallery__title">
                                    <span>Madadgar's</span> Vision
                                </h3>
                                <p className="masonry-gallery__description">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's
                                </p>
                                <img src={_10} alt="masonry gallery image" />
                            </div>
                            <div className="col-sm-4 col-12 masonry-gallery__col">
                                <img src={_11} alt="masonry gallery image" />
                                <h3 className="masonry-gallery__title">
                                    <span>Madadgar's</span> Mission
                                </h3>
                                <p className="masonry-gallery__description">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                            <div className="col-sm-4 col-12 masonry-gallery__col">
                                <h3 className="masonry-gallery__title">
                                    <span>Madadgar's</span> History
                                </h3>
                                <p className="masonry-gallery__description">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum
                                </p>
                                <img src={_12} alt="masonry gallery image" />
                            </div>
                        </div>
                    </section>
                </div>
            </section>


            {/* <!-- SERVICES SECTION --> */}

            <section className='services'>
                <div className="container">
                    <h1 className="section-title" id="services">
                        <span>Madadgar's</span> Services
                    </h1>
                </div>
                <div className="services__container mb-5">
                    <div className="row">
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_13} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                Tutoring
                            </p>
                        </div>
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_14} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                Grocery Picking
                            </p>
                        </div>
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_15} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                House Services
                            </p>
                        </div>
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_16} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                Driver service
                            </p>
                        </div>
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_17} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                Babysitting
                            </p>
                        </div>
                        <div className="services-slider__block col-lg-4 col-sm-6 col-12">
                            <img src={_18} alt="Services slider image" />
                            <p className="services-slider__block-description">
                                Many more
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- WHY Madadgar --> */}

            <section className="why-ids">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-7 why-ids__info col-12 pr-0">
                            <h1 className="section-title" id='why-ids'>
                                Why<span> Madadgar?</span>
                            </h1>
                            <p> Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s</p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.
                            </p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard
                            </p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.
                            </p>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s
                            </p>
                        </div>
                        <div className="col-sm-4 col-12 why-ids__img-col pl-0">
                            <img src={_19} alt="" />
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- HOW IT WORKS SECTION --> */}

            <section className="how-it-works pt-5">
                <div className="container">
                    <div className="section-title" id="how-it-works">
                        How it <span>works</span>?
                    </div>
                    <div className="row how-it-works__row">

                        <div className="col-md-3 col-6 how-it-works__row-block">
                            <div className="how-it-works__row-block__img-container">
                                <img src={_20} alt="How it works image" />
                            </div>
                            <p>Choose location</p>
                        </div>

                        <div className="col-md-3 col-6 how-it-works__row-block">
                            <div className="how-it-works__row-block__img-container">
                                <img src={_21} alt="How it works image" />
                            </div>
                            <p>Choose kind of service</p>
                        </div>

                        {/* <!-- Second Row --> */}

                        <div className="col-md-3 col-6 how-it-works__row-block">
                            <div className="how-it-works__row-block__img-container">
                                <img src={_22} alt="How it works image" />
                            </div>
                            <p>Choose the requirement</p>
                        </div>
                        <div className="col-md-3 col-6 how-it-works__row-block">
                            <div className="how-it-works__row-block__img-container">
                                <img src={_23} alt="How it works image" />
                            </div>
                            <p>Choose payment type</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- CLIENTS FEEDBACK SECTION --> */}

            <section className="clients-feedback">
                <div className="container">
                    <h1 className="section-title" id="clients-feedback">
                        <span>Customers</span> feedback
                    </h1>
                    <img src={_24} alt='decoration' className="clients-feedback__decoration-img" />
                    <div className="client-feedback__slider">
                        <div className="client-feedback__slider-block">
                            <img src={_25} alt="quotes image" className="quotes_rotate" />
                            <div className="client-feedback__slider-block__description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>
                            <img src={_26} alt="quotes image" className="quotes_normal d-flex" />
                            <div className="client-feedback__slider-block__user">
                                <img src={_27} alt="User photo" />
                                <div className="client-feedback__slider-block__user-info">
                                    <div className="client-feedback__slider-block__user-info__name">
                                        Ahmed Murtaza
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__specialty">
                                        University Professor
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__company">
                                        Islamabad
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="client-feedback__slider-block">
                            <img src={_28} alt="quotes image" className="quotes_rotate" />
                            <div className="client-feedback__slider-block__description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>
                            <img src={_29} alt="quotes image" className="quotes_normal d-flex" />
                            <div className="client-feedback__slider-block__user">
                                <img src={_30} alt="User photo" />
                                <div className="client-feedback__slider-block__user-info">
                                    <div className="client-feedback__slider-block__user-info__name">
                                        Maira Shah
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__specialty">
                                        House Wife
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__company">
                                        Lahore
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="client-feedback__slider-block">
                            <img src={_31} alt="quotes image" className="quotes_rotate" />
                            <div className="client-feedback__slider-block__description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book. It has survived not
                                only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                            </div>
                            <img src={_32} alt="quotes image" className="quotes_normal d-flex" />
                            <div className="client-feedback__slider-block__user">
                                <img src={_33} alt="User photo" />
                                <div className="client-feedback__slider-block__user-info">
                                    <div className="client-feedback__slider-block__user-info__name">
                                        Tahir Jahangeer
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__specialty">
                                        Retiref Army Officer
                                    </div>
                                    <div className="client-feedback__slider-block__user-info__company">
                                        Karachi
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* <!-- CONTACT US FOOTER --> */}

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

export default Landing
