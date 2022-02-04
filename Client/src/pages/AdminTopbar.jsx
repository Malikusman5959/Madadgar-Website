import React from 'react'
import './../style/adminTopbar.css'
import { NotificationsNone, Search } from "@material-ui/icons";
export default function AdminTopbar() {
    return (
      
           <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Madadgar</span>
        </div>
        <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search Your Query"
            className="searchInput"
          />
        </div>
      </div>


        <div className="topRight">
          <div className="topbarIconContainer" >
          <NotificationsNone style={{fontSize:'30px'}} />
          <span className="topIconBadge">2</span>
          </div>
      
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div> 
    )
}
