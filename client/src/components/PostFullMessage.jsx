import React from 'react';

const PostFullMessage = ({ arrPosts, match }) => {
    const name = match.match.params.id;

    let found = arrPosts.find(element => {
        return name === element.posterName;
    });
    
    const { posterName, message, profilePic } = found;
    
    const onEvent = (event, setFunc, val) => {
        if (event.target.value === '' || event.target.value === undefined) {
            setFunc(val);
        } else {
            setFunc(event.target.value);
        }
    };

    return (
        <div>
            <div id='profile' style={{ border: '2px solid black', width: '500px', height: '300px', textAlign: 'center', margin: '0 auto', position: "relative" }}>
                <div style={{ fontSize: '125%' }}>{posterName} posted</div>
               <div>Message: {message}</div><br/>
               <div style={{ position: "absolute", top: '5', textAlign: 'center', resize: 'both', overflow: 'auto', width: '150px', height: '150px', textAlign: 'center' }}>Profile Pic:<img style={{ maxWidth: "100%", maxHeight: "100%" }} src={profilePic} /></div><br/>
            </div>
            <div>
                <h3>Reply</h3>
                <label>Message<input size="60" onChange={(event) => onEvent(event, setTitle, title)} type="text" placeholder='Message' /></label><br /><br />
                <button>Submit</button>
            </div>
        </div>
    );
};

export default PostFullMessage;
