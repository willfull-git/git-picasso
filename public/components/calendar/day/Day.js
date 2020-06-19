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
      onClick={handleClick}
      className={style.day}
      data-date={props.date}
    > </div>
  );
}

export default Day;