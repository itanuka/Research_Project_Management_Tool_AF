import axios from "axios";
import React, { useEffect, useState } from "react";

function ChatForum() {
  
  const [messageContent, setMessageContent] = useState("");
  const groupId = "62941c183e69138335e09e72"
  const name = "Student 1"

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
