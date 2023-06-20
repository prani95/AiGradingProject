import './App.css';
import React,{useState,useEffect, useRef} from 'react';
import GrassGrid from './GrassGrid/GrassGrid';
import Fight from './Fight/Fight';
import Home from './Pages/Home/Home';
import Grading from './Pages/Grading/Grading';
import Pause from './Pause/Pause';
import Company from './Pages/Company/Company';
import chillAudio from "./music/ChillingTheme.mp3";
import battleAudio from "./music/BattleTheme.mp3";
import startMenuAudio from "./music/startmenu.mp3";
import GameBoy from './GameBoy/GameBoy';

function App() {

  const [position, setPosition] = useState({});

  const [windowWidth] = useState(window.innerWidth);
  const [windowHeight] = useState(window.innerHeight);

  const [isInBattle, setIsInBattle] = useState(false);
  const [isInPause, setIsInPause] = useState(false);

  const [currentPage, setCurrentPage] = useState('');

  const [audioBg] = useState(new Audio(chillAudio));
  const [audioFight] = useState(new Audio(battleAudio));
  const [audioStartMenu] = useState(new Audio(startMenuAudio));

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [pauseArray] = useState(["Pokédex","Pokémon","Borsa","AiGrading","Salva","Opzioni","Esci"]);

  const posRef = useRef(position);
  const inBattleRef = useRef(isInBattle);
  const inPauseRef = useRef(isInPause);
  const selectedRef = useRef(selectedMenu);

  const numRows = Math.floor(windowHeight / 32);
  const numCells = Math.floor(windowWidth / 32);
  const pokemonEncounterRate = 10;

  useEffect(() => {
    let coordX = Math.floor(numCells/2) - 1;
    let coordY = Math.floor(numRows/2);
    let objCoords = {
        x: coordX,
        y: coordY
    };
    posRef.current = objCoords;

    setPosition(objCoords);

    window.addEventListener('keyup', movementHandler);
  },[])

  const switchPage = () => {
    switch(currentPage){
      case 'Home':
        return <Home windowWidth = {windowWidth} setCurrentPage = {setCurrentPage}></Home>
      case 'Grading':
        return <Grading windowWidth = {windowWidth} setCurrentPage = {setCurrentPage}></Grading>
      case 'Company':
        return <Company windowWidth = {windowWidth} setCurrentPage = {setCurrentPage}></Company>
      default:
        return <div></div>
    }
  }

  //#region audioHandlers
  const playAudioBG = () => {
    audioBg.play();
    audioBg.volume = 0.05;
    audioBg.loop = true;
  }

  const playAudioFight = () => {
    audioBg.pause();
    audioBg.currentTime = 0;
    audioFight.play();
    audioFight.volume = 0.05;
    audioFight.loop = true;
  }

  const playAudioStartMenu = () => {
    audioStartMenu.pause();
    audioStartMenu.currentTime = 0;
    audioStartMenu.play();
    audioStartMenu.volume = 0.05;
  }

  const stopAudioFight = () => {
    audioFight.pause();
    audioFight.currentTime = 0;
    playAudioBG();
  }
  //#endregion

  const EncounterHandler = (randomEncounter) => {
    return randomEncounter < pokemonEncounterRate;
  }

  const pause = ()=>{
    inPauseRef.current = !inPauseRef.current;
    setIsInPause(inPauseRef.current);
    playAudioStartMenu();
  }

  const movePause = (move) => {
    switch(move){
      case 'ArrowUp':
          selectedRef.current--;
      break;
      case 'ArrowDown':
          selectedRef.current++;
      break;
    }
    if(selectedRef.current >= pauseArray.length) selectedRef.current = 0;
    if(selectedRef.current < 0) selectedRef.current = pauseArray.length - 1;
    setSelectedMenu(selectedRef.current);      
  }

  const move = (move) => {
    let obj  = {};
    let posX = posRef.current.x;
    let posY = posRef.current.y;
    switch(move){
      case 'ArrowUp':
          obj = {
              x: posX,
              y: (posY - 1 < 0) ? 0 : posY -1
          };
      break;
      case 'ArrowDown':
          obj = {
              x: posX,
              y: (posY + 1 >= numRows - 1) ? numRows - 1 : posY + 1
          };
      break;
      case 'ArrowLeft':
          obj = {
              x: (posX - 1 < 0) ? 0 :posX - 1,
              y: posY
          };
      break;
      case 'ArrowRight':
          obj = {
              x: (posX + 1 >= numCells - 1) ? numCells - 1 : posX + 1,
              y: posY
          };
      break;
    }
    posRef.current = obj;
    setPosition(obj);
    let randomEncounter =  Math.floor(Math.random() * 100);
    if(EncounterHandler(randomEncounter)){
      inBattleRef.current = true;
      setIsInBattle(true);
      setCurrentPage('');
    }
  }

  const movementHandler = (direction) => {
    if(direction.key !== 'ArrowUp' && direction.key !== 'ArrowDown' && direction.key !== 'ArrowLeft' && direction.key !== 'ArrowRight') return;
    if(inPauseRef.current) return;
    if(inBattleRef.current) return;
    playAudioBG();
    move(direction.key);
  }

  useEffect(() => {
    if(isInBattle) { playAudioFight(); }
    else { stopAudioFight(); inBattleRef.current = false;}
  },[isInBattle]) 

  return (
    <div className="App">
      <div>
        <GameBoy
          windowWidth = {windowWidth}
          windowHeight = {windowHeight}
          move = {move}
          isInPause = {isInPause}
          pauseFunction = {pause}
          movePause = {movePause}>
        </GameBoy>
        {isInBattle ? 
        <Fight
          setIsInBattle = {setIsInBattle}
          setCurrentPage = {setCurrentPage}>
        </Fight>
        :
        <>
          <Pause 
              setIsInPause = {setIsInPause}
              inPauseRef = {inPauseRef}
              pauseFunction = {pause}
              movePause = {movePause}
              pauseArray = {pauseArray}
              selectedMenu = {selectedMenu}>
          </Pause>
          <GrassGrid 
            x = {numCells} 
            y = {numRows} 
            playerPosition = {{x: position.x, y: position.y}}>
          </GrassGrid>
        </>
        }
      </div>
      <div className='bottom-section'>
        {switchPage()}
      </div>
    </div>
  );
}

export default App;
