
import * as React from 'react';
import './../../style/tabs.css'


export const TabSelector = ({isActive , children, onClick,}) => (

    <button
        style={isActive == true ? { textAlign: "center", borderBottom: "2px solid var(--main-navbar-yellow)", color: "var(--main-navbar-color)", fontSize: "medium", borderBottom: "2px solid rgb(255, 193, 7)" } : { textAlign: "center", }}
        onClick={onClick}
    >
        {children}
    </button>
);