import React, {
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import style    from './day.css';

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const [commitLevel, setCommitLevel] = useState(0);

  const
    titleYear  = props.date.getFullYear(),
    titleMonth = props.date.getMonth()+1,
    titleDay   = props.date.getDate(),
    title      = [titleYear, titleMonth, titleDay].join(':');

  function handleClick(){
    if(commitLevels[commitLevel+1]){
      setCommitLevel(commitLevels[commitLevel+1]);
    } else {
      setCommitLevel(0);
    }
  }

  return (
    <div
      className={style.day}
      className={'commit-'+commitLevel}
      title={title}
      onClick={handleClick}
    > </div>
  );
}

export default Day;