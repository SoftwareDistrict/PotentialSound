import React from 'react';
import { Link } from 'react-router-dom';
import PostFeedEntry from './PostFeedEntry.jsx';
import axios from 'axios';

const HomeFeed = (props) => {
	const { arrPosts, userName } = props;

	const logout = () => {
		axios.get('/logout')
		.then(() => console.log('successful logout'))
		.catch(err => console.error('unsucessful logout: ', err));
  };

	return (
		<div>
			<div><Link to="/createProfile"><button>CreateProfile</button></Link></div>
			<div><Link to={`/profile/${userName}`}><button>Go to Profile Page</button></Link></div>
			<div><Link to={'/'}><button onClick={logout}>Logout</button></Link></div>
			<h1>
				PotentialSound
				<div style={{ width: "100px", height: "100px", borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
					<img src="https://tinyurl.com/y3h5vk9r" alt="Avatar" style={{ width: "auto", height: "100%", display: 'inline', margin: '0 auto', marginLeft: '-25%' }} />
				</div>
				<button type="button">MENU</button>
			</h1>
			<div>
				<input type="text" placeholder="Search for Post" style={{ width: '300px', height: '25px', fontSize: '14px', paddingLeft: '10px' }} /><button type="button" style={{ borderRadius: '5px' }}>Search</button>
				<div>
					<Link to="/createPostMessage"><button type="button" style={{ fontSize: '20px', padding: '5px', paddingLeft: '10px', paddingRight: '10px', borderRadius: '5px' }}>Creat A Post</button></Link>
				</div>
			</div>
			<div style={{ backgroundColor: "rgb(200,200,200)", width: '455px', height: '700px' }}>
				{arrPosts.map(post => <div><PostFeedEntry post={post} /><br /></div>)}
			</div>
		</div>
	);
};

export default HomeFeed;
