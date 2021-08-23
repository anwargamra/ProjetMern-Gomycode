import "./Messenger.css";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import {UidContext} from "../../components/AppContext"
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import React from 'react'


function Messenger() {
    const scrollRef = useRef();
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
    const getConversations = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}api/Conversation/${userData._id}`);
          setConversations(res.data)
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }, [userData._id]);

    useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/Message/${currentChat?._id}`);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);
      console.log(messages)
      
  const handleSubmit = async (e) => {

    e.preventDefault();
    const message = {
        sender: userData._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== userData._id,
      );

      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/Message`, message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
}

useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
    return (
        <div>
            <div className="messenger" >            

            <div className="chatMenu">   
            <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />

            {conversations.map((c) => ( 
                <div onClick={() => setCurrentChat(c)}>

                <Conversation Conversation={c} currentUser={userData} />
                </div>
))}
              </div>   
                  </div>

            <div className="chatBox">   
            <div className="chatBoxWrapper">
            {currentChat ? (<>
                <div className="chatBoxTop">
                <div ref={scrollRef}>
                    {messages.map((m)=>(<Message Message={m} own = {m.sender=== userData._id}/>)
                    )}
                    
                    </div>

                </div>
                <div className="chatBoxBottom">
                <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  </div>
                  </>):(
                  <span className="noConversationText">
                Open a conversation to start a chat.
              </span> )}

                

            </div>
   
                  </div>

            <div className="chatOnline"> 
            <div className="chatOnlineWrapper">

            </div>
    
                   </div>


           

            </div>
        </div>
    )
}

export default Messenger
