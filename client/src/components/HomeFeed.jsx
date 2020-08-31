import React from 'react';

const HomeFeed = (props) => {

    return (
        <div>
            <h1>PotentialSound</h1>
            <img src="https://tinyurl.com/y3h5vk9r"/>
            <input type="text"></input>
            <button type="button">
                <span className="glyphicon glyphicon-search"></span>
            </button>
            <button type="button">Creat A Post</button>
        </div>
    );
}

export default HomeFeed