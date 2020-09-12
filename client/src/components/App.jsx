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
import VCRoom from "./VCRoom.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import CreateChat from "./CreateChat.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    axios
      .get("/currentUser")
      .then((user) => this.setState({ currentUser: user.data }))
      .catch((err) => console.warn("could not get current user.", err));
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
      <div id="menu" style={{ fontSize: "28px", fontWeight: "bold" }} onClick={this.toggleMenu}>
        Menu
      </div>
    );
    const { currentUser } = this.state;
    return (
      <div>
        <Router>
          <Nav currentUser={currentUser} toggleMenu={this.toggleMenu} />
          <Switch>
            <Route path="/chats/:id" render={({ match }) => (<Chat match={match} currentUser={currentUser} menu={menu} />)} />
            <Route path="/chats" render={() => (<Chats menu={menu} currentUser={currentUser} />)} />
            <Route path="/home/:id" render={({ match }) => (<PostFullMessage currentUser={currentUser} match={match} menu={menu} />)} />
            <Route path="/home" render={() => (<HomeFeed menu={menu} currentUser={currentUser} />)} />
            <Route exact={true} path="/" render={() => (<Login />)} />
            <Route path="/profile/:id" render={({ match }) => (<Profile menu={menu} match={match} currentUser={currentUser} />)} />
            <Route path="/viewprofile/:id" render={(props) => (<ViewProfile menu={menu} {...props} />)} />
            <Route path="/updateProfile" render={() => (<UpdateProfile currentUser={currentUser} menu={menu} getCurrentUser={this.getCurrentUser} />)} />
            <Route path="/createPostMessage" render={() => (<CreatePostMessage />)} />
            <Route path="/createChat" render={() => (<CreateChat currentUser={currentUser} menu={menu} />)} />
            <Route path="/createProfile" render={() => (<CreateProfile getCurrentUser={this.getCurrentUser} />)} />
            <Route path="/room/:roomId" render={({ match }) => (<VCRoom match={match} />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
