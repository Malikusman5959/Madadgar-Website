import React from "react";
import { useState, useEffect } from 'react';


function CustomerCard({ item, setselected }) {


  let { first_name, last_name, gender, city , phone_number } = item;


  return (

      <div style={{backgroundColor : '#ffffff', border : '1px solid #2575c0' , marginBottom: "10px", width: "100%", height: "40px", borderRadius: "5px", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: "10px" }}>

          <div style={{ marginLeft : '10px', display: 'inline', width: "100px" }}>
              <h3 style={{color : '#2575c0', fontSize: "15px" , fontWeight : '400', letterSpacing : '1px' }}>
                  {first_name} {last_name}
              </h3>
          </div>

          <div style={{ display: 'inline', width: "40px" }}>
              <h4 style={{ color : '#2575c0', fontSize: "15px" , fontWeight : '400', letterSpacing : '1px'}}>
                  {gender}
              </h4>
          </div>

          <div style={{ display: 'inline' , width: "40px"}}>
              <h4 style={{ color : '#2575c0', fontSize: "15px" , fontWeight : '400', letterSpacing : '1px'}}>
                  {city }
              </h4>
          </div>

          

          <div style={{ display: 'inline' , width: "40px"}}>
             
                  <h4 style={{ color : '#2575c0', fontSize: "15px" , fontWeight : '400', letterSpacing : '1px' }}>
                     {phone_number}
                  </h4> 
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: 'space-around' }}>
              <button onClick={() => {  setselected(item);}} style={{ width: "80px", height: '30px', fontSize: '15px', borderRadius: '10px', backgroundColor: '#2575c0', border: "none", color: '#ffffff' }}>
                  View </button>
          </div>




      </div>

  )
}


export default CustomerCard;