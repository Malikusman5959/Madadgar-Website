import React from "react";
import "./../../style/Accountcard.css";

const AccountCard = ({name , text , btnName , onClick, picture }) => {

  
    return (
        <div className="card">
              <div className="title">{name}</div>

<div className="iconPic">
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="120" viewBox="0 0 24 24"><path d={picture}/></svg>
</div>

<div className="features">
  <ul>
    <li><span></span> {text}</li>
  </ul>
</div>

<a href="#" className="btnCard" onClick={onClick}>{btnName}</a>

</div>
    )
}

export default AccountCard
