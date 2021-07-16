import React, { useState, useEffect } from 'react';
import './App.css';
import VideoCard from './VideoCard';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
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
            // url: row.path,
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
        {reels.map(({ channel, avatarSrc, song, url, likes, shares }) => (
          <VideoCard
            channel={channel}
            avatarSrc={avatarSrc}
            song={song}
            url={url}
            likes={likes}
            shares={shares}
          />
        ))}
      </div>
    </div>
  );
}

function Search() {
  return <h2>Search</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

// export default App;
