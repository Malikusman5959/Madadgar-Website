import React, { useState, useEffect } from 'react'
import './../../style/Editprofile.css'
import axios from "axios";
import VM from "./../ValidationMethods";
import Selector from "./../selectorMenu";
import Popup from '../Popup';
import UpdatePro from './UpdatePro'



const valdiateEducationForm = (Ins, deg, frm, till) => {

    if (Ins === "" || deg === "") {
        return false
    }

    if (VM.validateFromDate(frm, till) && VM.validateTillDate(till, frm)) {
        return true;
    } else {
        return false;
    }

};

const Editprofile = () => {

    const cityOptions = [
        { value: "Islamabad" },
        { value: "Rawalpindi" },
        { value: "Lahore" },
        { value: "Karachi" },

    ];


    //usestates
    let [eduArr, setEduArr] = useState([]);
    let [userData, setUserData] = useState({})
    let [check, setCheck] = useState({})
    const [nameF, setnameF] = useState("")
    const [nameL, setnameL] = useState("")
    const [city, setCity] = useState("")
    const [phone, setphone] = useState('')
    let [image, setImage] = useState("");
    const [Institute, setInstitute] = useState('');
    const [Degree, setDegree] = useState('');
    const [yearFrom, setYearFrom] = useState(2021);
    const [yearTill, setYearTill] = useState(2021);
    const [skill, setSkill] = useState('');
    const [submit, setSubmit] = useState(0);
    const [url, setUrl] = useState("");
    const [formData, setFormData] = useState([{}]);
    const [changeP, setChangeP] = useState(false)
    const [isForm, setIsForm] = useState(false);


    const toggleFrom = () => {
        setIsForm(!isForm);
    }

    

// to display existing data
    const getData = async (url) => {
        let res = await axios.get(url);
        return res.data;
    };

    let getSearchedData = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        const newData = await getData(url);
        console.log(newData.data.provider[0])
        setUserData(newData.data.provider[0])
        setEduArr(newData.data.provider[0].eduction)
        setSkillArr(newData.data.provider[0].skill)
        setnameF(newData.data.provider[0].first_name)
        setnameL(newData.data.provider[0].last_name)
        setCity(newData.data.provider[0].city)
        setphone(newData.data.provider[0].phone_number)
        setUrl(newData.data.provider[0].url)


    };

//to update data
    let updateData = async () => {

        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        let res = await axios.patch(url, formData);
        return res.data;

    };


    const updatePhoto = (file) => {
        // setImage(file);
        postImage(file);
    };

    const postImage = (file) => {

        console.log(image);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "qitwzs7qac");
        data.append("cloud_name", "madadgar");
        fetch("https://api.cloudinary.com/v1_1/madadgar/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    useEffect(() => {
            getSearchedData();
        if (submit == 1) {
            var data = updateData();
            console.log(data)

        }
    }, [submit] )

    //Update Education
    function EducationCard({ item }) {
        let { institution, degree, start_date, end_date } = item;
        return (
            <>
                <div className="eduCard">
                       
                    <p className="Degree"> {institution} ,{degree} , {start_date} - {end_date}</p>
                    <div className="Close-btn" onClick={() => { removeEdu(item) }}>
                    x
                    </div></div>
            </>
        )
    }
    const removeEdu = (education) => {
        let updatedEduArr = eduArr.filter((item) =>
            item !== education ? item : null
        );
        setEduArr(updatedEduArr);
    };

    //skill add/remove
    let [skillArr, setSkillArr] = useState([]);

    const removeSkill = (skill) => {
        let updatedSkillArr = skillArr.filter((item) =>
            item !== skill ? item : null
        );
        setSkillArr(updatedSkillArr);
    };

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
    return (
        <div style={{ display: "flex" , height: "60%" , width: "300px" }}>
            <form className="formm" style={{ float: "left" }}>
                <div className="MainDiv" >
                    <h1 style={{fontSize:"20px" , color:'#2757c0', marginBottom: "4%" , fontWeight: "bold"}}>Update personal Information</h1>

                    <label className="labels" for="psw"><b className="blabel">First Name</b></label>
                    <input type="text" placeholder="First Name"  onChange={(e) => { setnameF(e.target.value) }} />

                    <label for="psw-repeat" className="labels"><b className="blabel" >Last Name</b></label>
                    <input type="text" placeholder="LastName" onChange={(e) => { setnameL(e.target.value) }} />

                    <label for="psw-repeat" className="labels"><b className="blabel" >Contact Number</b></label>
                    <input type="text" placeholder="Contact number" onChange={(e) => { setphone(e.target.value) }} />

                    <label className="labels" for="psw"><b className="blabel">Profile</b></label>
                            
                    <div className="addBtn" onClick={()=>{ toggleFrom();}}                       >
                            Change profile picture
                        </div>

                    <label for="psw-repeat" className="labels"><b className="blabel" >city</b></label>
                    <Selector setOption={setCity} choosenOption={city} optionList={cityOptions} />
                </div>
            </form>
            <form className="formm" style={{ float: "right" , height:"800px"}}>
                <div className="MainDiv1"  >
                    <h1 style={{fontSize:"20px" , color:"#2757c0" , marginBottom: "4%",fontWeight: "bold"}}>Update Skills</h1>
                    {/* skill cards */}
                    <div className="skills-container">
                        {skillArr.map((item, index) => (
                            <SkillCard key={index} item={item}> </SkillCard>
                        ))}
                    </div>
                    <label className="labels"> 
                        Skill
                        <input className="inputClass" type="text" value={skill} onChange={(e) => { setSkill(e.target.value) }} />
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
                    <h1 style={{fontSize:"20px" , color:"#2757c0" ,marginTop: "4%",marginBottom: "4%" , fontWeight: "bold"}}>
                        Update educational background
                    </h1>

                    {/* education cards */}
                    {eduArr.map((item, index) => (
                        <EducationCard key={index} item={item}> </EducationCard>

                    ))}
                    
                    <div className="splited-col" style={{ marginTop: "5px" }}>
                        <label className="labels">
                        Institute
                            <input className="inputClass" type="text" value={Institute} onChange={(e) => { setInstitute(e.target.value) }} />
                        </label >
                        <label className="labels">
                            Degree 
                            <input className="inputClass" type="text" value={Degree} onChange={(e) => { setDegree(e.target.value) }} />
                        </label>
                    </div>
                    <div className="splited-col">
                        <label className="labels">
                            From
                            <input style={{width: "200px" , lineHeight: "50px"}}
                                type="Number"
                                value={yearFrom}
                                style={{
                                    maxWidth: "40%",
                                    border:
                                        VM.validateFromDate(yearFrom, yearTill) === true
                                            ? "solid 1px #707070" : "1px solid red",
                                }}
                                onChange={(e) => { setYearFrom(e.target.value) }}
                            />
                        </label>
                        <label className="labels">
                            Till
                            <input  type="Number" value={yearTill}
                                style={{
                                    maxWidth: "40%",
                                    border:
                                        VM.validateTillDate(yearTill, yearFrom) === true
                                            ? "solid 1px #707070" : "1px solid red",
                                }}
                                onChange={(e) => { setYearTill(e.target.value) }} />
                        </label>
                    </div>
                    <div className="splited-col">
                        <div className="addBtn"
                            onClick={() => {

                                if (valdiateEducationForm(Institute, Degree, yearFrom, yearTill) === true) {
                                    //create education object
                                    console.log(Institute + Degree + yearFrom + yearTill);
                                    const test = {
                                        institution: Institute,
                                        degree: Degree,
                                        start_date: yearFrom.toString(),
                                        end_date: yearTill.toString()
                                    }
                                    setEduArr([...eduArr, test]);
                                    setInstitute('');
                                    setDegree('');
                                }
                            }}
                        >
                            Add
                        </div>
                    </div>
                    <button type="submit" class="registerbtn" onClick={() => {
                        setFormData({
                            first_name: nameF,
                            last_name: nameL,
                            phone_number: phone,
                            city: city,                       
                            eduction: eduArr,
                            skill: skillArr.map(item => item.toUpperCase()),
                           
                        });
                        setSubmit(1)
                    }}>Update</button>
                </div>
            </form>
            {isForm && <Popup
        content={

        
           
            // sPID , customerId , jobId , review , rating 

             <div >

            <UpdatePro handleClose={toggleFrom}/>
               
            </div>
            
        }
        handleClose={toggleFrom}
    />}

        </div>
    )
}

export default Editprofile
