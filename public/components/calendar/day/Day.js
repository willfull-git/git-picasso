import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import style    from './day.css';

function Day(props){
  function handleClick(){
    // Log
    console.log('[click]');
  }

  return (
    <div
      className={style.day}
    > </div>
  );
}

export default Day;