import React from 'react';
import { Link } from 'react-router-dom';

const PostFeedEntry = (props) => {
    const { posterName, message, profilePic, tags } = props.post;

    return (
        <div>
            <Link style={{ color: '#ff8c00' }} to={`/fullMessage/${posterName}`}>
                <div id='profile' style={{ border: '2px solid black', width: '450px', height: '100px', margin: '0 auto', backgroundColor: '#3F3D3D', position: "relative" }}>
                    <div style={{ position: "absolute", top: '0', resize: 'both', overflow: 'auto', width: '300px', height: '20px', textAlign: 'left', left: '100px', fontSize: '14px' }}>{posterName}</div>
                    <div style={{ position: "absolute", top: '5px', resize: 'both', overflow: 'auto', width: '100px', height: '100px', textAlign: 'left' }}><img style={{ maxWidth: "100%", maxHeight: "100%" }} src={profilePic} /></div>
                    <div style={{ position: "absolute", top: '20px', backgroundColor: 'offwhite', resize: 'both', overflow: 'auto', width: '300px', height: '60px', textAlign: 'left', left: '100px', fontSize: '12px' }}>{message}</div>
                    <div style={{ position: "absolute", bottom: '20px', resize: 'both', overflow: 'auto', width: '300px', height: '20px', textAlign: 'left', left: '100px' }}><div>{tags.join('  ')}</div></div>
                </div>
            </Link>
        </div>
    );
};

export default PostFeedEntry;
