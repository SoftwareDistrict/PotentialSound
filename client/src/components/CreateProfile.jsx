import React, { useState } from 'react';
import axios from 'axios';

const CreateProfile = () => {
    const [ username, setUsername ] = useState('');
    const [ city, setCity ] = useState('');
    const [ cell, setCell ] = useState('');
    const [ description, setDescription ] = useState('');

    const createProfile = () => {
        axios.post('/createProfile', {
            userName: username,
            city: city,
            cell: cell,
            description: description
        })
        .then(({ data }) => console.log(data))
        .catch(err => console.error(err));
    };

    return(
        <div>
            <h1>Create Profile</h1>
            <input placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}></input><br/>
            <input placeholder='Enter City' onChange={(e) => setCity(e.target.value)}></input><br/>
            <input placeholder='Enter Cell' onChange={(e) => setCell(e.target.value)}></input><br/>
            <input placeholder='Enter Descrition' onChange={(e) => setDescription(e.target.value)}></input><br/>
            <p>~ Insert Profile Picture ~</p>
            <button onClick={() => createProfile()}>Submit</button>
        </div>
    );
};

export default CreateProfile;
