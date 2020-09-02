import React, { useState } from 'react';
function CreatePostMessage(props) {
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

  <label for="tag1">Collab</label>
  <input class="messageCheckbox" type="checkbox" id="tag1" name="type" />

  <label for="tag2">Rock</label>
  <input class="messageCheckbox" type="checkbox" id="tag2" name="type" />

  <label for="tag3">Help Wanted</label>
  <input  class="messageCheckbox" type="checkbox" id="tag3" name="type" />

  <label for="tag4">Metal</label>
  <input class="messageCheckbox" type="checkbox" id="tag4" name="type" />

  <label for="tag5">Vocalist</label>
  <input class="messageCheckbox" type="checkbox" id="tag5" name="type" />

    <label for="tag6">{'R&B beats'}</label>
  <input class="messageCheckbox" type="checkbox" id="tag6" name="type" />
  
  
  <br/><br/>
                <label>Message  <input size="60" onChange={(event) => onEvent(event, setTitle, title)} type="text" placeholder={'Message'} /></label><br /><br />
                <button onClick={()=>{ 
                   var array = []
                   var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
                   console.log(checkboxes);
                   for (var i = 0; i < checkboxes.length; i++) {
                    console.log(checkboxes[i].value)
                     array.push(checkboxes[i].value)
                   }
                   console.log(array);
                }}>Submit</button>

            </div>
        </div>
    )
}
export default CreatePostMessage




                {/* <label>Title  <input size="20" onChange={(event) => onEvent(event, setMessage, message)} type="text" placeholder={'Title'} /></label><br /> */}