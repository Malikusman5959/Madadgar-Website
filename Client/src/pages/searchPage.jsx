/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import { useEffect } from "react";
import "./../style/search.css";
import "./../style/card.css";
import { MemberCard } from "./pages";
import axios from "axios";
import img from "./../img/no.jpg";
import User from './User';
import Nav from './nav'


const SearchPage = (props) => {
  const [search, setSearch] = useState(0);
  const [home, sethome] = useState(true);
  const [city, setCity] = useState("Islamabad");
  const [searchItem, setSearchItem] = useState("");
  const [sellerProfile, setSellerProfile] = useState(null)
  const [searchPage, setsearchPage] = useState(true)
  let [data, setData] = useState([]);

  const getData = async (url, sub_Data) => {
    let res = await axios.post(url, sub_Data);
    return res.data;
  };

  let getSearchedData = async (event) => {

    event.preventDefault();
    const data = {
      skills: [searchItem.toUpperCase()],

    };
    const url = "http://localhost:8000/v1/JobPostRoutes/matchSkills";
    const newData = await getData(url, data);
    const filteredData = newData.data.provider.filter(sp => sp.city == city)
    console.log(data);
    setData(filteredData);
  };


  // api call to get the search items
  const changeCity = (vl) => {
    setCity(vl);
  };
  const changeSearchItem = (data) => {
    setSearchItem(data);
  };

  return (
    <>
          <Nav />

      
   <div style={{marginTop:"4%" , backgroundColor: " rgb(239 238 238)"}}>
          {searchPage == true ?
            <div className="search-body">
              <div
                className={`search-page ${search === 0 ? "remove_img" : "remove_img_height"
                  }`}
              >
                <div
                  className={`wrapper  ${search === 0 ? "remove-wrapper" : "remove-height"
                    }`}
                >
                  <input
                    style={{
                      fontSize: "16px",
                    }}
                    type="text"
                    className="input "
                    placeholder="What are you looking for?"
                    onChange={(e) => changeSearchItem(e.target.value)}
                  />
                  <select
                    className="input input1"
                    name="cars"
                    option={city}
                    id="cars"
                    style={{
                      fontSize: "16px",
                    }}
                    defaultValue={city}
                    onChange={(event) => changeCity(event.target.value)}
                  >
                    <option value=""></option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>

                  <button
                    onClick={(event) => {
                      getSearchedData(event);
                      setSearch(1);
                    }}
                    className="searchbtn"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              <div className="tests" style={{  display: 'grid',
                                    gridTemplateColumns: "repeat(5 , 1fr)",}}>

                {data.length === 0 && search == 1 ? (
                  <div
                    style={{
                      width: "100%",
                      height: "80vh",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >

                    <img
                      style={{
                        width: "auto",
                        height: "100%",
                      }}
                      src={img}
                      alt="test"
                    ></img>

                  </div>
                ) : (
         
                  data.map((item, index) => <MemberCard key={index} item={item} setSellerProfile={setSellerProfile} setsearchPage={setsearchPage} />) 
                )}

              </div>

            </div> : null}
            </div>
          {sellerProfile ? <User setSellerProfile={setSellerProfile} item={sellerProfile} setsearchPage={setsearchPage} sreachPage={searchPage} sethome={sethome}/> : null}
        </>
        );
};

        export default SearchPage;
