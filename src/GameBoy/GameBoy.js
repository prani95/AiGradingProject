import React from 'react';
import './GameBoy.css';
import gameBoyUnderImage from '../assets/gameboy-under.png';
import gameBoyTopImage from '../assets/gameboy-top.png';
import gameBoyLeftImage from '../assets/gameboy-left.png';
import gameBoyRightImage from '../assets/gameboy-right.png';

function GameBoy(props) {
  return (
    <>
      { props.windowWidth <= 480 && (<>
        <img className='gameboy-top' style={{width:props.windowWidth}} src={gameBoyTopImage}></img>
        <img className='gameboy-under' style={{width:props.windowWidth}} src={gameBoyUnderImage}></img>
        <img className='gameboy-left' style={{height:props.windowHeight}} src={gameBoyLeftImage}></img>
        <img className='gameboy-right' style={{height:props.windowHeight}} src={gameBoyRightImage}></img>
        <button type="button" className="arrow up" onClick={()=> props.isInPause ? props.movePause("ArrowUp") : props.move("ArrowUp")}></button>
        <button type="button" className="arrow down" onClick={()=> props.isInPause ? props.movePause("ArrowDown") : props.move("ArrowDown")}></button>
        <button type="button" className="arrow left" onClick={()=> props.isInPause ? props.movePause("ArrowLeft") : props.move("ArrowLeft")}></button>
        <button type="button" className="arrow right" onClick={()=> props.isInPause ? props.movePause("ArrowRight") : props.move("ArrowRight")}></button>
        <button type="button" className="arrow start" onClick={()=> props.pauseFunction()}></button>
        </>) }
    </>
  )
}

export default GameBoy