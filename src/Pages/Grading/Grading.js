import React from 'react'
import './Grading.css'
import venusaur from '../../assets/venusaur.png'

function Grading(props) {
  return (
    <div className='grading'>
        <div >Grading</div>
        <div className="container text-center">
            <div className={props.windowWidth <= 480 ? '' : 'row ' + 'align-items-start'}>
                <div className="col base-margin-top">
                    Una collezione racconta una storia unica: racconta la passione di chi ha ricercato prodotti ai quattro angoli del pianeta, di chi ha investito tempo prezioso nel consultare fonti e contattare altri appassionati.
                </div>
                <div className="col base-margin-top">
                Conosciamo l’entusiasmo dei collezionisti perche' viviamo le stesse passioni che ci hanno portato a creare un riferimento di mercato per capacita` di innovare e di cambiare le regole del gioco. AiGrading e` la scelta dei collezionisti che leggono il futuro dei propri asset.
                </div>
                {props.windowWidth <= 480 ? <div className="col base-margin-top"><div key="Back" onClick={() => {props.setCurrentPage('')}}>Back</div></div> : <></>}
                <div className='venusaur'><img src={venusaur}></img></div>
            </div>
        </div>
    </div>
  )
}

export default Grading