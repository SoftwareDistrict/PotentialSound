import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
  const { userName, toggleMenu } = props;
  
  const style = { position: 'fixed', left: 0, width: '180px', height: '100%', backgroundColor: '#3F3D3D', zIndex: 20, borderRadius: '15px', display: 'none' };
  const linkStyle = { color: 'orange', textDecoration: 'none', float: 'left', fontSize: '30px' }
  return (
    <div style={style} id="mySidenav" className="navbar">
      <h2 onClick={toggleMenu} style={{ textAlign: 'center' }}>Menu</h2>
      <br /><br />
      <Link onClick={toggleMenu} style={linkStyle} to='/'>General</Link><br /><br /><br /><br /><br />
      <Link onClick={toggleMenu} style={linkStyle}>Messages</Link><br /><br /><br /><br /><br />
      <Link onClick={toggleMenu} style={linkStyle}>Start Video Chat</Link> <br /> <br /> <br /> <br /> <br /> <br />
      <Link onClick={toggleMenu} style={linkStyle} to={`/profile/${userName}`}>My Profile</Link><br /> <br /> <br /> <br />
      <div style={{ fontSize: '30px', fontWeight: 'bold' }} onClick={toggleMenu}>Close</div>
    </div>

  );
};

export default Nav;
