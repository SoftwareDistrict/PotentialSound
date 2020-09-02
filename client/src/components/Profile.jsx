import React, { useState } from 'react';

const Profile = () => {
    const [ state, setState ] = useState({
        username: 'Bob',
        propic:'https://media.npr.org/assets/img/2020/02/06/marley-dennislawrence_wide-ff47e360977a27acfb066e56d6a98d3262619e27.jpeg?s=1400',
        cell: '678-920-3121',
        desc: 'All about love and music!',
        city:  'Kingston',
        email: "bob123@gmail.com"
    });

    const { username, propic, cell, desc, city, email } = state;
    return (
        <div>
            <h1 style={{ textAlign: 'left' }}>{username}'s Profile Information</h1>
            <div id='profile' style={{ border: '2px solid black', width: '500px', height: '200px', textAlign: 'center', fontSize: '125%', margin: '0 auto' }}>
               <div class='profileInfo'>Username: {username}</div><br/>
               <div class='profileInfo'>Email: {email}</div><br/>
               <div class='profileInfo'>Cell Phone Number: {cell}</div><br/>
               <div class='profileInfo'>Hometown: {city}</div><br/>
            </div>
            <div class='profileInfo' style={{ margin: '0 auto', textAlign: 'center', fontSize: '125%' }}>Profile Picture<img src={propic} /></div> 
        </div>
    );
  };

  export default Profile;
