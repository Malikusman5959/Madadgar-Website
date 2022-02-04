import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Popup from './Popup'

const Membercard = ({ item , setSellerProfile , setsearchPage }) => {
  const [user, setUser] = useState([null]);
  const [conversations, setConversations] = useState([]);
  let { first_name, last_name, gender, city, profile_pic, rating, skill } = item;
  const navigate = useNavigate();
  let id = localStorage.getItem('user');
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const getSpbyId =  async () => {
    
    const url = `http://localhost:8000/v1/serviceProvider/${item._id}`;
    let res = await axios.get(url);
console.log(res.data.data.provider)
    setSellerProfile(res.data.data.provider[0]);
  }



 
  useEffect(() => {
    const getUser = async () => {
      try {

        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        let res = await axios.get(url);

        setUser(res.data.data.provider[0]);


      } catch (err) {
        console.log(err);
      }
    };
    if (id != null) {
      getUser();
    }
  }, []);


  const handleRoute = async (e) => {

    const conversation = {
      senderId: user?._id,
      receiverId: item._id
    };


    try {

      const res = await axios.post("http://localhost:8000/v1/conversation/", conversation);


    } catch (err) {
      console.log(err);
    }

    navigate("/user/messenger");

  };




  return (
    <div className="card-container" style={{width:"300px"}}>
      <span className="pro">{rating.toFixed(1)}</span>
      <img
        className="round"
        src={profile_pic}
        alt="user"
      />
      <h3 className="card_h3">
        {first_name} {last_name}
      </h3>
      <h6 className="card_h6">{gender}</h6>
      <p className="card_h6">
        {city}
      </p>
      <div className="buttons">
        <button className="primary" id="btn-card-1" onClick={id != "null" ? handleRoute : togglePopup}

        >
          Message
        </button>
        <button className="primary ghost" id="btn-card-2"  onClick={()=>
           {getSpbyId();
           setsearchPage(false);}
        }>
          Profile
        </button>
      </div>
      <div className="skills">
        <h6 className="skills-h6">Skills</h6>
        <ul>
          {skill.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

      {isOpen && <Popup
        content={<div className="Popupcontent">

          <div style={{ padding: "5%" }} >
            <h1 style={{ color: "red", fontSize: "large", textAlign: "center", marginBottom: "5px" }}>You need to Login before you can perform this action</h1>
            <h1 style={{ color: "grey", fontSize: "large", textAlign: "center", marginBottom: "10px" }}>Go to login page</h1>
            <button style={{
              color: "white",
              fontSize: "large",
              fontWeight: "Bold",
              textAlign: "center",
              padding: "2%",
              border: "none",
              backgroundColor: "#ffc107",
              boxShadow: " 0px 0px 5px 1px #a1a3a3",
              borderRadius: "10px"
            }} 
            onClick={()=>{
              navigate("/user/login");
            }}
            >Login page</button>
          </div>

        </div>}
        handleClose={togglePopup}
      />}
    </div>
  );
};

export default Membercard;
