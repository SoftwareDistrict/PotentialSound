import React, { useRef, useEffect, useState } from "react";
import { CardMedia, IconButton, Grid } from "@material-ui/core";
import Appbar from "./Appbar.jsx";
import io from "socket.io-client";
import Peer from "simple-peer";
import PropTypes from "prop-types";
import { videoChatStyles, body } from "../styles/styles.js";
import CallEndIcon from "@material-ui/icons/CallEnd";

const Video = (props) => {
  const ref = useRef();
  const classes = videoChatStyles();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <CardMedia className={classes.video} component="video" playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const VCRoom = ({ match, currentUser, history }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = match.params.roomID;
  const classes = videoChatStyles();
  const main = body();

  useEffect(() => {
    socketRef.current = io.connect("/");
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

  const disconnect = () => {
    userVideo.current.pause();
    userVideo.current.srcObject.getTracks().forEach((track) => track.stop());
    socketRef.current.emit("disconnect");
    history.push("/chats");
  };

  return (
    <div>
      <Appbar currentUser={currentUser} />
      <Grid
        container
        className={main.body}
        justify="center"
        alignItems="flex-start"
        direction="row"
      >
        <Grid
          container
          className={classes.grid1}
          justify="flex-start"
          alignItems="center"
          direction="column"
        >
          <Grid
            container
            className={classes.grid2}
            justify="space-evenly"
            alignItems="flex-start"
            direction="row"
          >
            <CardMedia
              className={classes.video}
              component="video"
              muted
              ref={userVideo}
              autoPlay
              playsInline
            />
            {peers.map((peer, index) => {
              return <Video key={index} peer={peer} />;
            })}
          </Grid>
          <IconButton className={classes.button} onClick={() => disconnect()}>
            <CallEndIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

VCRoom.propTypes = {
  match: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

Video.propTypes = {
  peer: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
};

export default VCRoom;
