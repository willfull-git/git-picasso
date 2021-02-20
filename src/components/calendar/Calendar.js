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

function Calendar(props){
  const [year,   setYear]       = useState(new Date);
  const [daysGrid, setDaysGrid] = useState();
  const [yearDays, setYearDays] = useState( eachDayOfInterval({
                                    start: startOfYear(year),
                                    end:   lastDayOfYear(year)
                                  }));

  // onMOUNT - set 'days grid'
  // -----
  useEffect(()=>{
    console.log('-- [mount effect] calendar');

    let yearDaysGridTmp = [];

    yearDays.map((v,i)=>{
      yearDaysGridTmp.push(
        <Day
          date={v}
          key={v.toString()}
          triggerClearAll={props.triggerClearAll}
        />);
    });

    setDaysGrid(yearDaysGridTmp);
  }, []);

  return (
    <div className={classes.cnt}>
      <div className={classes.grid}>
        {daysGrid}
      </div>
    </div>
  );
}

export default Calendar;
