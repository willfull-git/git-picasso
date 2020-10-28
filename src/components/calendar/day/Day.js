import React, {
  useState,
  useEffect
} from 'react';
import classes  from './day.css';
import {
  format
} from 'date-fns';

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const [commitLevel, setCommitLevel]         = useState(0);
  const [triggerClearAll, setTriggerClearAll] = useState(props.triggerClearAll);

  const dateFormatted = format(props.date, 'yyyy.MM.dd');

  // |--- Check if need to refresh 'commitLevel'
  if(triggerClearAll!==props.triggerClearAll){
    setCommitLevel(0);

    setTriggerClearAll(props.triggerClearAll);
  }

  // Handler - Click
  // -----
  function handleClick(e){
    let
      level  = (commitLevel+commitLevels.length+1)%commitLevels.length,
      commit = {
        id: dateFormatted,
        date: props.date,
        level: level
      };

    if(e.altKey){
      // Log
      console.log('-- [click] remove cmt');

      props.removeCommit(commit);
      level = 0;
    } else {
      // Log
      console.log('-- [click] add cmt');

      props.addCommit(commit);
    }

    setCommitLevel(level);
  }

  // Render
  // -----
  return (
    <div
      className={classes.tile+' '+'commit-'+commitLevel}
      title={dateFormatted}
      onClick={handleClick}
    > </div>
  );
}

export default Day;
