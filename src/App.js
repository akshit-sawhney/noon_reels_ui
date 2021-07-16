import React, { useState, useEffect } from 'react';
import SearchField from "react-search-field";
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
          <Route path="/notebooks">
            <Notebooks />
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
        result.forEach(row => {
          reelsList.push({
            reelId: row.id,
            url: row.path,
            likes: row.likes,
            shares: row.views
          });
        });
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
        {reels.map(({ reelId, channel, avatarSrc, song, url, likes, shares }) => (
          <VideoCard
            reelId={reelId}
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
  const [hashtagReels, setHashtagReels] = useState([]);

  function onChange(value, event) {
    const hashtagReelsList = [];
    fetch(`http://localhost:3000/list_hash_tag?hashtag=${value}`)
      .then(res => res.json())
      .then((result) => {
        result.forEach(row => {
          hashtagReelsList.push({
            reelId: row.id,
            url: row.path,
            likes: row.likes,
            shares: row.views
          });
        });
        setHashtagReels(hashtagReelsList);
      },
        (error) => { console.log('error: ', error) })
  }
  return (
    <div className="search">
      <div className="search__top">
        <SearchField
          placeholder="Search..."
          onChange={onChange}
          searchText=""
          classNames="test-class"
        />
      </div>
      {/* image at the top logo     */}
      {/* Reels Text */}

      <div className="search__videos">
        {hashtagReels.map(({ reelId, channel, avatarSrc, song, url, likes, shares }) => (
          <VideoCard
            reelId={reelId}
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
  )
}

function Notebooks() {
  const [notebooksList, setNotebooksList] = useState([]);

  const [notebookReelsList, setNotebookReelsList] = useState([]);

  useEffect(() => {
    const notebooksListLocal = [];
    fetch("http://localhost:3000/notebooks/list?user_id=5555")
      .then(res => res.json())
      .then((result) => {
        result.forEach(row => {
          notebooksListLocal.push({
            notebook_id: row.id,
            notebook_name: row.notebook_name
          });
        });
        setNotebooksList(notebooksListLocal);
      },
        (error) => { console.log('error: ', error) })
  }, [])

  return (
    <div className="notebooks">
      <div className="notebooks__top">
        <ul>
          {notebooksList.map(({ notebook_id, notebook_name }) => (
            <button className="notebooks__button" onClick={(value, event) => {
              console.log('hi: ', notebook_id);
              const notebookReelsListLocal = [];
              fetch(`http://localhost:3000/list/reels_by_notebook?notebook_id=${notebook_id}`)
                .then(res => res.json())
                .then((result) => {
                  result.forEach(row => {
                    notebookReelsListLocal.push({
                      reelId: row.id,
                      url: row.path,
                      likes: row.likes,
                      shares: row.views
                    });
                  });
                  console.log('here: ', notebookReelsListLocal);
                  setNotebookReelsList(notebookReelsListLocal);
                },
                  (error) => { console.log('error: ', error) })
            }}>
              {notebook_name}
            </button>
          ))}
        </ul>
      </div>
      {/* image at the top logo     */}
      {/* Reels Text */}

      <div className="notebooks__videos">
        {notebookReelsList.map(({ reelId, channel, avatarSrc, song, url, likes, shares }) => (
          <VideoCard
            reelId={reelId}
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
  )
}

// export default App;
