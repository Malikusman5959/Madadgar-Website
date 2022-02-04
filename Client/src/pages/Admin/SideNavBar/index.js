import React, { useState } from "react";


const SideNavBar = ({ tab, settab }) => {


    return (
        <div style={{ backgroundColor: '#2575c0', minWidth: '250px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            {/* Top Section */}
            <div style={{ padding: '7px' }}>

                {/* Admin Details */}
                <div style={{ height: '230px', width: '100%', backgroundColor: '#2575c0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ width: '100px', height: '100px' }} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-user-interface-kiranshastry-solid-kiranshastry.png" />
                    {/* <h2 style={{letterSpacing : '2px', fontSize: '25px', fontWeight : '400' ,  color: '#ffffff', fontFamily: 'Roboto, sans-serif', margin: 0 , marginTop : '10px'}}> Admin </h2> */}
                </div>


                {/* Dashboard */}
                <div style={{
                    borderRadius: '12px',
                    height: '55px',
                    marginBottom: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: tab.name == 'Dashboard' ? '#ffffff' : '#2575c0', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px'
                }}
                    onClick={() => {
                        settab({ name: 'Dashboard', icon: "https://img.icons8.com/windows/96/2575c0/increase-profits.png" })
                    }}>
                    <img style={{ width: '35px', height: '35px' }}
                        src={tab.name == 'Dashboard' ?
                            "https://img.icons8.com/windows/96/2575c0/increase-profits.png" :
                            "https://img.icons8.com/windows/96/ffffff/increase-profits.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: "16px",
                        color: tab.name == 'Dashboard' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '8px'
                    }}>
                        Dashboard
                    </p>
                </div>


                {/* Helpers */}
                <div style={{
                    borderRadius: '12px',
                    height: '55px',
                    marginBottom: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: tab.name == 'Helpers' ? '#ffffff' : '#2575c0',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: '2px'
                }}
                    onClick={() => {
                        settab({ name: 'Helpers', icon: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-mechanic-automobile-kiranshastry-solid-kiranshastry-1.png" })
                    }}>
                    <img style={{ width: '45px', height: '45px' }}
                        src={tab.name == 'Helpers' ?
                            "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-mechanic-automobile-kiranshastry-solid-kiranshastry-1.png" :
                            "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-mechanic-automobile-kiranshastry-solid-kiranshastry-1.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        color: tab.name == 'Helpers' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '7px',
                        fontSize: "16px"
                    }}>
                        Helpers
                    </p>
                </div>


                {/* Customers */}
                <div style={{ borderRadius: '12px', height: '55px', marginBottom: '8px', display: 'flex', flexDirection: 'row', backgroundColor: tab.name == 'Customers' ? '#ffffff' : '#2575c0', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}
                    onClick={() => {
                        settab({ name: 'Customers', icon: "https://img.icons8.com/ios-filled/50/2575c0/gender-neutral-user.png" })
                    }}>
                    <img style={{ width: '32px', height: '32px' }}
                        src={tab.name == 'Customers' ?
                            "https://img.icons8.com/ios-filled/50/2575c0/gender-neutral-user.png" :
                            "https://img.icons8.com/ios-filled/50/ffffff/gender-neutral-user.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        color: tab.name == 'Customers' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '11px',
                        fontSize: "16px"
                    }}>
                        Customers
                    </p>
                </div>



                {/* Reports */}
                <div style={{ borderRadius: '12px', height: '55px', marginBottom: '8px', display: 'flex', flexDirection: 'row', backgroundColor: tab.name == 'Reports' ? '#ffffff' : '#2575c0', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}
                    onClick={() => {
                        settab({ name: 'Reports', icon: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-report-news-kiranshastry-solid-kiranshastry.png" })

                    }}>
                    <img style={{ width: '32px', height: '32px' }}
                        src={tab.name == 'Reports' ?
                            "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/2575c0/external-report-news-kiranshastry-solid-kiranshastry.png" :
                            "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-report-news-kiranshastry-solid-kiranshastry.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        color: tab.name == 'Reports' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '11px',
                        fontSize: "16px"
                    }}>
                        Reports
                    </p>
                </div>



                {/* Certifications */}
                <div style={{ borderRadius: '12px', height: '55px', marginBottom: '8px', display: 'flex', flexDirection: 'row', backgroundColor: tab.name == 'Certifications' ? '#ffffff' : '#2575c0', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}
                    onClick={() => {
                        settab({ name: 'Certifications', icon: "https://img.icons8.com/material-rounded/24/2575c0/guarantee.png" })

                    }}>
                    <img style={{ width: '32px', height: '32px' }}
                        src={tab.name == 'Certifications' ?
                            "https://img.icons8.com/material-rounded/24/2575c0/guarantee.png" :
                            "https://img.icons8.com/material-rounded/24/ffffff/guarantee.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        color: tab.name == 'Certifications' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '11px',
                        fontSize: "16px",
                        justifySelf: "center"
                    }}>
                        Certifications
                    </p>
                </div>
            </div>



            {/* Bottom Section */}
            <div>

                {/* Logout */}
                <div style={{ borderRadius: '12px', height: '55px', marginBottom: '8px', display: 'flex', flexDirection: 'row', backgroundColor: tab.name == 'Logout' ? '#ffffff' : '#2575c0', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '10px' }}
                    onClick={() => {
                        settab({ name: 'Logout', icon: "https://img.icons8.com/ios-filled/50/2575c0/sign-in-form-password.png" })

                    }}>
                    <img style={{ width: '32px', height: '32px' }}
                        src={tab.name == 'Logout' ?
                            "https://img.icons8.com/ios-filled/50/2575c0/sign-in-form-password.png" :
                            "https://img.icons8.com/ios-filled/50/ffffff/sign-in-form-password.png"} />
                    <p style={{
                        letterSpacing: '1px',
                        fontFamily: 'Roboto, sans-serif',
                        color: tab.name == 'Logout' ? '#2575c0' : '#ffffff',
                        fontWeight: '500',
                        marginLeft: '11px',
                        fontSize: "16px"
                    }}>
                        Logout
                    </p>
                </div>

            </div>


        </div>
    );
};

export default SideNavBar;
