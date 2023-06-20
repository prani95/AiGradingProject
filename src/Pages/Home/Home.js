import React from 'react'
import './Home.css'
import blastoise from '../../assets/blastoise.png'

function Home(props) {
  return (
    <div className='home'>
        <div>Home</div>
        <div className="container text-center">
            <div className={props.windowWidth <= 480 ? '' : 'row ' + 'align-items-start'}>
                <div className="col base-margin-top">
                    AiGrading AiSystem e` una completa architettura di sistemi, applicazioni, dati e tecnologie in blockchain che supportano uno staff estremamente qualificato per rendere trasparente e unica l’esperienza di grading.
                </div>
                <div className="col base-margin-top">
                    Il nuovo riferimento nel panorama del grading per contenuti di innovazione: soluzioni realmente applicabili ad una contemporaneita' che vive di capacita' digitale, di tempo reale, di comunicazione immediata.
                </div>
                {props.windowWidth <= 480 ? <div className="col base-margin-top"><div key="Back" onClick={() => {props.setCurrentPage('')}}>Back</div></div> : <></>}
                <div className='blastoise'><img src={blastoise}></img></div>
            </div>
        </div>
    </div>
  )
}

export default Home