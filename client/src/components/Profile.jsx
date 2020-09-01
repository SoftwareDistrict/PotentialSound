import React, { useState } from 'react';
function Profile(props) {
  
    const [ state, setState ] = useState({
        userName: 'Bob',
        propic:'https://media.npr.org/assets/img/2020/02/06/marley-dennislawrence_wide-ff47e360977a27acfb066e56d6a98d3262619e27.jpeg?s=1400',
        cell: '678-920-3121',
        desc: 'All about love and music!',
        city:  'Kingston',
        email: "bob123@gmail.com"
    });

    return (
        <div>
    <h1>{`${state.userName}'s Profile Inforamtion`}</h1>
    <div id='profile'>
               <div class='profileInfo'>{`Username: ${state.userName}`}</div>
               <div class='profileInfo'>{`Email: ${state.email}`}</div>
               <div class='profileInfo'>{`Cell Phone Number: ${state.cell}`}</div>
               <div class='profileInfo'>{`Hometown: ${state.city}`}</div>
               <div class='profileInfo'>{`Profile Pic:`}<img src={state.propic}/></div> 
        </div>
    </div>
    )
  }
  export default Profile