import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";

const VCRoom = ({ match }) => {
  const userVideo = useRef(),
    partnerVideo = useRef(),
    peerRef = useRef(),
    socketRef = useRef(),
    otherUser = useRef(),
    userStream = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/chat/:id");
        socketRef.current.emit("joinCall", match.params.roomId);

        socketRef.current.on("otherUser", (userId) => {
          callUser(userId);
          otherUser.current = userId;
        });
        socketRef.current.on("userJoined", (userId) => (otherUser.current = userId));

        socketRef.current.on("offer", handleReceiveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleICECandidateMsg);
      })
      .catch((err) => console.warn(err));
  }, []);

  const callUser = (userId) => {
    peerRef.current = createPeer(userId);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  };

  const createPeer = (userId) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onIceCandidate = handleICECandidateEvent;
    peer.onTrack = handleTrackEvent;
    peer.onNegotiationNeeded = () => handleNegotiationNeededEvent(userId);

    return peer;
  };

  const handleNegotiationNeededEvent = (userId) => {
    peerRef.current
      .createOffer()
      .then((offer) => peerRef.current.setLocalDescription(offer))
      .then(() => {
        const payload = {
          target: userId,
          caller: socketRef.current.id,
          sdp: peerRef.current.LocalDescription,
        };

        socketRef.current.emit("offer", payload);
      })
      .catch((err) => console.warn(err));
  };

  const handleReceiveCall = (incoming) => {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() =>
        userStream.current
          .getTracks()
          .forEach((track) => peerRef.current.addTrack(track, userStream.current))
      )
      .then(() => peerRef.current.createAnswer())
      .then((answer) => peerRef.current.setLocalDescription(answer))
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  };

  const handleAnswer = (message) => {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((err) => console.warn(err));
  };

  const handleICECandidateEvent = (e) => {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidates", payload);
    }
  };

  const handleICECandidateMsg = (incoming) => {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current.addIceCandidate(candidate).catch((err) => console.warn(err));
  };

  const handleTrackEvent = (e) => (partnerVideo.current.srcObject = e.streams[0]);

  return (
    <div>
      <video autoPlay ref={userVideo} mute></video>
      <video autoPlay ref={partnerVideo} mute></video>
    </div>
  );
};

VCRoom.propTypes = {
  match: PropTypes.object.isRequired,
};

export default VCRoom;
