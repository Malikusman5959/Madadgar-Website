import React,{useRef} from 'react'
import AdminTopbar from "./AdminTopbar";
import Sidebar from './SideNavBar';
import "./../style/inputs.css";
import './../style/askquestion.css';

import { useState, useEffect } from "react";
import axios from "axios";

export default function AskQuestion() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState('');
    const [user, setUser] = useState([null]);
    const ref = useRef();

    useEffect(() => {
        const getUser = async () => {
          try {
            let id = localStorage.getItem('user');
            const url = `http://localhost:8000/v1/serviceProvider/${id}`;
            let res = await axios.get(url);
        
             setUser(res.data.data.provider[0]);
       
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);
      console.log(file.path);
     
      const handleSubmit = async (e) => {
        
       
        e.preventDefault();

       
        if(title!="" && body!="" ){
       const formData= new FormData();
       formData.append("customerId", user?._id);
       formData.append("title", title);
       formData.append("body", body);
       formData.append("file", file);


        try {
            const res = await axios.post("http://localhost:8000/v1/question/", formData);
      
            alert('Question submitted');
            setTitle("");
            setBody("");
            setFile("");
            ref.current.value = ""
            

          } catch (err) {
            console.log(err);
          }
        }

        };

    return (
        <div>
            <AdminTopbar />
            <div className='LeftContainer' style={{ display:'flex'}}>

                <div className="sidebarContainer" style={{ fontSize: '14px', flex: '1', marginTop: '10px' }}>
                    <Sidebar />
                </div>

                <div className="mainContainer" style={{ fontSize: '14px', flex: '4' }}>
                    <div className='mainHeading'>
                        <span className='topHeading'> Ask a Question</span>
                    </div>
                    <div className="featured">
                        <div className="featuredItem">
                            <form  method='post' onSubmit={handleSubmit}>
                                <label className="InputLabel"  >Title</label>
                                <input  type="text" className='titleInput'
                                 style={{ width: '100%' }} 
                                 value={title}
                                 onChange={(e) => { setTitle(e.target.value) }}  required/>
                                
                                
                                <label className="InputLabel"  >Body</label>
                                <textarea required  type='textarea' className='titleInput' 
                                style={{ width: '100%', overflow: 'scroll' }} rows='10'
                                value={body}
                                onChange={(e) => { setBody( e.target.value) }} />

                                <label className="InputLabel">Attach File (if necessary)</label>
                                <input type="file" name='file'  ref={ref}  onChange={(e) => { setFile( e.target.files[0]) }} />
                                <br></br>

                                <button className='post' type='submit'  >Post</button>
                                
                            </form>
                       
                            

                        </div>
                    </div>
                </div>
                <div className='others' style={{flex:1}}></div>


            </div>
        </div>
    )
}

//onDone={({base64}) => setListingData({ ...listingData, selectedFile: base64})}