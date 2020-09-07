import React, { Component } from "react";
import Login from "./Login.jsx";
import HomeFeed from "./HomeFeed.jsx";
import Profile from "./Profile.jsx";
import CreatePostMessage from "./CreatePostMessage.jsx";
import PostFullMessage from "./PostFullMessage.jsx";
import CreateProfile from "./CreateProfile.jsx";
import UpdateProfile from "./UpdateProfile.jsx";
import ViewProfile from "./ViewProfile.jsx";
import Nav from "./Nav.jsx";
import Chats from "./Chats.jsx";
import Chat from "./Chat.jsx";
import InsertAudio from "./InsertAudio.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      tags: [],
      allMsgs: [],
      allChats: [],
      audio: [],
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onChangeAudio = this.onChangeAudio.bind(this);
  }

  componentDidMount() {
    this.getTags();
    this.getMessages();
    this.getAllChats();
  }

  onChangeAudio(event) {
    this.setState({
      audio: [event.target.files[0]],
    });
  }

  getCurrentUser() {
    axios
      .get("/currentUser")
      .then((user) => this.setState({ currentUser: user.data }))
      .catch((err) => console.warn("could not get current user.", err));
  }

  getTags() {
    axios
      .get("/posttags")
      .then((tags) => this.setState({ tags: tags.data }))
      .catch((err) => console.warn("Could not get all tags", err));
  }

  getMessages() {
    axios
      .get("/messages")
      .then((msgs) => this.setState({ allMsgs: msgs.data }))
      .catch((err) => console.warn("Could not get all messages", err));
  }

  getAllChats() {
    axios
      .get("/allchats")
      .then((chats) => this.setState({ allChats: chats.data }))
      .catch((err) => console.warn("Could not get all chats", err));
  }

  toggleMenu() {
    const nav = document.getElementById("mySidenav");
    const menu = document.getElementById("menu");
    if (nav.style.display === "none") {
      nav.style.display = "block";
      menu.style.display = "none";
    } else {
      nav.style.display = "none";
      menu.style.display = "block";
    }
  }

  render() {
    const menu = (
      <div id="menu" style={{ fontSize: "40px", fontWeight: "bold" }} onClick={this.toggleMenu}>
        Menu
      </div>
    );
    const { currentUser, tags, allMsgs, allChats, audio } = this.state;
    return (
      <div>
        <Router>
          <Nav currentUser={currentUser} toggleMenu={this.toggleMenu} />
          <Switch>
            <Route exact={true} path="/" render={() => <Login />} />
            <Route
              exact={true}
              path="/home"
              render={() => (
                <HomeFeed
                  menu={menu}
                  tags={tags}
                  getCurrentUser={this.getCurrentUser}
                  audio={audio}
                />
              )}
            />
            <Route
              exact={true}
              path="/profile/:id"
              render={({ match }) => (
                <Profile menu={menu} match={match} currentUser={currentUser} />
              )}
            />
            <Route
              exact={true}
              path="/createPostMessage"
              render={() => <CreatePostMessage audio={audio} onChangeAudio={this.onChangeAudio} />}
            />
            <Route
              exact={true}
              path="/chats"
              render={() => <Chats menu={menu} allChats={allChats} currentUser={currentUser} />}
            />
            <Route
              exact={true}
              path="/fullMessage/:id"
              render={({ match }) => <PostFullMessage match={match} />}
            />
            <Route path="/createProfile" render={() => <CreateProfile />} />
            <Route
              path="/updateProfile"
              render={() => <UpdateProfile currentUser={currentUser} />}
            />
            <Route
              path="/chat/:id"
              render={({ match }) => <Chat match={match} menu={menu} allMsgs={allMsgs} />}
            />
            <Route
              path="/insertAudio"
              render={() => <InsertAudio onChangeAudio={this.onChangeAudio} audio={audio} />}
            />
            <Route exact={true}
              path="/:id"
              render={(match) => <ViewProfile username={match.match.params.id} menu={menu} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
