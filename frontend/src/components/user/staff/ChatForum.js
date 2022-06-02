import axios from "axios";
import React, { useEffect, useState } from "react";

function ChatForum() {
  
  const [messageContent, setMessageContent] = useState("");
  const groupId = ""
  const name = ""

  async function postMessage() {
    await axios.post(`http://localhost:4000/api/v1/groups/newChatMessage/${groupId}`, {
        groupId,
        name,
        messageContent
    })
  }

  useEffect(() => {
    postMessage()
  }, [messageContent]);

  return (
    <div>
      <h2>Post new message</h2>
      <div class="mb-3">
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Enter your message here"
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default ChatForum;
