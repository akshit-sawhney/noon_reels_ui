import React, { useState, useEffect } from 'react';
import SearchField from "react-search-field";
import './VideoFooter.css'
import { Avatar, Button } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Ticker from "react-ticker";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { findAllByDisplayValue } from '@testing-library/react';



function VideoFooter({ reelId, channel, song, likes,
    shares, avatarSrc }) {
    const [isNotebookSearchVisible, setIsNotebookSearchVisible] = useState(false);
    const [notebooksList, setNotebooksList] = useState([]);
    const [searchTextValue, setSearchTextValue] = useState("");
    const [likesValue, setLikesValue] = useState(likes);

    function onBookmarkClick(a, b) {
        setIsNotebookSearchVisible(!isNotebookSearchVisible);
    }

    function handleNotebookCreateClick(value, event) {
        if (notebooksList.length) {
            const currentNotebook = notebooksList[0];
            const requestBody = {};
            requestBody.post_id = reelId;
            if (currentNotebook.id) {
                requestBody.notebook_id = currentNotebook.id
            } else {
                requestBody.user_id = "5555";
                requestBody.notebook_name = searchTextValue;
            }
            console.log('request object is: ', requestBody);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };
            fetch('http://localhost:3000/user_reels/create', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setIsNotebookSearchVisible(!isNotebookSearchVisible);
                });
        }
    }

    function onBookmarkTextChange(value, event) {
        const notebooksListLocal = [];
        fetch(`http://localhost:3000/notebooks/search?user_id=5555&notebook_name=${value}`)
            .then(res => res.json())
            .then((result) => {
                result.forEach(row => {
                    notebooksListLocal.push({
                        notebookName: row.notebook_name,
                        id: row.id
                    });
                });
                if (!notebooksListLocal.length) {
                    notebooksListLocal.push({
                        notebookName: `Create ${value} notebook`,
                        id: null
                    });
                }
                setNotebooksList(notebooksListLocal);
                setSearchTextValue(value);
            },
                (error) => { console.log('error: ', error) })
    }
    return (
        <div className="videoFooter">
            <div className="notebookSearch__top">
                {isNotebookSearchVisible === true ? (
                    <div>
                        <SearchField
                            placeholder="Search..."
                            onChange={onBookmarkTextChange}
                            searchText=""
                            classNames="videoFooter__search"
                        />
                        {notebooksList.length ? (
                            <div>
                                <ul className="videoFooter__notebooks__list">
                                    {notebooksList.map(({ id, notebookName }) => (
                                        <li key={id} className="videoFooter__notebooks__listItem">{notebookName}</li>
                                    ))}
                                </ul>
                                <button className="videoFooter__notebooks__save" onClick={handleNotebookCreateClick}>Create Notebook</button>
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                ) : (
                    <div />
                )}

            </div>
            <div className="videoFooter__text">
                {/* <Avatar src={avatarSrc} />
                <h3>
                    {channel} . <Button>Follow</Button>
                </h3> */}
            </div>
            <div className="videoFooter__actions">
                <div className="videoFooter__actionsLeft">
                    <BookmarkIcon onClick={onBookmarkClick} fontSize="large" />
                    {/* <ModeCommentIcon fontsize="large"/> */}
                    {/* <SendIcon fontsize="large"/> */}
                    {/* <MoreHorizIcon fontsize="large"/>  */}
                </div>
                <div className="videoFooter__actionsRight">
                    <div className="videoFooter__stat">
                        <FavoriteIcon onClick={(value, event) => {
                            const requestBody = {
                                reel_id: reelId,
                                likes: (likesValue + 1)
                            }
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(requestBody)
                            };
                            fetch('http://localhost:3000/likes/update_likes', requestOptions)
                                .then(response => response.json())
                                .then(data => {
                                    setLikesValue(likesValue + 1);
                                });
                        }
                        } />
                        <p>{likesValue}</p>
                    </div>
                    <div className="videoFooter__stat">
                        {/* <ModeCommentIcon /> */}
                        <VisibilityIcon />
                        <p>{shares}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoFooter
