import React, {
  useState,
  useEffect
} from 'react';
import {
  eachDay
} from 'date-fns';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar/Calendar';


/*
 * # Data
 */

// Commits
// -----
const dataCommits = [
  
]

// Days
// -----
const dateDays = [];

// const dadeDays = eachDay();


/*
 * # APP
 */
function App(){
  const [year, setYear]       = useState(new Date);
  const [weeks, setWeeks]     = useState();
  const [commits, setCommits] = useState(dataCommits);
  const [stats, setStats]     = useState({});

  return (
    <div>
      <Calendar
        year={year}
        commits={commits}
      />
    </div>
  );
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);