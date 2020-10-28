import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import classes  from './calendar.css';

import {
  format,
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';
import Day      from './day/Day';
import Sketch   from '../../context/SketchContext';

function Calendar(props){
  const [year,   setYear]   = useState(new Date);
  const {sketch, setSketch} = useContext(Sketch);

  let
    yearStart    = startOfYear(year),
    yearEnd      = lastDayOfYear(year),
    yearInterval = {start: yearStart, end: yearEnd},
    yearDays     = [];

  // Add Commit
  // -----
  function addCommit(commit){
    let arr = sketch.slice();

    // Update old Commit
    arr.find((e,i)=>{
      if(e.id===commit.id){
        arr.splice(i, 1);

        return true;
      }
    });

    // Remove old Commit
    if(commit.level===0){
      setSketch(arr);

      return;
    } 

    // Add Commit
    arr.push(commit);
    setSketch(arr);
  } 

  // Remove Commit
  // -----
  function removeCommit(commit){
    let arr = sketch.slice();

    arr.find((e,i)=>{
      if(e.id===commit.id){
        arr.splice(i, 1);

        return true;
      }
    });

    setSketch(arr);
  }

  // Get all days of year
  // -----
  yearDays = eachDayOfInterval(yearInterval);

  let yearDaysGrid = [];

  yearDays.map((v,i)=>{
    yearDaysGrid.push(
      <Day
        date={v}
        key={v.toString()}
        addCommit={addCommit}
        removeCommit={removeCommit}
        triggerClearAll={props.triggerClearAll}
      />);
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
