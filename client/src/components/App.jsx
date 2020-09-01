import React, { Component } from 'react';
import Login from './Login.jsx'
import HomeFeed from './HomeFeed.jsx'
import Profile from './Profile.jsx'
import CreatePostMessage from './CreatePostMessage.jsx'
import PostEntry from './PostEntry.jsx'
import PostTitleEntry from './PostTitleEntry.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
              <Router>
      <div>
        <Switch>
               <Route exact={true} path="/" render={() => (<HomeFeed />)} />
               <Route exact={true} path="/login" render={() => (<Login />)} />
               <Route exact={true} path="/profile" render={() => (<Profile />)} />
               <Route exact={true} path="/createPostMessage" render={() => (<CreatePostMessage />)} />
            </Switch>
      </div>
            </Router>
    )
  }
}

export default App;