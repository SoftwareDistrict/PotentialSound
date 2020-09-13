import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import Peer from "simple-peer";
import PropTypes from "prop-types";
import LiveMessage from "./LiveMessage.jsx";
const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const LSRoom = ({ match, currentUser }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = match.params.roomID;
  const [messages, setMessage] = useState([]);
  const [messageBox, setMessageBox] = useState("");
  const onEventChange = (event) => setMessageBox(event.target.value);
  socketRef.current = io.connect("/");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", (users) => {
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });
      console.info(peers);

      socketRef.current.on("user joined", (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.callerID);
        if (!item) {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [...users, peer]);
        }
      });

      socketRef.current.on("receiving returned signal", (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }, []);

  socketRef.current.on("receiveChats", (data) => {
    if (data.live_id == roomID) {
      setMessage([...messages, data]);
    }
  });

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div>
      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
      </Container>
      <div>
        {messages.map((messageObj, index) => {
          return <LiveMessage name={messageObj.name} message={messageObj.message} key={index} />;
        })}
      </div>
      <input onChange={onEventChange} />
      <button
        onClick={() => {
          socketRef.current.emit("send", {
            name: currentUser.username,
            message: messageBox,
            live_id: roomID,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

LSRoom.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

Video.propTypes = {
  peer: PropTypes.object,
};

export default LSRoom;
