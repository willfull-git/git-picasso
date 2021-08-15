import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import classes from './stats.module.css';

import EditorContext from '../../../context/context-editor';

function Stats(props){
  const [editorContext] = useContext(EditorContext);

  return (
    <div className={classes.cnt}>
      <ul className={classes.col}>
        <li className={classes.row}>
          Start/End: {editorContext.sketch.stats.startEnd}
        </li>
        <li className={classes.row}>
          Time period: {editorContext.sketch.stats.timePeriod}
        </li>
        <li className={classes.row}>
          Work days: {editorContext.sketch.stats.workDays}
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Chill Days: {editorContext.sketch.stats['days-0']}
        </li>
        <li className={classes.row}>
          Light Days: {editorContext.sketch.stats['days-1']}
        </li>
        <li className={classes.row}>
          Normal Days: {editorContext.sketch.stats['days-2']}
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Hard Days: {editorContext.sketch.stats['days-3']}
        </li>
        <li className={classes.row}>
          Hardcore Days: {editorContext.sketch.stats['days-4']}
        </li>
      </ul>
      <ul className={classes.col}>
        <li className={classes.row}>
          Author: {editorContext.sketch.stats.author}
        </li>
        <li className={classes.row}>
          Date: {editorContext.sketch.stats.date}
        </li>
        <li className={classes.row}>
          Likes: {editorContext.sketch.stats.likes}
        </li>
      </ul>
    </div>
  );
}

export default Stats;
