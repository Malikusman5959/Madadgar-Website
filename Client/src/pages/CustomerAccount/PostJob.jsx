import React, { useState, useEffect, useRef } from 'react'
import './../../style/PostJob.css'
import axios from "axios";
import { io } from "socket.io-client";
import Selector from "./../selectorMenu";





const PostJob = () => {

    //Usestates
    const [title, setTitle] = useState("");
    const [formData, setFormData] = useState([{}]);
    const [description, setDescription] = useState("");
    const [Budget, setBudget] = useState(1);
    const [jobType, setJobType] = useState("Online");
    const [city, setCity] = useState("Islamabad");
    const [submit, setSubmit] = useState("");
    const [address, setAddress] = useState("");
    const [skill, setSkill] = useState('');
    let [skillArr, setSkillArr] = useState([]);
    let id = localStorage.getItem('user');
    const [emptyMsg, setEmptyMsg] = useState(false);

    const socket = useRef();
    socket.current = io("ws://localhost:8900");

    const [sps, setSPs] = useState([]);

    //Api calls and posting form to Db
    //Create job
    const getData = async (url, sub_Data) => {
        let res = await axios.post(url, sub_Data);
        return res.data;
    };

    let getSearchedData = async (event) => {

        const url = "http://localhost:8000/v1/JobPostRoutes";
        const newData = await getData(url, formData);
        getSPJobData();

        setSubmit(2);


    }

    // //GET JOB DATA
    // const getJob = async (url) => {
    //     let res = await axios.get(url);
    //     return res.data;
    // };

    // let getJobData = async () => {

    //     const url = "http://localhost:8000/v1/JobPostRoutes";
    //     const newData = await getJob(url);
    //     console.log(newData.data.joblist.pop())

    // };

    //GET SERVICE PROVIDERS DATA
    const getSpJob = async (url, sub_data) => {
        let res = await axios.post(url, sub_data);
        return res.data;
    };

    let getSPJobData = async () => {
        let skills = { skills: skillArr }
        const url = "http://localhost:8000/v1/searchBySkills";
        const newData = await getSpJob(url, skills);

        console.log(newData.data.provider);
        console.log(sps);

        socket.current.emit("NewJobNotification", {
            serviceProviders: newData.data.provider
        });
        setSubmit(3);
    


    };

    useEffect(() => {

        if (submit == 1) {
            var data = getSearchedData();
        }

        if (submit == 3) {

            setBudget("1");
            setAddress("");
            setSkill("");
            setSkillArr([]);
            setDescription("");
            setTitle("");
            setCity("Islamabad")

        }



    }, [submit])




    //add display skills
    function SkillCard({ item }) {

        return (
            <>
                <div className="skillCard">
                    <p className="skilll">{item}</p>
                    <div className="close-btn" onClick={() => { removeSkill(item) }}>
                        x
                    </div>
                </div>
            </>
        )
    }

    //remove skills
    const removeSkill = (skill) => {
        let updatedSkillArr = skillArr.filter((item) =>
            item !== skill ? item : null
        );
        setSkillArr(updatedSkillArr);
    };

    const cityOptions = [
        { value: "Islamabad" },
        { value: "Rawalpindi" },
        { value: "Lahore" },
        { value: "Karachi" },

    ];

    return (
        <div className="formContainer">
            <h1 style={{ fontSize: "25px", textAlign: "center", fontWeight: "900", margin: "2px", fontFamily: "Roboto , sans-serif", color: "#ffc107", padding: "1%" }}>Post a Job</h1>
            <label className="Lname" ><b className="blabel">Job Title</b></label>
            <input className="IIB" type="text" value={title} placeholder="Enter job title here" onChange={(e) => { setEmptyMsg(false); setTitle(e.target.value) }} />
            <label className="Lname" ><b className="blabel">description</b></label>
            <textarea className="IIB" type="text" value={description} placeholder="Enter description" onChange={(e) => { setEmptyMsg(false); setDescription(e.target.value) }} />
            {/* skill cards */}
            <div>
                <div className="skills-container">
                    {skillArr.map((item, index) => (
                        <SkillCard key={index} item={item}> </SkillCard>
                    ))}
                </div>
                <label className="Lname"> <b className="blabel">
                    Skill </b>
                    <input className="IIB" type="text" style={{ border: '1px solid lightgray' }} value={skill} onChange={(e) => {
                        setEmptyMsg(false);
                        setSkill(e.target.value)
                    }} />
                </label>
                <div className="splited-col">
                    <div className="addBtn"
                        onClick={() => {
                            if (skill !== "") {
                                setSkillArr([...skillArr, skill]);
                                setSkill('');
                            }
                        }}
                    >
                        Add
                    </div>
                </div>
            </div>
            <label for="psw-repeat" className="Lname"><b className="blabel" >Location</b></label>
            <Selector setOption={setCity} choosenOption={city} optionList={cityOptions} />


            <label className="Lname" ><b className="blabel">Budget</b></label>
            <input className="IIB" type="text" value={Budget} style={{ textAlign: "center", border: '1px solid lightgray', borderColor: isNaN(Budget) ? 'red' : null }} onChange={(e) => { setEmptyMsg(false); setBudget(e.target.value) }} />

            <label className="Lname"><b className="blabel">Job Type</b></label>
            <div>
                <div className="btn-group">
                    <button className="bye" onClick={() => { setJobType("Online") }}>Online</button>
                    <button className="hello" onClick={() => { setJobType("Physical") }} >Physical</button>
                </div>
            </div>

            {jobType == "Physical" ? <> <label className="Lname" ><b className="blabel">Address</b></label>
                <textarea className="IIB" type="text" placeholder="Enter Address" value={address} onChange={(e) => { setEmptyMsg(false); setAddress(e.target.value) }} /> </> : null}

            {emptyMsg ?
                <label style={{ color: 'red', fontSize: '15px' }} className="Lname" >All fields must be filled.</label>
                : null}
            <br />
            <button className="Jobbtn" onClick={() => {
                if (title == "" || description == "" || Budget == "" || skillArr == []) {
                    setEmptyMsg(true);
                }
                else {
                    if (!isNaN(Budget)) {
                        setFormData({
                            customerId: id,
                            title: title,
                            Description: description,
                            Budget: Budget,
                            location: city,
                            address: address,
                            skills: skillArr.map(item => item.capitalize()),
                            jobType: jobType,
                            jobStatus: "Open"
                        });

                    }
                }
                //console.log(formData)
                setSubmit(1)
            }}> Post </button>
            <></>


        </div>
    )
}

export default PostJob
