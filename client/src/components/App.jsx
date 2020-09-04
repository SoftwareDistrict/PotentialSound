import React, { Component } from "react";
import Login from "./Login.jsx";
import HomeFeed from "./HomeFeed.jsx";
import Profile from "./Profile.jsx";
import CreatePostMessage from "./CreatePostMessage.jsx";
import PostFullMessage from "./PostFullMessage.jsx";
import CreateProfile from "./CreateProfile.jsx";
import UpdateProfile from "./UpdateProfile.jsx";
import Nav from "./Nav.jsx";
import Messages from "./Chats.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalFeed: [],
    };
    this.getAllPosts = this.getAllPosts.bind(this);
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts() {
    axios
      .get("/feed")
      .then((feed) => this.setState({ geneeralFeed: feed.data }))
      .catch((err) => console.warn("Could not get all posts", err));
  }

  toggleMenu() {
    let nav = document.getElementById("mySidenav");
    let menu = document.getElementById("menu");
    if (nav.style.display === "none") {
      nav.style.display = "block";
      menu.style.display = "none";
    } else {
      nav.style.display = "none";
      menu.style.display = "block";
    }
  }

  render() {
    const { generalFeed } = this.state;
    return (
      <div>
        <Router>
          <Switch>
            <Route exact={true} path="/" render={() => <Login />} />
            <Route
              exact={true}
              path="/home"
              render={() => <HomeFeed generalFeed={generalFeed} />}
            />
            <Route exact={true} path="/profile/:id" render={() => <Profile />} />
            <Route exact={true} path="/createPostMessage" render={() => <CreatePostMessage />} />
            <Route
              path="/fullMessage/:id"
              render={(match) => <PostFullMessage id={match.match.params.id} />}
            />
            <Route path="/createProfile" render={() => <CreateProfile />} />
            <Route path="/updateProfile" render={() => <UpdateProfile />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
