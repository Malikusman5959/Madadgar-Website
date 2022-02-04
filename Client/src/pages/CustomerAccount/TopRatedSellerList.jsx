import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import User from '../User';
import Carousel from 'react-elastic-carousel';



function TopRatedSellerList({ sethome, setSellerProfile }) {

    const [list, setList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    let id = localStorage.getItem('user');

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 },
      ];


    const getTypeData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    // skills: [searchItem]
    let getRatingData = async () => {


        const url = `http://localhost:8000/v1/serviceProviderByRating?type=Helper`;
        const newData = await getTypeData(url);
        const filteredResult = newData.data.provider.filter(rating => rating.rating >= 3);
        setList(filteredResult);
    }

    useEffect(() => {

        getRatingData();

    }, [])

    return (

        <>
            {list.length != 0 ?
                <Carousel breakPoints={breakPoints}>
                    {
                        list.map((item) =>
                            <HelperInfoCard setSellerProfile={setSellerProfile} item={item} sethome={sethome} />
                        )
                    }
                </Carousel>
                : <h2 style={{ textAlign: 'center', color: 'gray', fontSize: '15px', marginTop: '100px' }}> No Jobs Found. </h2>}

        </>


    )
}



function HelperInfoCard({ item, sethome, setSellerProfile }) {


    const hide = (value) => { sethome(value) };
    const [user, setUser] = useState([null]);


    let { _id, first_name, last_name, gender, city, profile_pic, rating, skill } = item;
    const navigate = useNavigate();

    const handleRoute = async (e) => {


        const conversation = {
            senderId: user?._id,
            receiverId: _id
        };

        try {
            const res = await axios.post("http://localhost:8000/v1/conversation/", conversation);

        } catch (err) {
            console.log(err);
        }

        navigate("/user/messenger");

    };

    useEffect(() => {
        const getUser = async () => {
            try {
                let id = localStorage.getItem('user');
                const url = `http://localhost:8000/v1/serviceProvider/${id}`;
                let res = await axios.get(url);

                setUser(res.data.data.provider[0]);

            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);


    return (

        <div className="card-container" style={{
            width: "300px",
            backgroundColor: "#fef8f8",
            border: "2px solid lightgray",
            boxShadow: "none"
        }}>
            <span className="pro" style={{left: "20px"}}>
                <i class="fas fa-star"></i> : {rating.toFixed(1)}</span>
            <img
                className="round"
                src={profile_pic}
                alt="user"
                style={{
                    height: "110px",
                    width: "110px",
                    border: "1px solid #0062cc"
                }}
            />
            <h3 className="card_h3" style={{ color: "#495057" }}>
                {first_name} {last_name}
            </h3>
            <h6 className="card_h6" style={{ color: "#495057" }}>{gender}
            </h6>
            <p className="card_h6"
                style={{
                    color: "#495057"
                }}>
                {city}
            </p>
            <div className="buttons">
                <button className="primary" style={{
                    color: "#ffffff",
                    backgroundColor: "#0062cc",
                    border: "1px solid #0062cc"
                }} id="btn-card-1" onClick={handleRoute}>
                    Message
                </button>
                <button style={{
                    color: "#ffffff",
                    backgroundColor: "#0062cc",
                    border: "1px solid #0062cc"
                }} onClick={() => { setSellerProfile(item); hide(false) }} className="primary ghost" id="btn-card-2">
                    Profile </button>
            </div>

            <div className="skills" style={{ backgroundColor: "#fef8f8", borderTop: "2px solid lightgray" }}>
                <h6 className="skills-h6">Skills</h6>
                <ul>
                    {skill.map((item, index) => (
                        <li style={{boxShadow:"none", backgroundColor: "#0062cc" , color: "white"}}key={index}>{item}</li>
                    ))}
                </ul>
            </div>

        </div>

    )
}


export default TopRatedSellerList;
