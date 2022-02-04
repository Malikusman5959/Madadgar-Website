import React, { useState } from 'react'
import SideNavBar from './SideNavBar'
import Helpers from './Helpers';
import Customers from './Customers';
import Reports from './Reports';
import Dashboard from './Dashboard';
import Certifications from './Certifications'


export function AdminHome(props) {

    const [tab, settab] = useState({ name: 'Dashboard', icon: "https://img.icons8.com/windows/96/2575c0/increase-profits.png" });

    return (
        <div style={{ width: '100%',
         height: '100%',
          display: 'flex',
           flexDirection: 'row' }}>

            {/* Left Section */}
            <SideNavBar tab={tab} settab={settab} />

            {/* Right Section */}   
            {tab.name == 'Helpers' && <Helpers tab={tab}/>}
            {tab.name == 'Customers' && <Customers tab={tab}/>}
            {tab.name == 'Reports' && <Reports tab={tab}/>}
            {tab.name == 'Dashboard' && <Dashboard tab={tab}/>}
            {tab.name == 'Certifications' && <Certifications tab={tab}/>}

        </div>
    )
}
