import React from 'react'
import './Instructions.css';
import arrows from '../../assets/arrowspc.png';
import kyogre from '../../assets/kyogre.png';
import groudon from '../../assets/groudon.png';
import rayquaza from '../../assets/rayquaza.png';

function Instructions() {
  return (
    <div className='instructions'>
        <div id='main-col'>Instructions
          <img id="rayquaza" src={rayquaza}/>
        </div>
        <div className="container text-center">
            <div className="row align-items-start">
                <div id='movement-col' className="col base-margin-top">
                  <img id="kyogre" src={kyogre}/>
                    Movement
                    <div className='base-margin-top'>
                        <img src={arrows}></img>
                    </div>
                </div>
                <div id='goal-col' className="col base-margin-top">
                    Goal
                    <img id="groudon" src={groudon}/>
                    <div className='base-margin-top'>
                        Find the Pokemon in the wild and battle it to change the page.
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Instructions