// import React, { useState, useEffect, useRef } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";

// const CreateChat = ({ match, menu, currentUser }) => {
//   const inputBox = useRef();
//   const { id } = match.params;
//   console.info(id);
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [usersObj, setUsersObj] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [text, setText] = useState("");
//   const [allChats, setAllChats] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [chatId, setChatId] = useState(0);

//   const [usersChats, setUserChats] = useState([]);

//   console.log("allchats", allChats);
//   console.log("userobjs", usersObj);

//   useEffect(async () => {
//     getUsers();
//     await axios
//       .get("/users")
//       .then(({ data }) => setUsersObj(data))
//       .catch((err) => console.info("could not grab all usrs: ", err));
//     axios
//       .get("/allchats")
//       .then(({ data }) => setAllChats(data))
//       .catch((err) => console.warn("could not grab ChatJoi: ", err));
//   }, []);
//   //==================================
//   // const currentUsersChats = allChats.filter((chat) => currentUser.id === chat.id_user);
//   // console.log('currentuserschats', currentUsersChats);

//   // const allChatsWithId = currentUsersChats.map((userChat) => allChats.filter((chat) => {
//   //     if (chat.id_chat === userChat.id_chat) {
//   //       return chat;
//   //     }
//   //   });
//   // }).flat();

//   // console.log('allchatswithid', allChatsWithId);
//   // const memberIds = members.map((member) => usersObj.filter((user) => user.username === member).map((user) => user.id)).flat();
//   // console.log('memberIds', memberIds);

//   // const commonChats = memberIds.map((id) => allChatsWithId.filter((chat) => chat.id_user === id)).flat();
//   // console.log('commonchats', commonChats);

//   const currentUsersChats = allChats.filter((chat) => currentUser.id === chat.id_user);
//   console.log("currentUserChats", currentUsersChats);
//   //ALL USERSCHATS WITH CHAT ID
//   const allChatsWithId = currentUsersChats.map((userChat) =>
//     allChats.filter((chat) => chat.id_chat === userChat.id_chat)
//   );
//   //ALL MEMBERS IDS
//   console.log("allChatsWithId", allChatsWithId);
//   const memberIds = members
//     .map((member) => usersObj.filter((user) => user.username === member))
//     .flat();
//   const ids = memberIds.map((m) => m.id).concat(currentUser.id);
//   console.log("memberIds", memberIds);

//   const filterChatWithIds = allChatsWithId
//     .filter((arr) => {
//       console.log("filterChatWithIdsArr", arr);
//       console.log("ids", ids);
//       return arr.filter((obj) => ids.includes(obj.id_user)).length === arr.length;
//     })
//     .flat();

//   const suggestionSelected = (value) => {
//     setText(value);
//     console.log("val", value);
//     // members.push(value);
//     setMembers([...members, value]);
//     console.log(members);
//     setSuggestions([]);
//     console.log("filter arr", filterChatWithIds);
//   };

//   const renderSuggestions = () => {
//     console.info("redner suggestions");
//     if (suggestions.length === 0) {
//       return null;
//     }

//     return (
//       <ul>
//         {suggestions.map((user, i) => (
//           <li onClick={() => suggestionSelected(user)} key={i}>
//             {user}
//           </li>
//         ))}
//       </ul>
//     );
//   };
//   const getUsers = () => {
//     axios
//       .get("/users")
//       .then((users) => {
//         setUsersObj(users.data);
//         let usersArr = users.data.map((obj) => obj.username);
//         setUsers(usersArr);
//       })
//       .catch((err) => console.info(err));
//   };

//   const sendMessage = (message, userId, chatId) => {
//     let messageObj = { message: message, id_user: userId, id_chat: chatId };
//     axios
//       .post("/sendMessage", messageObj)
//       .then(() => {
//         console.log("sucessful message sent");
//       })
//       .catch((err) => console.log(err));
//   };

//   const createChat = () => {
//     axios
//       .post("/createChat")
//       .then((chatId) => {
//         console.log(chatId);
//         setChatId(chatId);
//       })
//       .catch((err) => console.log(err));
//   };

//   const createJoin = (userId, chatId) => {
//     let obj = { id_user: userId, id_chat: chatId };
//     axios
//       .post("/createJoin", obj)
//       .then(() => {
//         console.log("sucessfull join");
//       })
//       .catch((err) => console.log(err));
//   };

//   const onSubmit = () => {
//     if (filterChatWithIds.length === ids.length) {
//       sendMessage(message, currentUser.id, filterChatWithIds[0].id_chat);
//     } else {
//       createChat()
//         .then(() => {
//           ids.forEach((id) => createJoin(id, chatId));
//         })
//         .then(() => {
//           sendMessage(message, currentUser.id, chatId);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   //   let sendeeObj = usersObj.find((user) => user.username === text);
//   //   if (!sendeeObj) {
//   //     alert("Not a valid Username!");
//   //     return;
//   //   }
//   //   let sendeeId = sendeeObj.id;
//   //   const messageObj = {
//   //     message: message,
//   //     id_user: currentUser.id,
//   //   };

//   //   axios.post("/sendChatMessage", messageObj).then((data) => {
//   //     console.info(data, "sent successful message through axios request");
//   //     setUserChats(data);
//   //     setMessage("");
//   //     alert("Message was sent!");
//   //     inputBox.current.value = "";
//   //     ("input-message").value = "";
//   //   });
//   // }

//   const onTextChange = (event) => {
//     const value = event.target.value;
//     let sortedSuggestions = [];
//     if (value.length > 0) {
//       const regex = new RegExp(`${value}`, "i");
//       sortedSuggestions = users.sort().filter((v) => regex.test(v));
//     }
//     setSuggestions(sortedSuggestions);
//     setText(value);
//   };

//   return (
//     <div>
//       {menu}
//       <div>
//         <label>
//           <h3>Send a message</h3>
//           <button
//             onClick={() => {
//               console.log("filter arr", filterChatWithIds);
//             }}
//           >
//             CLICK
//           </button>
//           <label>
//             {" "}
//             To:
//             <div
//               style={{
//                 width: "100%",
//                 border: "1px solid grey",
//                 boxShadow: "2px 2px 1px rgba(50, 50, 50, 0.75)",
//               }}
//             >
//               <input
//                 style={{ width: "100%" }}
//                 value={text}
//                 onChange={onTextChange}
//                 placeholder="Username"
//               />
//               {renderSuggestions()}
//             </div>
//           </label>
//           <input
//             onChange={(event) => {
//               setMessage(event.target.value);
//             }}
//             ref={inputBox}
//             style={{
//               width: "250px",
//               height: "80px",
//               fontSize: "16px",
//               marginLeft: "10px",
//               paddingLeft: "10px",
//             }}
//             type="text"
//             placeholder="Message"
//           />
//           <br />
//           <button onClick={onSubmit} style={{ marginLeft: "5px", backgroundColor: "#eb8c34" }}>
//             Submit
//           </button>
//         </label>
//       </div>
//     </div>
//   );
// };

// CreateChat.propTypes = {
//   match: PropTypes.object.isRequired,
//   menu: PropTypes.element,
//   currentUser: PropTypes.object.isRequired,
// };

// export default CreateChat;
