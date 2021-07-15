import React, { useState, useEffect } from 'react';
import './App.css';
import VideoCard from './VideoCard';

function App() {
  const [reels, setReels] = useState([]);
  
  useEffect(() => {
      const reelsList = [];
    fetch("http://localhost:3000/list?user_id=5555")  
			.then(res => res.json())  
			.then((result) => { 
        console.log('result is: ', result)
				result.forEach(row => {
					reelsList.push({
            // channel: row.path, 
            // avatarSrc: row.path, 
            // song: row.path, 
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            likes: row.likes, 
            shares: row.views
          });
				});
				console.log('result is: ', reelsList);
				setReels(reelsList);
			},  
		(error) => { console.log('error: ', error) })  
  }, [])
  
  return (
    <div className="app">
      <div className="app__top"> 
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" alt="" className="app__logo"/> */}
        <h1>Noon Reels</h1>
      </div>
      {/* image at the top logo     */}
      {/* Reels Text */}

      <div className="app__videos">
      {/* Container of app__videos(scrollable content) */}
      {reels.map(({channel, avatarSrc, song, url,likes, shares}) => (
      <VideoCard
      channel = {channel}
      avatarSrc = {avatarSrc}
      song = {song}
      url = {url}
      likes = {likes}
      shares = {shares}
      />
      ))}
      </div>    
    </div>
  );
}

export default App;
