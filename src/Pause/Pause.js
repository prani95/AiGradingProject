import './Pause.css';
import React from 'react';
import PauseMenuImage from '../assets/pausemenu.png';
import SelectedMenuImage from '../assets/arrowselect.gif';
import { useEffect } from 'react';

function Pause(props) {
    useEffect(() =>{
        window.addEventListener('keyup', pauseHandler);
        window.addEventListener('keyup', pauseMenuSelectHandler);

        return () => {
            window.removeEventListener('keyup', pauseHandler);
            window.removeEventListener('keyup', pauseMenuSelectHandler);
        };
    },[])

    const pauseHandler = (key) => {
        if(key.key !== 'Escape') return;
        props.pauseFunction();
    }

    const pauseMenuSelectHandler = (direction) => {
        if(direction.key !== 'ArrowUp' && direction.key !== 'ArrowDown') return;
        props.movePause(direction.key);
    }

    return (
        <div>
            <div className={props.inPauseRef.current ? 'inpauseText' : 'noinpauseText'}>Pausa</div>
            <div className={props.inPauseRef.current ? 'inpauseBox' : 'noinpauseBox'}>
                {props.pauseArray.map((element, index) => {
                    return(
                    <div className='row' key={index}>
                        <div className="col">
                            <img className={props.selectedMenu === index ? 'selected' : 'noselected'} alt='selected' src={SelectedMenuImage}></img> 
                            {element}
                        </div>
                    </div>
                    );
                })}
            </div>  
            <img className={props.inPauseRef.current ? 'inpauseMenu' : 'noinpauseMenu'} alt='imagePause' src={PauseMenuImage}></img>
        </div>
    )
}

export default Pause