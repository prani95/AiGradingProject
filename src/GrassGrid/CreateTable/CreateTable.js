import React, { Fragment, useEffect, useState } from 'react'
import erba from './assets/erba.png'
import logo from './assets/logoAiGrading.png'
import './CreateTable.css';

function CreateTable(props) {

    const disegnaTabella = () => {
      const tableRows = [];
      const rowCells = [];
     
      for (let x = 0; x < props.rows; x++) {
        tableRows.push({key: x})
      }
      
      for (let y = 0; y < props.columns; y++) {
        rowCells.push({key: y, img: erba});
      }
      
      let tabella = tableRows.map(riga => {
        return <tr key={riga.key}>
          {creaRighe(rowCells, riga.key)}
        </tr>
      })
      
      return tabella;
    }  

    const testCenter = (x, y) => x === props.playerPosition.x && y === props.playerPosition.y ? true : false;

    const creaRighe = (rowCells, currentKeyRow) => {
      return rowCells.map((cella, index) => {
        return <td className='erba' key={cella.key} id={cella.key} >
                  <div key={(cella.key + index)} className='noheight'>
                    <img className='tile' src={testCenter(cella.key, currentKeyRow) ? logo : erba}></img>
                  </div>
                </td>
      })
    }

    return (
      <table className="table">
        <tbody>
          {disegnaTabella()}
        </tbody>
      </table>
    );
}

export default CreateTable