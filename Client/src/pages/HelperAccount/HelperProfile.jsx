import { useState, useEffect } from 'react';
import '../../App'
import './../../style/HelperProfile.css'
import moment from 'moment';
import _1 from "./../../img/logo2.png";
import _2 from "./../../img/sign-in.png";
import _3 from "./../../img/people-image.jpg";
import _4 from "./../../img/plus.svg";
import _5 from "./../../img/plus.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Editprofile from './Editprofile';
import ReviewCardList from '../ReviewCardList';


const HelperProfile = ({ item, firstName, lastName, rate, pay, profile, gender, email, education, profilePic, Skills, onReview, city, contact }) => {



  let id = localStorage.getItem('user');
  const [count, setCount] = useState(null)
  const [edit, setedit] = useState(false)
  const [review, setReview] = useState(false)
  const [prrofile, setProfile] = useState(true)

  const getReview = async (url) => {
    let res = await axios.get(url);
    return res.data;
  };

  let getReviewData = async () => {
    const url = `http://localhost:8000/v1/Review`;
    const newData = await getReview(url);
    console.log(newData)
    const filteredResult = newData.data.reviews.filter(review => review.serviceProvidersId._id == id);
    console.log('REVIEWSSSS', filteredResult);
    let num = 0
    for (let i = 0; i < filteredResult.length; i++) {
      num += 1;
    }
    setCount(num)


  };


  useEffect(() => {

    getReviewData();



  }, [])



  return (

    <div className="MainBody">
      <div className="container bootstrap snippets bootdey" style={{ marginTop: "5%" }}>
        <div className="row">
          <div className="profile-nav col-md-3">
            <div className="panel">
              <div className="user-heading round">
           <a href='#'>
                  <img src={profile} alt="" />
                  </a>
                <h1>{firstName} {lastName}</h1>
                <p>{email}</p>
              </div>
              <ul className="nav nav-pills nav-stacked">
                <li className="edit active" onClick={() => {
                  setedit(false);
                  setReview(false);
                  setProfile(true);

                }}
                ><a href="#"> <i className="fa fa-user" /> Profile</a></li>
                <li className="edit" onClick={() => {
                  setedit(true);
                  setReview(false);
                  setProfile(false);
                }}
                ><a href="#"> <i className="fa fa-edit" />Edit Profile</a></li>
              </ul>
            </div>
          </div>

          <div className="profile-info col-md-9">
            {prrofile ?
              <>
                <div className="panel">

                  <div className="bio-graph-info">
                    <h1>Bio Graph</h1>
                    <div className="row">
                      <div className="bio-row">
                        <p><span>First Name </span>: {firstName} </p>
                      </div>
                      <div className="bio-row">
                        <p><span>Last Name </span>: {lastName}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Country </span>: {city}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Email </span>: {email}</p>
                      </div>
                      <div className="bio-row">
                        <p><span>Mobile </span>: {contact}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="panel">
                        <div className="panel-body">
                          <div className="bio-chart">
                            <div style={{ display: 'inline', width: '100px', height: '100px' }}>
                              <canvas width={100} height="100px" />
                              <input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={count} data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style={{ width: '54px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '20px', marginLeft: '-77px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '28px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(224, 107, 125)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                          </div>
                          <div className="bio-desk" onClick={onReview}>
                            <h4 className="red">Reviews </h4>
                            <p onClick={() => {
                              setReview(true);
                              setedit(false);
                              setProfile(false);
                            }}>See Reviews</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="panel">
                        <div className="panel-body">
                          <div className="bio-chart">
                            <div style={{ display: 'inline', width: '100px', height: '100px' }}><canvas width={100} height="100px" /><input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={moment(item.registrationDate).format('dddd')} data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style={{ width: '67px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '20px', marginLeft: '-82px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '15px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(150, 190, 75)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                          </div>
                          <div className="bio-desk">
                            <h4 className="green">Date of Joining</h4>
                            <p>Started : {moment(item.registrationDate).format("LL")}</p>  {/* TODO calculatepayment and display */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> </> : null}
            {review ? <div style={{ fontSize: "5px" }}><h1 style={{ fontSize: "40px", color: "#2575c0" }}>Reviews</h1><ReviewCardList item={item} /> </div> : null}
            {edit ? <Editprofile /> : null}
          </div>

        </div>
      </div>
    </div>
  )
}

export default HelperProfile
