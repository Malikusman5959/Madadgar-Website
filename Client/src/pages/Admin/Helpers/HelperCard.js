import React from "react";
import { useState, useEffect } from 'react';


const HelperCard = ({ item, setselected }) => {


  let { first_name, last_name, gender, city, profile_pic, rating, skill } = item;


  return (
    <div style={{ margin: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '250px', width: '220px', border: item.certify == 'Blocked' ? '1px solid #FF7F7F' : '1px solid #2575c0', backgroundColor: '#ffffff', borderRadius: '5px' }}>

      <div style={{ padding: '8px' }}>
        <p style={{ fontWeight: '500',fontSize:'15px', textAlign: 'center', color: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', margin: '0px', marginBottom: '10px' }}> {rating.toFixed(1)} </p>

        <img
          style={{ height: '100px', width: '100px', borderRadius: '50%', border: item.certify == 'Blocked' ? '3px solid #FF7F7F' : '3px solid #2575c0' }}
          src={profile_pic}
          alt="user"
        />

        <div>
          <p style={{ fontSize: '15px',marginTop: '15px', fontWeight: '500', fontFamily: 'Roboto,sans-serif', textAlign: 'center', color: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', margin: '0px' }}> {first_name} {last_name} </p>
          <p style={{ fontSize: '15px', marginTop: '5px', fontWeight: '300', fontFamily: 'Roboto,sans-serif', textAlign: 'center', color: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', margin: '0px' }}> {city} </p>
        </div>

      </div>

      <div style={{ width: '80%' , textAlign: 'center'}}>
        <button style={{margin : '0', height: '35px', width: '80%', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', border: item.certify == 'Blocked' ? '2px solid #FF7F7F' : '2px solid #2575c0',  }} type="button" onClick={() => {
          setselected(item);
        }}> View </button>
      </div>

    </div>
  );
};

export default HelperCard;