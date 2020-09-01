import React, { useState } from 'react';
function PostTitleEntry(props) {
    const [posterName, setPosterName] = useState('Kenny');
    const [title, setTitle] = useState('Looking for a guitarist for a band!');
    const [message, setUsername] = useState('My band and I just lost our drummer who moved out the country. We are a local indie band in New Orleans and looking for someone who loves making bad ass music! ');

    return (
        <div>

            <div id='profile' style={{ border: '2px solid black', width: '500px', height: '60px', textAlign: 'center', margin: '0 auto', backgroundColor: "lightblue" }}>
                <div style={{ fontSize: '110%' }}>{`${posterName} posted`}</div>
                <div style={{ fontSize: '130%' }}>{`${title}`}</div><br />

            </div>
        </div>
    )
}
export default PostTitleEntry