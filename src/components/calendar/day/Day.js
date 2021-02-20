import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import classes  from './day.css';
import {
  format
} from 'date-fns';
import {
  addCommit,
  addCommits,
  removeCommit
} from '../../../utils/utilsCommit.js';

import {
  SketchContext,
  ToolCommandContext
} from '../../../context';

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const {sketch, setSketch} = useContext(SketchContext);
  const {toolCommand} = useContext(ToolCommandContext);

  const [commitLevel, setCommitLevel] = useState(0);
  const [toolCmdFlag, setToolCmdFlag] = useState(toolCommand.flag);

  const dateFormatted = format(props.date, 'yyyy.MM.dd');

  // |--- Perform Tool Commands
  if(toolCmdFlag !== toolCommand.flag){

    switch (toolCommand.command){
      case 'clear-all':
        setCommitLevel(0);
        setToolCmdFlag(!toolCmdFlag);

        break;
    }
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

      removeCommit(sketch, setSketch, commit);
      level = 0;
    } else if(e.shiftKey) {
      // Log
      console.log('-- [click] add cmts');

      addCommits(sketch, setSketch, commit);
    } else {
      // Log
      console.log('-- [click] add cmt');

      addCommit(sketch, setSketch, commit);
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
