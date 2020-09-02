import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function CreatePostMessage({ makeNewPost, userName, userProfilePic }) {

    const [message, setMessage] = useState('');
    const [tags, setTags] = useState([])

    const onEvent = (event, setFunc, val) => {
        if (event.target.value === '' || event.target.value === undefined) {
            setFunc(val);
        } else {
            setFunc(event.target.value);
        }
    }

    const onCheck = (event) => {
        let selectedTag = event.target.value

        let foundTag = tags.find(tag => tag === selectedTag) 

        console.log(foundTag, 'found tag')
        // one make a condition to see if the tag is already in the state if it is remove it
        if(foundTag) {
            
            let proxyTags = [...tags]
            console.log(proxyTags, 'im the proxy array')
            // then want to remove found tag from proxy array
           proxyTags.splice(proxyTags.indexOf(foundTag),1)
            // then set proxy array with new array
            console.log(proxyTags, 'removed element from proxyarray')
            setTags(proxyTags)
        } else {      
            // if it's not in the state then add it to tag state
            console.log(selectedTag, 'event')
            setTags([...tags, selectedTag])
        }
        
    }

    console.log(tags)

    return (
        <div>
            <h1>Make a Post</h1>
            <div>
                <label for="tag1">Collab</label>
                <input class="messageCheckbox" type="checkbox" id="tag1" name="type"  value='#collab' onChange={(event) => onCheck(event)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag2">Rock</label>
                <input class="messageCheckbox" type="checkbox" id="tag2" name="type" value='#rock' onChange={(event) => onCheck(event)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag3">Metal</label>
                <input class="messageCheckbox" type="checkbox" id="tag3" name="type" value='#metal' onChange={(event) => onCheck(event)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag4">Vocalist</label>
                <input class="messageCheckbox" type="checkbox" id="tag4" name="type" value='#vocalist' onChange={(event) => onCheck(event)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag5">{'R&B beats'}</label>
                <input class="messageCheckbox" type="checkbox" id="tag5" name="type" value={'#r&b'} onChange={(event) => onCheck(event)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label for="tag6">Help Wanted</label>
                <input class="messageCheckbox" type="checkbox" id="tag6" name="type" value='#help-wanted' onChange={(event) => onCheck(event)} />


                <br /><br />
                <label>Message  <input size="60" onChange={(event) => onEvent(event, setMessage, message)} type="text" placeholder={'Message'} /></label><br /><br />
                <button onClick={() => {
                    //-
                    var arrayTags = []
                    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                    console.log(arrayTags, 'arrayTags')
                    console.log(checkboxes, 'checkboxes')
                
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