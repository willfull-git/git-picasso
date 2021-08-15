import React from 'react';
import classes  from './calendar.module.css';

import Day from './day/Day';

export default (props)=>{
  return (
    <div
      className={classes.cnt}
    >
      <div
        className={classes.grid}
      >
        {props.sketch.map(
          v => <Day
            date={v}
            key={v.toString()}
          />
        )};
      </div>
    </div>
  );
}
