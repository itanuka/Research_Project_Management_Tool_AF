import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import jwtDecode from 'jwt-decode'

function ChatForum() {
  
  let navigate = useNavigate()

  const [messageContent, setMessageContent] = useState("");
  const [user, setUser] = useState({});

  async function pageInitialization() {

    try {
        const jwt = localStorage.getItem("token");
        setUser(jwtDecode(jwt));
      } catch (error) {
        navigate('/unauthorized')
      }
  }

  useEffect(() => {
    pageInitialization()
  }, []);


  const groupId = user.groupID
  const userID = user.userID


  console.log(groupId, userID)

  const name = "" //use the userID to find the name

  async function postMessage() {
    await axios.post(`http://localhost:4000/api/v1/groups/newChatMessage/${groupId}`, {
        name,
        message: messageContent
    })
  }

  return (
    <div>
      <h2>Post new message</h2>
      <form class="mb-3"
        onSubmit={()=>{
          postMessage()
        }}
      >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlTextarea1"
          
          placeholder="Enter your message here"
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        ></input>
        <button> SEND </button>
      </form>
    </div>
  );
}

export default ChatForum;
