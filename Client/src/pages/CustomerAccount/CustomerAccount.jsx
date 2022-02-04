import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';
import ActiveJobDetails from '../ActiveJobDetails';
import { useNavigate } from 'react-router-dom';

import User from '../User';

//images imports
import _1 from "./../../img/logo2.png";
import _2 from "./../../img/sign-in.png";
import _3 from "./../../img/tasks.jpg";
import _4 from "./../../img/requests.jpg";
import _5 from "./../../img/profile.jpg";
import _6 from "./../../img/bgImg.jpg";
import _10 from "./../../img/logout.png";
import _33 from "./../../img/r3.png";
import _7 from "./../../img/customers.jpg";
import _8 from "./../../img/dashboardIcon.png";
import TopRatedSellerList from './TopRatedSellerList';
import CustomersPostedJob from './CustomersPostedJob';
import NearbySellers from './NearBySellers'
import Contact from '../Contact';
import { Search } from '../pages';
import PostJob from './PostJob'
import Customerprofile from './Customerprofile';


function CustomerAccount({ }) {


    let navigate = useNavigate();
    let [userData, setUserData] = useState({})
    const [home, sethome] = useState(true);
    const [sellerProfile, setSellerProfile] = useState(null);
    const [search, setSearch] = useState(false)
    const [contactform, setcontactform] = useState(false);
    const [postJob, setPostJob] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [loc, setloc] = useState('')
    const [locationCheck, setlocationCheck] = useState(false)
    let id = localStorage.getItem('user');
    const [tabNav, settabNav] = useState(false)


    var lat = ''
    var long = ''
    var location = ''

    //const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
    const API_KEY1 = `8d8e7ec2724f4e71c9fcf33dc829813e`;
    const API_KEY = `dde815931fd85791b48d0dd5eaffd04a`;
    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };


    //...................Get User Location.....................

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            lat = position.coords.latitude
            long = position.coords.longitude
            console.log(lat + " long " + long)

            getCity();





        }
        )

    }, [])

    function getCity() {
        console.log(lat + " long " + long)
        axios.get(`http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${lat},${long}`)
            .then((response) => {
                console.log(response.data.data[0].locality)
                location = response.data.data[0].locality
                console.log(location)
                setloc(location)
                setlocationCheck(true)
            })
            .catch(error => console.log(error))

    }

    //...................End of user loaction....................

    // skills: [searchItem]
    let getSearchedData = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getData(url);
        console.log(newData.data.provider[0])
        setUserData(newData.data.provider[0])
    };

    // const userLocation = () =>{

    // }

    const getTypeData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    // skills: [searchItem]
    let getRatingData = async () => {


        const url = `http://localhost:8000/v1/serviceProviderByRating?type=Helper`;
        const newData = await getTypeData(url);
        const filteredResult = newData.data.provider.filter(rating => rating.rating >= 3);

        console.log(newData.data.provider)
        // setData(filteredResult)
    };


    useEffect(() => {
      
      
    }, [locationCheck])
    // const [data, setData] = useState([])


    useEffect(() => {
        getSearchedData();
        getRatingData();

    }, [refresh, home])





    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    if (Object.keys(userData).length === 0 && userData.constructor === Object) {
        return <div>Fetching data</div>
    }
    return (
        <>
            <div className="CustomerAccount" >
                <div className="user">
                    <header >
                        <div className="top-bar user sticky">
                            <div className="row top-bar__row">
                                <div className="col-lg-2 col-md-2 col-3 pl-5 top-bar__row-col__logo">
                                    <a href="index.html"><img src={_1} alt="Logo" /></a>
                                </div>
                                <nav className="col-lg-7 col-md-8 col-12 top-bar__row-col__nav " id="homeNav">
                                    <ul>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    // navigate('/user/customerAccount');
                                                    setcontactform(false);
                                                    setSearch(false);
                                                    sethome(true);
                                                    settabNav(false);
                                                    setSellerProfile(false);
                                                    setPostJob(false);

                                                }} > Home</a>
                                        </li>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    // navigate('/user/user');
                                                    setcontactform(false);
                                                    setSearch(true)
                                                    sethome(false)
                                                    settabNav(false);
                                                    setSellerProfile(false);
                                                    setPostJob(false);


                                                }} > Search</a>
                                        </li>
                                        <li>
                                            <a onClick=
                                                {() => {
                                                    // navigate('/user/Contact');
                                                    setcontactform(true);
                                                    setSearch(false);
                                                    sethome(false);
                                                    setSellerProfile(false);
                                                    settabNav(false);
                                                    setPostJob(false);

                                                }} > Contact Us</a>
                                        </li>

                                        <li>
                                            <a onClick=
                                                {() => {
                                                    navigate('/user/adminpanel');
                                                    setcontactform(false);
                                                    setSearch(false)
                                                    setSellerProfile(false);
                                                    sethome(false);
                                                    setPostJob(false);

                                                }} > FAQ </a>
                                        </li>

                                        <li>
                                            <a onClick=
                                                {() => {
                                                    navigate('/user/Inbox');
                                                    setcontactform(false);
                                                    setSearch(false);
                                                    setSellerProfile(false);
                                                    sethome(false);
                                                    setPostJob(false);

                                                }}>Inbox</a>
                                        </li>
                                    </ul>
                                </nav>

                                <div className="col-lg-3 col-md-2 col-7 top-bar__row-col__auth">
                                    <img src={_10} alt="" height="35px" width="30px"
                                        onClick={() => {
                                            navigate('/user/login');
                                            localStorage.setItem('user', null);
                                        }
                                        } />

                                </div>
                            </div>

                        </div>
                    </header>

                    {home == true ?
                        <>
                            <div style={{
                                backgroundColor: "var(--main-yellow-color)",
                                width: "auto",
                                height: "500px",
                                backgroundImage: `url(${_7})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                alignItems: "flex-start",
                                marginBottom: "10px",
                                paddingTop: "50px",

                            }}
                            >
                                <div style={{
                                    display: "inline-flex",
                                    flexDirection: "column",

                                    width: "65%",
                                    margin: "0",
                                    height: "75%",


                                }}>
                                    <h1
                                        style={{
                                            width: "79%",
                                            marginTop: "1%",
                                            paddingTop: "10%",
                                            paddingLeft: "5%",
                                            fontSize: "40px",
                                            display: "flex",
                                            color: "white",
                                            fontFamily: "Roboto, sans-serif",
                                        }}
                                    >Welcome {userData.first_name} {userData.last_name}</h1>
                                    <h4
                                        style={{
                                            width: "79%",
                                            marginTop: "1%",
                                            padding: "5%",
                                            paddingTop: "2%",
                                            fontSize: "28px",
                                            display: "flex",
                                            color: "white",
                                            fontFamily: "Roboto, sans-serif",

                                        }}
                                    >Find the right person to get your job done</h4>
                                </div>
                                <div style={{
                                    backgroundColor: "#ffc107",
                                    height: "80%",
                                    width: "250px",
                                    boxShadow: "grey -1px -1px 8px",
                                    marginTop: "3%",
                                    padding: "3%",
                                    marginBottom: "3%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    float: "right",
                                    marginRight: "5%"
                                }} >

                                    <img src={_8} alt="" />
                                    <button
                                        onClick={() => {
                                            setSellerProfile(false);
                                            settabNav(true);
                                            sethome(false);
                                            setPostJob(false);

                                        }}
                                        style={{
                                            backgroundColor: "#2575c0",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            fontFamily: "Roboto, sans-serif",
                                            fontWeight: "bold",
                                            margin: " 0px 2px",
                                            marginTop: "7%",
                                            padding: "15%",
                                            borderRadius: "2px",
                                            border: "none",

                                        }} >
                                        DashBoard
                                    </button>

                                </div>

                            </div>
                            <h1 style={{
                                fontSize: "30px",
                                fontFamily: "Roboto, sans-serif",
                                margin: "1% 0%",
                                fontWeight: "bolder",
                                backgroundColor: "#a8cff92e",
                                paddingLeft: "3%"


                            }}>Near by Helpers</h1>
                                {/* {console.log(loc)}

                                {console.log(loc + "mil jao yaar")}
                                {console.log(loc + "mil jao yaar")} */}

                               {locationCheck? <NearbySellers setSellerProfile={setSellerProfile} sethome={sethome} location={loc}  /> : <h1>Fetching data</h1> }

                            <h1 style={{
                                fontSize: "30px",
                                fontFamily: "Roboto, sans-serif",
                                margin: "1% 0%",
                                fontWeight: "bolder",
                                backgroundColor: "#a8cff92e",
                                paddingLeft: "3%"


                            }}>Top rated Helpers</h1>
                            {<TopRatedSellerList setSellerProfile={setSellerProfile} sethome={sethome} />}

                        </>
                        : null}
                    {sellerProfile ? <User setSellerProfile={setSellerProfile} sethome={sethome} item={sellerProfile} /> : null}
                    {tabNav == true ? <Dashboardtab item={userData} /> : null}
                    {search == true ? <Search /> : null}
                    {contactform == true ? <Contact /> : null}
                    {postJob == true ? <PostJob /> : null}
                </div>



            </div>
            {/* <Footer /> */}
        </>
    )
}

const Dashboardtab = ({ item }) => {

    const [notify, setNotify] = useState(false);
    const [post, setPost] = useState(true);
    const [job, setJob] = useState(false);
    const [profile, setProfile] = useState(false);


    return (
        <div style={{ marginTop: "4%", width: "100%" }}>

            {/* left side */}
            <div style={{ backgroundColor: "#f9f4f4", float: 'left', height: "auto", width: "20%", textAlign: 'center', position: "fixed" }}>
                <h1 style={{
                    fontSize: "25px",
                    fontFamily: "Roboto, sans-serif",
                    textAlign: "left",
                    fontWeight: "bolder",
                    backgroundColor: "#a8cff92e",
                    padding: "3%",
                    color: "#2575c0"



                }}>DashBoard</h1>
                <ul>
                    <li onClick={() => {
                        setJob(false);
                        setNotify(true);
                        setProfile(false);
                        setPost(false);
                    }} style={{ borderBottom: "0.5px solid rgb(37 117 192 / 42%)", float: 'left', display: 'block', backgroundColor: notify == true ? "rgb(37 117 192 / 42%)" : null, fontSize: "20px", width: "100%", padding: "5% 0px" }}
                    >
                        Notifications
                    </li>
                    <li style={{ float: 'left', display: 'block', borderBottom: "0.5px solid rgb(37 117 192 / 42%)", backgroundColor: post == true ? "rgb(37 117 192 / 42%)" : null, fontSize: "20px", width: "100%", padding: "5% 0px" }}
                        onClick={() => {
                            setJob(false);
                            setNotify(false);
                            setProfile(false);
                            setPost(true);

                        }}>
                        Post a job
                    </li>
                    <li style={{ borderBottom: "0.5px solid rgb(37 117 192 / 42%)", backgroundColor: job == true ? "rgb(37 117 192 / 42%)" : null, float: 'left', fontSize: "20px", width: "100%", padding: "5% 0px" }}
                        onClick={() => {
                            setJob(true);
                            setNotify(false);
                            setProfile(false);
                            setPost(false);
                        }}>
                        Manage Jobs
                    </li>
                    <li style={{ borderBottom: "0.5px solid rgb(37 117 192 / 42%)", backgroundColor: profile == true ? "rgb(37 117 192 / 42%)" : null, float: 'left', display: 'block', fontSize: "20px", width: "100%", padding: "5% 0px" }}
                        onClick={() => {
                            setJob(false);
                            setNotify(false);
                            setProfile(true);
                            setPost(false);
                        }}>
                        Profile
                    </li>

                </ul>
            </div>
            {/* right side */}

            <div style={{ backgroundColor: "white", float: 'right', width: "80%", }}>
                {job == true ? <CustomersPostedJob /> : null}
                {post == true ? <PostJob /> : null}
                {profile == true ? <Customerprofile item={item} /> : null}
            </div>

        </div>
    )
}





export default CustomerAccount;
