import React from 'react';
import CreateTable from './CreateTable/CreateTable';

function GrassGrid(props) {
  return (
    <div className='grassTableContainer'>
      <CreateTable 
        columns={props.x} 
        rows={props.y} 
        playerPosition={props.playerPosition}>
      </CreateTable>
    </div>
  )
}

export default GrassGrid