import React, {
  useState,
  useEffect,
  useContext,
  createRef
} from 'react';
import classes  from './day.css';
import {
  format
} from 'date-fns';
import {
  addCommit,
  addCommitsRange,
  removeCommit
} from '../../../utils/utilsSketch.js';

import {
  SketchContext,
  EditorCommandsContext,
  YearDaysContext
} from '../../../context';

import {
  performEditorCommands,
  getEditorCommandsModel
} from '../../../utils/utilsEditorCommands';


// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const {sketch, setSketch}                 = useContext(SketchContext);
  const {editorCommands, setEditorCommands} = useContext(EditorCommandsContext);
  const {yearDays}                          = useContext(YearDaysContext);

  const [commitLevel, setCommitLevel] = useState(0);
  const [ownEditorCmdFlags, setOwntEditorCmdFlags] = useState(getEditorCommandsModel());

  const dateFormatted  = format(props.date, 'yyyy.MM.dd');
  const editorCmdFlags = getEditorCommandsModel();

  const refBox = createRef();

  for(let cmd in editorCommands){
    editorCmdFlags[cmd]['flag'] = editorCommands[cmd]['flag'];
  }

  // | Perform Editor Commands
  // |----------
  useEffect(()=>{
    performEditorCommands(
      editorCmdFlags, ownEditorCmdFlags,
      editorCommands, setOwntEditorCmdFlags,
      setCommitLevel, setSketch,
      props.date, dateFormatted, commitLevel, sketch
    );
  }, [editorCommands]);

  // | Handler - Click
  // |----------
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
      console.log('-- [day - click] remove cmt');

      removeCommit(sketch, setSketch, commit);
      setCommitLevel(0);
    } else if(e.shiftKey) {
      // Log
      console.log('-- [day - click] add cmts range');

      addCommitsRange(sketch, setSketch, commit, yearDays, editorCommands, setEditorCommands);
    } else {
      // Log
      console.log('-- [day - click] add cmt');

      addCommit(sketch, setSketch, commit);
      setCommitLevel(level);
    }
  }

  // Render
  // -----
  return (
    <div
      className={classes.tile+' '+'commit-'+commitLevel}
      title={dateFormatted}
      onClick={handleClick}
      ref={refBox}
    > </div>
  );
}

export default Day;
