import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import {
  getDaysInYear
} from 'date-fns';
import style    from './calendar.css';
import Day      from './day/Day';

function Calendar(props){
  const daysAmount = getDaysInYear(props.year);
  const daysArray  = [];

  for(let i=0; i<daysAmount; i++){
    daysArray.push(<Day/>);
  }

  return (
    <div className={style.calendar}>
      <div className={style.grid}>
        { daysArray }
      </div>
    </div>
  );
}

export default Calendar;