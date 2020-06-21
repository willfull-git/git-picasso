import React, {
  useState,
  useEffect
} from 'react';
import classes from './stats.css';

function Stats(){
  // State..

  return (
    <div className={classes.cnt}>
      <ul className={classes.col}>
        <li className={classes.row}>
          Start/End:
        </li>
        <li className={classes.row}>
          Time period:
        </li>
        <li className={classes.row}>
          Work days:
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Chill Days:
        </li>
        <li className={classes.row}>
          Light Days:
        </li>
        <li className={classes.row}>
          Normal Days:
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Hard Days:
        </li>
        <li className={classes.row}>
          Hardcore Days:
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Author:
        </li>
        <li className={classes.row}>
          Date:
        </li>
        <li className={classes.row}>
          Likes:
        </li>
      </ul>
    </div>
  );
}

export default Stats;