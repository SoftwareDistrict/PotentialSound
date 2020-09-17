import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
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
import CreateChat from "./CreateChat.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
    };

    this.getCurrentUser = this.getCurrentUser.bind(this);
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

  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <Nav currentUser={currentUser} />
        <Switch>
          <Route
            path="/chats/:id"
            render={({ match }) => <Chat match={match} currentUser={currentUser} />}
          />
          <Route path="/chats" render={() => <Chats currentUser={currentUser} />} />
          <Route
            path="/home/:id"
            render={({ match }) => <PostFullMessage currentUser={currentUser} match={match} />}
          />
          <Route path="/home" render={() => <HomeFeed currentUser={currentUser} />} />
          <Route exact={true} path="/" render={() => <Login />} />
          <Route
            path="/profile/:id"
            render={({ match }) => <Profile match={match} currentUser={currentUser} />}
          />
          <Route
            path="/viewprofile/:name"
            render={(props) => <ViewProfile {...props} currentUser={currentUser} />}
          />
          <Route
            path="/updateProfile"
            render={() => (
              <UpdateProfile currentUser={currentUser} getCurrentUser={this.getCurrentUser} />
            )}
          />
          <Route
            path="/createPostMessage"
            render={() => <CreatePostMessage currentUser={currentUser} />}
          />
          <Route path="/createChat" render={() => <CreateChat currentUser={currentUser} />} />
          <Route
            path="/createProfile"
            render={() => (
              <CreateProfile getCurrentUser={this.getCurrentUser} currentUser={currentUser} />
            )}
          />
          <Route
            path="/room/:roomId"
            render={({ match, history }) => <VCRoom history={history} match={match} currentUser={currentUser} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
