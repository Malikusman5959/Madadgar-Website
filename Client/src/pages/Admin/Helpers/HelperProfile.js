import React from 'react'
import moment from 'moment';
import axios from 'axios';


function HelperProfile({ item, setselected, reload , report }) {


    let { first_name, last_name, gender, city, profile_pic, rating, skill, dbo, cnic, email, phone_number, eduction  } = item;


    const sendData = async (url , status) => {

        let res = await axios.patch(url , { "certify" : status});
        return res.data;
    };

    let block = async (status) => {
        const url = `http://localhost:8000/v1/serviceProvider/${item._id}`;
        const newData = await sendData(url , status);
    };


    return (
        <>
            <button style={{ marginLeft: '40px', height: '28px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#2575c0', width: '70px', backgroundColor: '#ffffff', border: '2px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => {
                setselected(null);
            }}> Back </button>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '40px', paddingTop: '20px' }}>

                {/* About Section */}
                <div style={{ backgroundColor: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: '50px', marginRight: '10px', width: '30%', height: '100%', minHeight: '350px', borderRadius: '15px' }}>


                    <img
                        style={{ marginTop: '15px', height: '100px', width: '100px', borderRadius: '50%', border: '5px solid #ffffff' }}
                        src={profile_pic}
                        alt="user"
                    />

                    {/* //rating */}
                    <div>
                        {rating > 0 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 1 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 2 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 3 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}
                        {rating > 4 ? <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-filled/96/ffffff/star.png" /> : <img style={{ width: '20px', height: '20px' }} src="https://img.icons8.com/fluency-systems-regular/96/ffffff/star--v1.png" />}

                    </div>

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

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: item.certify == 'Blocked' ? '#FF7F7F' : '#2575c0', marginTop: '50px', marginLeft: '10px', width: '45%', height: '80%', minHeight: '350px', borderRadius: '15px' }}>

                    {/* education */}
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: '#ffffff', fontWeight: '500', fontFamily: 'Roboto,sans-serif', letterSpacing: '2px' }}> Educational Background </p>
                        <div style={{ alignSelf: 'center', flexWrap: 'wrap' }}>
                            {
                                eduction.map((item, index) => (
                                    <>
                                        <div style={{ color: '#ffffff', fontFamily: 'Roboto,sans-serif', fontWeight: '100', fontSize: '14px' }} key={index}>  {item.degree.toUpperCase()} from {item.institution.toUpperCase()} ({item.start_date} {item.end_date})</div>
                                    </>
                                ))
                            }
                        </div>

                    </div>

                    {/* skills */}
                    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: '#ffffff', fontWeight: '500', fontFamily: 'Roboto,sans-serif', letterSpacing: '2px' }}> Skills </p>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                skill.map((item, index) => (

                                    <div style={{ backgroundColor: '#ffffff', color: '#2575c0', margin: '5px', padding: '7px', borderRadius: '7px', fontFamily: 'Roboto,sans-serif', fontWeight: '100', fontSize: '14px' }} key={index}> {item} </div>

                                ))
                            }
                        </div>

                    </div>
                   { report == 'true' ? null : <button style={{ height: '36px' , width : '220px', fontSize: '14px', fontFamily: 'Roboto, sans-serif', color: '#ffffff', backgroundColor: item.certify == 'Blocked' ? '#2575c0' : '#FF7F7F', border: '2px solid #2575c0', borderRadius: '8px' }} type="button" onClick={() => {

                        if (item.certify == 'Blocked')
                        {
                            block('');
                        }
                        else{
                            block('Blocked');
                        }
                        reload();
                        setselected(null);
                        
                        //delete call api
                       

                    }}> <img style={{width : '20px' , height : '20px'}} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/ffffff/external-delete-miscellaneous-kiranshastry-solid-kiranshastry.png"/> <p style = {{display : 'inline'}}> {item.certify == 'Blocked' ? 'Unblock User Account' : 'Block User Account'} </p> </button>
}

                </div>




            </div>


        </>
    )
}

export default HelperProfile
