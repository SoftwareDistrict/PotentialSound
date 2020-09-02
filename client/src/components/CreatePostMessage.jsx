import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function CreatePostMessage({ makeNewPost, userName, userProfilePic }) {
    const [message, setMessage] = useState('');
    const onEvent = (event, setFunc, val) => {
        if (event.target.value === '' || event.target.value === undefined) {
            setFunc(val);
        } else {
            setFunc(event.target.value);
        }
    }

    return (
        <div>
            <h1>Make a Post</h1>
            <div>
                <label for="tag1">Collab</label>
                <input class="messageCheckbox" type="checkbox" id="tag1" name="type" value='#collab' />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag2">Rock</label>
                <input class="messageCheckbox" type="checkbox" id="tag2" name="type" value='#rock' />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag3">Metal</label>
                <input class="messageCheckbox" type="checkbox" id="tag3" name="type" value='#metal' />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag4">Vocalist</label>
                <input class="messageCheckbox" type="checkbox" id="tag4" name="type" value='#vocalist' />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag5">{'R&B beats'}</label>
                <input class="messageCheckbox" type="checkbox" id="tag5" name="type" value={'#r&b'} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag6">Help Wanted</label>
                <input class="messageCheckbox" type="checkbox" id="tag6" name="type" value='#help-wanted' />


                <br /><br />
                <label>Message  <input size="60" onChange={(event) => onEvent(event, setMessage, message)} type="text" placeholder={'Message'} /></label><br /><br />
                <button onClick={() => {
                    //-
                    var arrayTags = []
                    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                    for (var i = 0; i < checkboxes.length; i++) {
                        arrayTags.push(checkboxes[i].value)
                    }
                    const post = { posterName: userName, profilePic: userProfilePic, message: message, tags: arrayTags }
                    makeNewPost(post);
                }}>Submit</button>
            </div>
            <Link to="/">Back to HomeFeed</Link>
        </div>
    )
}
export default CreatePostMessage




{/* <label>Title  <input size="20" onChange={(event) => onEvent(event, setMessage, message)} type="text" placeholder={'Title'} /></label><br /> */ }