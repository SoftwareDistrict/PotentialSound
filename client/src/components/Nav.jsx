import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const { userName } = props;
  const style = {
    backgroundColor: "grey",
    width: '280px', height: '300px', margin: '0 auto', position: "absolute", fontSize: '20px', border: '5px', color:'black', textDecoration: 'none'
  }
  const linkStyle = {color:'orange', textDecoration: 'none'}
  // const sstyle= {margin: 0, padding: 0, listStyle: 'none', textDecoration: "none"}
  const sstyle= {position: 'fixed', left: 0, width: '200px', height: '100%', backgroundColor:'yellow'};
  return (
    <div style={sstyle} id="mySidenav" className="navbar">
      <header>MyApp</header>
      <ul>
        <Link style={linkStyle} to='/'>General</Link><br /><br />
        <Link style={linkStyle}>Messages</Link><br /><br />
        <Link style={linkStyle}>Start Video Chat</Link><br /><br />
        <Link style={linkStyle} to={`/profile/${userName}`}>My Profile</Link><br/>
      </ul>
      <div style={style}className="nav">
      </div>
    </div>

  );
};

export default Nav;
