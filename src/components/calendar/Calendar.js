import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import classes  from './calendar.css';

import {
  YearDaysContext
} from '../../context/index.js';

import Day      from './day/Day';

function Calendar(props){
  const {yearDays} = useContext(YearDaysContext);

  const [gridDays, setGridDays] = useState([]);

  // | Effect - on init
  // |----------
  useEffect(()=>{
    console.log('-- [mount effect] calendar');

    let yearDaysGridTmp = [];

    yearDays.map((v,i)=>{
      yearDaysGridTmp.push(
        <Day
          date={v}
          key={v.toString()}
        />);
    });

    setGridDays(yearDaysGridTmp);
  }, []);

  return (
    <div className={classes.cnt}>
      <div className={classes.grid}>
        {gridDays}
      </div>
    </div>
  );
}

export default Calendar;
