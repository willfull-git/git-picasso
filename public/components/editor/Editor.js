import React, {
  useState 
} from 'react';
import {
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
  const [year, setYear] = useState(new Date);

  let
    yearStart    = startOfYear(year),
    yearEnd      = lastDayOfYear(year),
    yearInterval = {start: yearStart, end: yearEnd},
    yearDays     = [];

  // Get all days of year
  // -----
  yearDays = eachDayOfInterval(yearInterval);

  return (
    <div className={classes.cnt}>
      <Stats/>
      <Calendar yearDays={yearDays}/>
    </div>
  );
}

export default Editor;