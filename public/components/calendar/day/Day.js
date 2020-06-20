import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM   from 'react-dom';
import {
  format
} from 'date-fns';
import style      from './day.css';

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const [commitLevel, setCommitLevel] = useState(0);

  const dateFormatted = format(props.date, 'yyyy.MM.dd');

  function handleClick(){
    let level = (commitLevel+commitLevels.length+1)%commitLevels.length;

    setCommitLevel(level);

    props.addCommit({
      id: dateFormatted,
      date: props.date,
      level: level
    });
  }

  return (
    <div
      className={style.day}
      className={'commit-'+commitLevel}
      title={dateFormatted}
      onClick={handleClick}
    > </div>
  );
}

export default Day;