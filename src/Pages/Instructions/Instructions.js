import React from 'react'
import './Instructions.css';
import arrows from '../../assets/arrowspc.png';
import kyogre from '../../assets/kyogre.png';
import groudon from '../../assets/groudon.png';
import rayquaza from '../../assets/rayquaza.png';

function Instructions() {
  return (
    <div className='instructions'>
        <div id='main-col'>Istruzioni
          <img id="rayquaza" src={rayquaza}/>
        </div>
        <div className="container text-center">
            <div className="row align-items-start">
                <div id='movement-col' className="col base-margin-top">
                  <img id="kyogre" src={kyogre}/>
                    Comandi
                    <div className='base-margin-top'>
                        <img src={arrows}></img>
                    </div>
                </div>
                <div id='goal-col' className="col base-margin-top">
                    Obbiettivo
                    <img id="groudon" src={groudon}/>
                    <div className='base-margin-top'>
                        Cerca il pokemon nell'erba alta e inizia la lotta per cambiare pagina.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Instructions