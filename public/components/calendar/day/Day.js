import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import style    from './day.css';

function Day(props){
  const
    titleYear  = props.date.getFullYear(),
    titleMonth = props.date.getMonth()+1,
    titleDay   = props.date.getDate(),
    title      = [titleYear, titleMonth, titleDay].join(':');

  function handleClick(){
  }

  return (
    <div
      className={style.day}
      title={title}
    > </div>
  );
}

export default Day;