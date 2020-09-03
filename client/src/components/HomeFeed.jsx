import React from 'react';
import { Link } from 'react-router-dom';
import PostFeedEntry from './PostFeedEntry.jsx'
const HomeFeed = (props) => {
	console.log(props);

	const { arrPosts, userName, open } = props
	console.log(open);
	return (
		<div>

			<h1>
				PotentialSound
				<div style={{ width: "100px", height: "100px", borderRadius: '50%', position: 'relative', overflow: 'hidden', left:860}}>
					<img src="https://tinyurl.com/y3h5vk9r" alt="Avatar" style={{ width: "auto", height: "100%", display: 'inline', margin: '0 auto', marginLeft: '-25%' }} />
				</div>

			</h1>
			<div>
				<input type="text" placeholder="Search for Post" style={{ width: '500px', height: '30px', fontSize: '14px', paddinLeft: '10px' }}></input>
				<button type="button" style={{ borderRadius: '5px' }}>
					<img src="https://tinyurl.com/y2v9h8rz" style={{ width: "15%", height: "15%" }} />
				</button>
				<div>
					<Link to="/createPostMessage"><button type="button" style={{ fontSize: '20px', padding: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}>Creat A Post</button></Link>
				</div>
			</div>
			<div style={{ backgroundColor: "rgb(200,200,200)", height: '500px' }}>
				{arrPosts.map(post => <div><PostFeedEntry post={post} /><br /></div>)}
			</div>
		</div>
	);
}

export default HomeFeed