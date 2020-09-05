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
    };

    this.getUsers = this.getUsers.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getTags = this.getTags.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
    this.getUsers();
    this.getAllPosts();
    this.getTags();
  }

  getCurrentUser() {
    axios
      .get("/currentUser")
      .then((user) => this.setState({ currentUser: user.data }))
      .catch((err) => console.warn("could not get current user.", err));
  }

  getAllPosts() {
    axios
      .get("/feed")
      .then((feed) => this.setState({ generalFeed: feed.data }))
      .catch((err) => console.warn("Could not get all posts", err));
  }

  getUsers() {
    axios
      .get("/users")
      .then((users) => this.setState({ users: users.data }))
      .catch((err) => console.warn("Could not get all users", err));
  }

  getTags() {
    axios
      .get("/posttags")
      .then((tags) => this.setState({ tags: tags.data }))
      .catch((err) => console.warn("Could not get all tags", err));
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
    const { generalFeed, currentUser, tags, users } = this.state;
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
            <Route exact={true} path="/profile/:id" render={() => <Profile menu={menu} />} />
            <Route exact={true} path="/createPostMessage" render={() => <CreatePostMessage />} />
            <Route exact={true} path="/chats" render={() => <Chats menu={menu} />} />
            <Route
              path="/fullMessage/:id"
              render={(match) => <PostFullMessage id={match.match.params.id} />}
            />
            <Route path="/createProfile" render={() => <CreateProfile />} />
            <Route path="/updateProfile" render={() => <UpdateProfile />} />
            <Route path="/chat/:id" render={() => <Chat />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
