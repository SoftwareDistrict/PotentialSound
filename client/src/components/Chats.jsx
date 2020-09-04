import React, { useState } from "react";
import ChatEntry from "./ChatEntry.jsx";

const Chats = () => {
  const [chatMessage] = useState({
    chatName: "Squad",
    participants: ["Doug", "Evan", "Henny", "Brandon"],
    profilePic:
      "https://media.npr.org/assets/img/2020/02/06/marley-dennislawrence_wide-ff47e360977a27acfb066e56d6a98d3262619e27.jpeg?s=1400",
  });

  return (
    <div>
      <h1>Current Messages (Inbox) </h1>
      <ChatEntry chatMessage={chatMessage} />
      <ChatEntry chatMessage={chatMessage} />
      <ChatEntry chatMessage={chatMessage} />
    </div>
  );
};

export default Chats;
