import React, { useState } from 'react';
function EditProfile(props) {
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
    </div>
    )
  }
  export default EditProfile