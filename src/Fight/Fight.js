import React, { useState } from 'react'
import './Fight.css';
import meBG from './assets/francescosolaBG.png';
import mePokemon from './assets/Me.png';
import logo from '../GrassGrid/CreateTable/assets/logoAiGrading.png';
import selectAudio from "../music/selectsound.mp3";

const baseTextInBox = "Parte la sfida con Francesco Sola";
const createTextInBox = "Francesco Sola inizia a digitare codice creando la pagina ";
const functionNotEnabledText = "Francesco Sola non obbedisce";
const EscapeRate = 30;

function Fight(props) {

    const [textInBox, setTextInBox] = useState(baseTextInBox)
    const [detailsText, setDetailsText] = useState('')
    const [moveBox, setMoveBox] = useState(['Lotta','Zaino','Pkmn','Fuga'])

    const [audioSelect, setAudioSelect] = useState(new Audio(selectAudio));

    const [inputDisabled, setInputDisabled] = useState(false)

    const creaBox = (moveBox) => {
        return moveBox.map((move, index) => {
            return <div key={index} onClick={inputDisabled ? () => {} : () => handleMove(move)} onMouseEnter={() => handleDescription(move)} onMouseOut={()=>handleDescription()}>{move}</div>  
        }
    )}

    const escapeHandler = (randomEscape) => {
        return randomEscape >= EscapeRate;
    }

      const playAudioSelect = () => {
        audioSelect.pause();
        audioSelect.currentTime = 0;
        audioSelect.play();
        audioSelect.volume = 0.1;
    }

    const handleDescription = (move = null) => {
        switch(move){
            case 'Lotta':
                setDetailsText('Scegli la mossa da utilizzare');
                break;
            case 'Zaino':
                setDetailsText('Controlla cosa hai nello Zaino');
                break;
            case 'Pkmn':
                setDetailsText('Cambia Pokemon con cui lottare');
                break;
            case 'Fuga':
                setDetailsText('Scappa dalla lotta');
                break;
            case 'Back':
                setDetailsText('Torna al menu` precedente');
                break;
            case null:
                    setDetailsText('');
                break;
            default:
                setDetailsText('Visualizza la pagina '+move);
                break;
        }
    }

    const handleMove = (move) => {
        playAudioSelect();
        switch(move){
            case 'Lotta':
                setMoveBox(['Home','Grading','Company','Back'])
                break;
            case 'Fuga':
                let randomEscape =  Math.floor(Math.random() * 100)
                if(escapeHandler(randomEscape)){
                    setInputDisabled(true);
                    setTextInBox("Scampato Pericolo!")
                    setTimeout(() => { props.setCurrentPage('Instructions');props.setIsInBattle(false); setInputDisabled(false);}, 2000)
                }else{
                    setInputDisabled(true)
                    setTextInBox("Non si scappa!")
                    setTimeout(() => { setTextInBox(baseTextInBox); setInputDisabled(false);}, 2000)
                }
                break;
            case 'Back':
                setMoveBox(['Lotta','Zaino','Pkmn','Fuga'])
                break;
            case 'Home':
                setTextInBox(createTextInBox + "Home")
                props.setCurrentPage('Home')
                break;
            case 'Grading':
                setTextInBox(createTextInBox + "Grading")
                props.setCurrentPage('Grading')
                break;
            case 'Company':
                setTextInBox(createTextInBox + "Company")
                props.setCurrentPage('Company')
                break;
            case 'Zaino':
            case 'Pkmn':
                setInputDisabled(true)
                setTextInBox(functionNotEnabledText)
                setTimeout(() => { setTextInBox(baseTextInBox); setInputDisabled(false);}, 2000)
                break;
            
        }
    }

  return (
    <div className='Fight'>
        <div className='backgroundScenario'>
            <div className='bgBattle'></div>
        </div>
        <div className='pokemonFoeBG'><img src={meBG}></img></div>
        <div className='pokemonFoe'><img src={mePokemon}></img></div>
        <div className='currentPokemon'><img src={logo}></img></div>
        <div className='textBox'>{textInBox}</div>
        <div className='details'>{detailsText}

        </div>
        <div className='options'>
            {creaBox(moveBox)}
        </div>
    </div>
  )
}

export default Fight