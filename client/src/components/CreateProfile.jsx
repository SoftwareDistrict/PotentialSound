import React, {useState, useEffect} from 'react';

const CreateProfile = () => {
    const [username, setUsername] = useState('');
    const [city, setCity] = useState('');
    const [cell, setCell] = useState('');
    const [description, setDescription] = useState('');

    const createProfile = () => {
        console.log("hit");
        console.log({username, city, cell, description});
    }

    return(
        <div>
            <h1>Create Profile</h1>
            <input placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}></input><br/>
            <input placeholder='Enter City' onChange={(e) => setCity(e.target.value)}></input><br/>
            <input placeholder='Enter Cell' onChange={(e) => setCell(e.target.value)}></input><br/>
            <input placeholder='Enter Descrition' onChange={(e) => setDescription(e.target.value)}></input><br/>
            <p>~ Insert Image ~</p>
            <button onClick={() => createProfile()}>Submit</button>
            
        </div>
    )
}

export default CreateProfile;