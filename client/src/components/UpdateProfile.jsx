import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const UpdateProfile = ({userName}) => {

    const [newUser, setNewUser] = useState('Previous Username');
    const [newCity, setNewCity] = useState('Previous City');
    const [newCell, setNewCell] = useState('Previous Cell');
    const [newDescription, setNewDescription] = useState('Previous Description');

    const updateProfile = () => {
        Axios.put('/updateProfile', {
            userName: newUser,
            city: newCity,
            cell: newCell,
            description: newDescription
        })
        .then(({data}) => console.log(data))
        .catch((err) => console.error(err));
    }

    return(<div>
        <h1>Update Your Profile</h1>
        <input value={newUser} onChange={(e) => {setNewUser(e.target.value)}}></input><br/>
        <input value={newCity} onChange={(e) => {setNewCity(e.target.value)}}></input><br/>
        <input value={newCell} onChange={(e) => {setNewCell(e.target.value)}}></input><br/>
        <input value={newDescription} onChange={(e) => {setNewDescription(e.target.value)}}></input><br/>
        <Link to={`/profile/${userName}`}><button type="button" onClick={() => updateProfile()}>Submit Change</button></Link>
    </div>)
}

export default UpdateProfile;