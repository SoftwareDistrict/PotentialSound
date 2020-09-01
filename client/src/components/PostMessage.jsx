import React, { useState } from 'react';
function PostMessage(props) {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [userName, setUsername] = useState('Bob');
    const onEvent = (event, setFunc, val) => {
        if (event.target.value === '' || event.target.value === undefined) {
            setFunc(val);
        } else {
            setFunc(event.target.value);
            console.log(message);
        }
    }

    return (
        <div>
            <h1>Make a Post</h1>
            <div>
                <label>Title  <input size="20" onChange={(event) => onEvent(event, setMessage, message)} type="text" placeholder={'Title'} /></label><br />
                <label>Message  <input size="60" onChange={(event) => onEvent(event, setTitle, title)} type="text" placeholder={'Message'} /></label><br /><br />
                <button>Submit</button>

            </div>
        </div>
    )
}
export default PostMessage