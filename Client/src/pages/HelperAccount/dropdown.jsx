import React, { useState } from 'react';
import { MenuItems } from './Menuitems';
import './../../style/Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown({click}) {
  


  return (
    <div className="dropMain " id={click}>
      <ul>
        <li className="listItems">
          settings
        </li>
        <li>
          Log out
        </li>
      </ul> </div>
  );
}

export default Dropdown;