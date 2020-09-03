import React, { Component } from 'react';
import Login from './Login.jsx'
import HomeFeed from './HomeFeed.jsx'
import Profile from './Profile.jsx'
import CreatePostMessage from './CreatePostMessage.jsx'
import PostFullMessage from './PostFullMessage.jsx'
import PostFeedEntry from './PostFeedEntry.jsx'
import Nav from './Nav.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrPosts: [{
        posterName: 'Kenny',
        title: 'Looking for a guitarist for a band!',
        message:'My band and I just lost our drummer who moved out the country. We are a local indie band in New Orleans and looking for someone who loves making bad ass music!',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0XfgQMRh9MHNpd76OMN6r-SmwoE9HA_x92Q&usqp=CAU',
        tags: ['#help-wanted', '#rock']
      }, 
        {
        posterName: 'LitLil',
        title: 'Looking for producer that makes hiphop beats!',
        message:'I got some bars who got the heat!',
        profilePic: 'https://i.pinimg.com/originals/ce/f5/c2/cef5c2b4199157a05d50ec79fd8dc539.jpg',
        tags: ['#help-wanted'],
      },
      {
        posterName: 'Sara',
        message:'Looking for a lead vocalist to join our choir!',
        profilePic: 'https://www.saintmarys.edu/files/images/Womens-Choir-WEB-2.jpg',
        tags: ['#help-wanted', '#vocalist'],
      }
    ], 
    userName: 'Bob',
    userProfilePic: 'https://mma.prnewswire.com/media/1138309/UMe_Bob_Marley_1973_London.jpg?p=publish'
    }
    this.makeNewPost = this.makeNewPost.bind(this);
  }

makeNewPost(post){
  this.state.arrPosts.push(post);
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
  const menu = <div id='menu' style={{fontSize: '40px', fontWeight: 'bold'}}onClick={this.toggleMenu}>Menu</div>
    const open = () =>{
      document.getElementById("mySidenav").style.width = "280px";
    };
    const { arrPosts, userName, userProfilePic } = this.state;
    return (
              <Router>
                        {menu}
                         <Nav userName={userName} toggleMenu = {this.toggleMenu}/>
      <div>
        <Switch>
               <Route exact={true} path="/" render={() => (<HomeFeed open={open} arrPosts={arrPosts} userName={userName} />)} />
               <Route exact={true} path="/login" render={() => (<Login />)} />
               <Route exact={true} path="/profile/:id" render={() => (<Profile open={open} userName={userName}/>)} />
               <Route exact={true} path="/createPostMessage" render={() => (<CreatePostMessage open={open} makeNewPost={this.makeNewPost} userName={userName} userProfilePic={userProfilePic} />)} />
               <Route path="/fullMessage/:id" render={(match) => (<PostFullMessage open={open} arrPosts={arrPosts} match={match}  />)} />
               {/* <Route path="/fullMessage/:id" component={() => (<PostFullMessage arrPosts={arrPosts}  />)} /> */}
            </Switch>
      </div>
            </Router>
    )
  }
}

export default App;