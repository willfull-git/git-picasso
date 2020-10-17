import React, {
  useState 
} from 'react';
import {
  format,
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';
import classes  from './editor.css';
import Calendar from '../calendar/Calendar';
import Stats    from '../stats/Stats';

// EDITOR
// =======
function Editor(){
  const [year, setYear]     = useState(new Date);
  const [sketch, setSketch] = useState([]);

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

  return (
    <div className={classes.cnt}>
      <Stats/>
      <Calendar yearDays={yearDays} addCommit={addCommit} removeCommit={removeCommit}/>
    </div>
  );
}

export default Editor;