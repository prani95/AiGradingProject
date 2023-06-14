import React from 'react'
import './Company.css'
import charizard from '../../assets/charizard.png'

function Company(props) {
  return (
    <div className='company'>
        <div>Company</div>
        <div className="container text-center">
            <div className={props.windowWidth <= 480 ? '' : 'row ' + 'align-items-start'}>
                <div className="col base-margin-top">
                    Uno staff preparato che punta ai massimi livelli di eccellenza nella gradazione dei collezionabili. AiGrading e` un team dedicato che ha un obiettivo comune: essere artefice della soddisfazione dei collezionisti grazie ad una piattaforma integrata unica nel suo genere, progettata per aumentare il valore delle collezioni.
                </div>
                <div className="col base-margin-top">
                    Un coinvolgimento costante delle nostre persone ci permette di fornire un servizio puntuale ed accurato che trasferisce valore alle collezioni. Un valore che va oltre il processo di grazione e che e` fatto di supporto puntuale, di ricerca e sviluppo, di soluzioni differenziate per la protezione dei collezionabili e di piattaforme informatiche innovative.
                </div>
                {props.windowWidth <= 480 ? <div className="col base-margin-top"><div key="Back" onClick={() => {props.setCurrentPage('')}}>Back</div></div> : <></>}
                <div className='charizard'><img src={charizard}></img></div>
            </div>
        </div>
    </div>
  )
}

export default Company