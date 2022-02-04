import './../style/messenger.css'
import Nav from "./nav";
import Conversation from "./Conversation";
import Message from "./Message";
import Contact from './Contact';
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import ChatBoxTopBanner from './ChatBoxTopBanner';
import { useNavigate } from 'react-router-dom';
import './../style/HelperAccount.css'
import _1 from "./../img/logo2.png";
import _2 from "./../img/backIcon.png";






function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [user, setUser] = useState([null]);
  const [toggle, settoggle] = useState(false);
  let [userData, setUserData] = useState({});

  const socket = useRef();
  const scrollRef = useRef();
  let navigate = useNavigate();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);


    console.log(arrivalMessage);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    const getUser = async () => {
      try {
        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/serviceProvider/${id}`;
        let res = await axios.get(url);
        userData(res.data.data.provider[0])
        setUser(res.data.data.provider[0]);

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);



  useEffect(() => {
    const getConversation = async () => {
      try {
        let id = localStorage.getItem('user');
        const url = `http://localhost:8000/v1/conversation/${id}`;
        let res = await axios.get(url);
        setConversations(res.data);

      } catch (err) {
        console.log(err);
      }
    }
    getConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/v1/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      //     setOnlineUsers(
      //       user.followings.filter((f) => users.some((u) => u.userId === f))
      //     );
    });
  }, [user]);






  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage != "") {
      const message = {
        sender: user?._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat?.members.find(
        (member) => member !== user._id
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
      try {
        const res = await axios.post("http://localhost:8000/v1/messages/", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <>

      <header >
        <div className="top-bar user sticky">
          <div className="row top-bar__row">
            <div className="col-lg-2 col-md-2 col-3 pl-5 top-bar__row-col__logo">
              <a onClick=
                {() => {
                  navigate('/user/helperAccount');


                }}><img src={_1} alt="Logo" /></a>
            </div>
            <input className="profileImg" type="image" src={userData.profile_pic} name="" alt="submit" onClick={() => { settoggle(!toggle) }} />

            {toggle == true ? <div style={{ width: "20%", backgroundColor: "var(--main-navbar-color)", position: "absolute", right: "0", top: "48px" }}>
              <ul className="toggleList">
                <li onClick={() => {
                  navigate('/user/login');
                  localStorage.setItem('user', null);
                }}>
                  Logout</li>
              </ul>
            </div> : null}
          </div>
        </div>
      </header>
      <div className="messenger">
        <div className="chatMenu">
          <div style={{
            backgroundColor: "#255cc026",
            // height: "5%",
            width: "85%",
            marginTop: "3%",
            marginLeft: "2%",
            display:"inline-flex"
       
          }}>
            <h1 style={{
              color: "#0062cc",
              fontWeight: "600",
              fontSize: "5rem",
              padding: "4%",
              width:"80%"
            }}>Messenger</h1>
              <img src={_2} alt="" style={{height:"30px", width:"30px", margin: "4%" , color:"blue"}} onClick=
              {() => {
                navigate('/user/helperAccount');


              }}/>
          </div>
          <div className="chatMenuWrapper">

            <input placeholder="Search Service Provider" className="chatMenuInput"></input>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>

                <ChatBoxTopBanner current={currentChat} />

                <div className="chatBoxTop">

                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>

                <div className="chatBoxBottom">

                  <textarea className="chatMessageInput" placeholder="write something... "
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}></textarea>

                  <button className="chatSubmitButton" onClick={handleSubmit}> Send </button>
                </div>
              </>
            ) : (
              <span className="noConversationText" >
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>

      </div>
    </>
  )
}

export default Messenger;