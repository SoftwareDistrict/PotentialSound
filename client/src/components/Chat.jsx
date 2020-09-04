import React, { useState } from "react";
import Message from "./Message.jsx";
const Chat = () => {
  const [arrOfChatMessages] = useState([
    {
      message: "Sure send me it!",
      profilePic:
        "https://media.npr.org/assets/img/2020/02/06/marley-dennislawrence_wide-ff47e360977a27acfb066e56d6a98d3262619e27.jpeg?s=1400",
      userName: "Bob",
    },
    {
      message:
        "Hey Bob, be a little hubble I know you are the greatest artist in the world and all but its great to be humble too.. But hey want to link up and collab on this song I just made. It's a banger!",
      profilePic:
        "https://entertainment.time.com/wp-content/uploads/sites/3/2011/07/09_top10cartoonthemesongs1.jpg?w=720&h=480&crop=1",
      userName: "Doug",
    },
    {
      message: "Thanks I know I make the best music in the world!",
      profilePic:
        "https://media.npr.org/assets/img/2020/02/06/marley-dennislawrence_wide-ff47e360977a27acfb066e56d6a98d3262619e27.jpeg?s=1400",
      userName: "Bob",
    },
    {
      message: "Yooooo, I love your music man!",
      profilePic:
        "https://entertainment.time.com/wp-content/uploads/sites/3/2011/07/09_top10cartoonthemesongs1.jpg?w=720&h=480&crop=1",
      userName: "Doug",
    },
  ]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Chat</h1>
      <div>
        {arrOfChatMessages.reverse().map((messageObj, i) => (
          <Message messageObj={messageObj} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Chat;
