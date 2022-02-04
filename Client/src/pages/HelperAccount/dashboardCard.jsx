import React from 'react'
import './../../style/dashboardcard.css'
const dashboardCard = ({name , imgsrc , description , onClick}) => {
    return (
        <div className="Main" onClick={onClick}>
            <div class="cards">
 
    <div class="cardD" >
      <img  src={imgsrc} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <div class="card__header-text">
            <h2 class="card__title">{name}</h2>            
          </div>
        </div>
        <p class="card__description">{description}</p>
      </div>
    </div>      

</div>
        </div>
    )
}

export default dashboardCard
