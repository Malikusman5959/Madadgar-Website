import React from 'react'
import moment from 'moment';


function CustomerProfile({ item, setselected, reload }) {


    let { first_name, last_name, gender, city, profile_pic, rating, skill, dbo, cnic, email, phone_number, eduction } = item;
    profile_pic = "https://img.icons8.com/ios-filled/50/ffffff/user.png";

    return (
        <>
            <button style={{ marginLeft: '40px', height: '28px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#2575c0', width: '70px', backgroundColor: '#ffffff', border: '2px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => {
                setselected(null);
            }}> Back </button>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '40px', paddingTop: '20px' }}>

                {/* About Section */}
                <div style={{ backgroundColor: '#2575c0', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px', marginRight: '10px', width: '30%', height: '100%', minHeight: '350px', border: '2px solid #2575c0', borderRadius: '15px' }}>


                    <img
                        style={{ marginTop: '15px', height: '100px', width: '100px', borderRadius: '50%', border: '5px solid #ffffff' }}
                        src={profile_pic}
                        alt="user"
                    />

                    {/* //rating
                    <div>
                        {rating > 0 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 1 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 2 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 3 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 4 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}

                    </div> */}

                    <div style={{ width: '100%', paddingLeft: '25px', marginLeft: '25px' }}>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Name   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {first_name} {last_name} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Gender   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {gender} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> From   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {city} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> DOB   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {moment(moment(dbo.valueOf())).format('LL')} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> CNIC   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {cnic} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> Email   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> :   {email} </p>
                        </div>

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row' }}>
                            <p style={{ fontSize: '15px', width: '20%', fontWeight: '500', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}> PhNo   </p>
                            <p style={{ fontSize: '15px', fontWeight: '100', fontFamily: 'Roboto,sans-serif', color: '#ffffff', margin: '0px' }}>:   {phone_number} </p>
                        </div>
                    </div>


                </div>

               




            </div>


        </>
    )
}

export default CustomerProfile
