import React, {
  useState,
  useEffect
} from 'react';
import {
  getDaysInYear
} from 'date-fns';
import classes  from './calendar.css';
import Day      from './day/Day';

function Calendar(props){
  const yearDays = props.yearDays;

  let yearDaysGrid = [];

  yearDays.map((v,i)=>{
    yearDaysGrid.push(<Day date={v} key={v.toString()}/>);
  })

  return (
    <div className={classes.cnt}>
      <div className={classes.grid}>
        {yearDaysGrid}
      </div>
    </div>
  );
}

export default Calendar;