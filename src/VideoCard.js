import React, { useRef, useState } from 'react'
import "./VideoCard.css";
import VideoHeader from './VideoHeader';
import VideoFooter from './VideoFooter';

function VideoCard({ keyId, reelId, url, likes, shares, channel, avatarSrc, song }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [viewsValue, setViewsValue] = useState(shares);
    const videoRef = useRef(null);

    const onVideoPress = () =>{
        if (isVideoPlaying){
            //stop
            videoRef.current.pause()
            setIsVideoPlaying(false)
        }else{
            //play
            videoRef.current.play()
            setIsVideoPlaying(true)
            const requestBody = {
                reel_id: reelId,
                views: (viewsValue + 1)
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };

            fetch('http://localhost:3000/likes/update_views', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setViewsValue(viewsValue + 1);
                });
        }
    }
    //useState
    //useRef
    return (
        <div className='videoCard'>
           <VideoHeader/>
           <video
            ref = {videoRef}
            onClick={onVideoPress}
            className ="videoCard__player"
            src={url}
            alt="IG reel video" 
            loop
            />
            <VideoHeader
            />
            <VideoFooter
             reelId={reelId}
             channel = {channel}
             likes = {likes}
             shares = {viewsValue}
             avatarSrc = {avatarSrc}
             song = {song} 
            />

        </div>
    )
}

export default VideoCard
