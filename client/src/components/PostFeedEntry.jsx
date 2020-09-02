import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function PostFeedEntry(props) {
    const { posterName, message, profilePic, tags } = props.post

    return (

        <div>
            <Link style={{ color: '#ff8c00' }} to={`/fullMessage/${posterName}`}>
                <div id='profile' style={{ border: '2px solid black', width: '400px', height: '100px', margin: '0 auto', backgroundColor: '#3F3D3D', position: "relative" }}>
                    <div style={{ position: "absolute", top: '0', resize: 'both', overflow: 'auto', width: '300px', height: '20px', textAlign: 'center', left: '100px', fontSize: '14px' }}>{`${posterName}`}</div>
                    <div style={{ position: "absolute", top: '5', resize: 'both', overflow: 'auto', width: '100px', height: '100px', textAlign: 'center' }}><img style={{ maxWidth: "100%", maxHeight: "100%" }} src={profilePic} /></div>
                    <div style={{ position: "absolute", top: '20px', backgroundColor: 'offwhite', resize: 'both', overflow: 'auto', width: '300px', height: '60px', textAlign: 'center', left: '100px', fontSize: '12px' }}>{message}</div>
                    <div style={{ position: "absolute", bottom: '0', resize: 'both', overflow: 'auto', width: '300px', height: '20px', textAlign: 'center', left: '100px' }}><div>{tags.join('  ')}</div></div>
                </div>
            </Link>
        </div>

    )
}
export default PostFeedEntry