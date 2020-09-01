import React, { Component } from 'react';
import Login from './Login.jsx'
import HomeFeed from './HomeFeed.jsx'
import Profile from './Profile.jsx'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <h1>TESTING</h1>
        <Login />
        <HomeFeed />
        <Profile />
      </div>
    )
  }
}

export default App;