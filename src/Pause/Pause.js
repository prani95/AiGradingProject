import './Pause.css';
import React from 'react'
import PauseMenuImage from '../assets/pausemenu.png';
import startMenuAudio from "../music/startmenu.mp3";
import { useState, useEffect } from 'react';

function Pause(props) {

    const [audioStartMenu] = useState(new Audio(startMenuAudio));

    useEffect(() =>{
        if(props.inPauseFix) return;
        props.setInPauseFix(true);
        window.addEventListener('keyup', pauseHandler);
    },[])

    const pauseHandler = (key) => {
        if(key.key !== 'Escape') return;
        if(props.isInBattle) return;
        props.inPauseRef.current = !props.inPauseRef.current;
        props.setIsInPause(props.inPauseRef.current);
        playAudioStartMenu();
    }

    const playAudioStartMenu = () => {
        audioStartMenu.pause();
        audioStartMenu.currentTime = 0;
        audioStartMenu.play();
        audioStartMenu.volume = 0.05;
    }

    return (
        <div>
            <img className={props.inPauseRef.current ? 'inpauseMenu' : 'noinpauseMenu'} alt='imagePause' src={PauseMenuImage}></img>
        </div>
    )
}

export default Pause