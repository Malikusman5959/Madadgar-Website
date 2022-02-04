import React, { useState, useEffect } from 'react';
import axios from "axios";
import moment from 'moment';


const RequestedJobDetails = ({ item, setListVisible, setSelectedTab, reloadPage }) => {

    const [editing, setediting] = useState(false)
    let id = localStorage.getItem('user');

    const [description, setDescription] = useState(item.Description);
    const [Budget, setBudget] = useState(item.Budget);

    //post requested job DATA
    const postData = async (url) => {
        console.log(description, Budget);
        let res = await axios.patch(url, {
            Description: description,
            Budget: Budget
        });
        return res.data;
    };

    let updateJobContract = async () => {

        const url = `http://localhost:8000/v1/UpdateJobContract?jobId=${item._id}`;
        const newData = await postData(url);
    };

    useEffect(() => {



    }, [])


    return (

        <div className="formContainer">
            <label className="Lname" ><b className="blabel">{item.title}</b></label>
            <label className="Lname" ><b className="blabel">Description</b></label>
            <textarea readOnly={!editing} className="IIB" type="text" value={description} placeholder="Enter description" onChange={(e) => { setDescription(e.target.value) }} />

            <label className="Lname" ><b className="blabel">Budget</b></label>
            <textarea readOnly={!editing} className="IIB" type="text" value={Budget} placeholder="Enter Budget" onChange={(e) => { setBudget(e.target.value) }} />


            <button className="Jobbtn" onClick={() => {

                if (editing == true) {
                    updateJobContract();
                    setediting(false);
                }
                else {
                    setediting(true);

                }

            }}> {editing ? "Save" : "Update Contract"} </button>

            <button className="Jobbtn" onClick={() => {

setListVisible(true)
            }}> Back </button>
            <></>


        </div>
    )
}


export default RequestedJobDetails
