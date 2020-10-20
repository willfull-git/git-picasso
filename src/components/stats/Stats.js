import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import classes from './stats.css';

import SketchContext from '../../context/SketchContext';
import {
  getStartEnd,
  getTimePeriod,
  getWorkDays
} from '../../utils/utilsTimeStats';

function Stats(){
  const {sketch, setSketch} = useContext(SketchContext);

  return (
    <div className={classes.cnt}>
      <ul className={classes.col}>
        <li className={classes.row}>
          Start/End: {getStartEnd(sketch)}
        </li>
        <li className={classes.row}>
          Time period: {getTimePeriod(sketch)}
        </li>
        <li className={classes.row}>
          Work days: {getWorkDays(sketch)}
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
