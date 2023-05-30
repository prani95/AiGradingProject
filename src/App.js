import './App.css';
import React,{useState,useEffect, useRef} from 'react';
import GrassGrid from './GrassGrid/GrassGrid';
import Fight from './Fight/Fight';
import Instructions from './Pages/Instructions/Instructions';
import Home from './Pages/Home/Home';
import Grading from './Pages/Grading/Grading';
import chillAudio from "./music/ChillingTheme.mp3";
import battleAudio from "./music/BattleTheme.mp3";
import Company from './Pages/Company/Company';

function App() {
  
  const numRows = 13;
  const numCells = 60;
  const pokemonEncounterRate = 10;

  const [position, setPosition] = useState({});
  const [isInBattle, setIsInBattle] = useState(false);

  const [currentPage, setCurrentPage] = useState('Instructions');

  const [audioBg, setAudioBg] = useState(new Audio(chillAudio));
  const [audioFight, setAudioFight] = useState(new Audio(battleAudio));

  const posRef = useRef(position);
  const inBattleRef = useRef(isInBattle);

  useEffect(() => {
    let coordX = Math.floor(numCells/2) - 1;
    let coordY = Math.floor(numRows/2);
    let objCoords = {
        x: coordX,
        y: coordY
    } 
    posRef.current = objCoords;

    setPosition(objCoords);

    window.addEventListener('keyup', movementHandler)
    
  },[])

  const switchPage = () => {
    switch(currentPage){
      case 'Instructions':
        return <Instructions></Instructions>
      case 'Home':
        return <Home></Home>
      case 'Grading':
        return <Grading></Grading>
      case 'Company':
        return <Company></Company>
      default:
        return <div></div>
    }
  }

  const playAudioBG = () => {
    // Loop indefinitely until stop() is called
    audioBg.play();
    audioBg.volume = 0.05;
    audioBg.loop = true;
 }

 const playAudioFight = () => {
  audioBg.pause();
  audioBg.currentTime = 0;
  // Loop indefinitely until stop() is called
  audioFight.play();
  audioFight.volume = 0.05;
  audioFight.loop = true;
}

const stopAudioFight = () => {
  audioFight.pause();
  audioFight.currentTime = 0;
  playAudioBG();
}

  const EncounterHandler = (randomEncounter) => {
    return randomEncounter < pokemonEncounterRate;
  }

  const movementHandler = (direction) => {
    if(direction.key != 'ArrowUp' && direction.key != 'ArrowDown' && direction.key != 'ArrowLeft' && direction.key != 'ArrowRight') return;
    if(inBattleRef.current)return;
    playAudioBG()
    let posX = posRef.current.x;
    let posY = posRef.current.y;
    let obj  = {}; 
    let randomEncounter =  Math.floor(Math.random() * 100)
    switch(direction.key){
        case 'ArrowUp':
            obj = {
                x: posX,
                y: (posY - 1 < 0) ? 0 : posY -1
            }
            posRef.current = obj;
            setPosition(obj)
        break;
        case 'ArrowDown':
            obj = {
                x: posX,
                y: (posY + 1 >= numRows - 1) ? numRows - 1 : posY + 1
            }
            posRef.current = obj;
            setPosition(obj)
        break;
        case 'ArrowLeft':
            obj = {
                x: (posX - 1 < 0) ? 0 :posX - 1,
                y: posY
            }
            posRef.current = obj;
            setPosition(obj)
        break;
        case 'ArrowRight':
            obj = {
                x: (posX + 1 >= numCells - 1) ? numCells - 1 : posX + 1,
                y: posY
            }
            posRef.current = obj;
            setPosition(obj)
        break;
    }
    if(EncounterHandler(randomEncounter)){
      inBattleRef.current = true
      setIsInBattle(true)
      setCurrentPage('')
    }
  }

  useEffect(() => {
    if(isInBattle) { playAudioFight() }
    else { stopAudioFight(); inBattleRef.current = false}
  },[isInBattle]) 

  return (
    <div className="App">
      {isInBattle ? 
      <Fight
        setIsInBattle = {setIsInBattle}
        setCurrentPage = {setCurrentPage}
      ></Fight>
      :
      <GrassGrid 
        x = {numCells} 
        y = {numRows} 
        playerPosition = {{x: position.x, y: position.y}}>
      </GrassGrid>}
      <div className={isInBattle ? 'bottom-section' : 'bottom-section-instructions'}>
        {switchPage()}
      </div>
    </div>
  );
}

export default App;
