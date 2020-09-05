import React, { Component } from "react";
import Login from "./Login.jsx";
import HomeFeed from "./HomeFeed.jsx";
import Profile from "./Profile.jsx";
import CreatePostMessage from "./CreatePostMessage.jsx";
import PostFullMessage from "./PostFullMessage.jsx";
import CreateProfile from "./CreateProfile.jsx";
import UpdateProfile from "./UpdateProfile.jsx";
import Nav from "./Nav.jsx";
import Chats from "./Chats.jsx";
import Chat from "./Chat.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      users: [],
      generalFeed: [],
      tags: [],
      allMsgs: [],
      allChats: [],
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getTags = this.getTags.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
    this.getAllPosts();
    this.getUsers();
    this.getTags();
    this.getMessages();
    this.getAllChats();
  }

  getCurrentUser() {
    axios
      .get("/currentUser")
      .then((user) => {
        console.info("currentUser", user.data);
        this.setState({ currentUser: user.data });
      })
      .catch((err) => console.warn("could not get current user.", err));
  }

  getAllPosts() {
    axios
      .get("/feed")
      .then((feed) => {
        console.info("feed", feed.data);
        this.setState({ generalFeed: feed.data });
      })
      .catch((err) => console.warn("Could not get all posts", err));
  }

  getUsers() {
    axios
      .get("/users")
      .then((users) => {
        console.info("Users", users.data);
        this.setState({ users: users.data });
      })
      .catch((err) => console.warn("Could not get all users", err));
  }

  getTags() {
    axios
      .get("/posttags")
      .then((tags) => {
        console.info("tags", tags.data);
        this.setState({ tags: tags.data });
      })
      .catch((err) => console.warn("Could not get all tags", err));
  }

  getMessages() {
    axios
      .get("/messages")
      .then((msgs) => {
        console.info("msgs", msgs.data);
        this.setState({ allMsgs: msgs.data });
      })
      .catch((err) => console.warn("Could not get all messages", err));
  }

  getAllChats() {
    axios
      .get("/allchats")
      .then((chats) => {
        console.info("chats", chats.data);
        this.setState({ allChats: chats.data });
      })
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
    const { generalFeed, currentUser, tags, users, allMsgs, allChats } = this.state;
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
                  currentUser={currentUser}
                  generalFeed={generalFeed}
                  users={users}
                  tags={tags}
                />
              )}
            />
            <Route
              exact={true}
              path="/profile/:id"
              render={({ match }) => (
                <Profile menu={menu} match={match} users={users} currentUser={currentUser} />
              )}
            />
            <Route exact={true} path="/createPostMessage" render={() => <CreatePostMessage />} />
            <Route
              exact={true}
              path="/chats"
              render={() => (
                <Chats menu={menu} users={users} allChats={allChats} currentUser={currentUser} />
              )}
            />
            <Route
              path="/fullMessage/:id"
              render={({ match }) => (
                <PostFullMessage users={users} generalFeed={generalFeed} match={match} />
              )}
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
