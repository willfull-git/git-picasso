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
  getEditorCommandsModel
} from '../../../utils/utilsEditorCommands';


// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  const {sketch, setSketch}                 = useContext(SketchContext);
  const {editorCommands, setEditorCommands} = useContext(EditorCommandsContext);
  const {yearDays}                          = useContext(YearDaysContext);

  const [commitLevel, setCommitLevel] = useState(0);
  const [selected, setSelected]       = useState(false);
  const [ownEditorCmdFlags, setOwnEditorCmdFlags] = useState(getEditorCommandsModel());

  const dateFormatted  = format(props.date, 'yyyy.MM.dd');
  const editorCmdFlags = getEditorCommandsModel();

  const refBox = createRef();

  for(let cmd in editorCommands){
    editorCmdFlags[cmd]['flag'] = editorCommands[cmd]['flag'];
  }

  // | Perform Editor Commands
  // |----------
  useEffect(()=>{
    // // |--- Validation
    if(JSON.stringify(editorCmdFlags) === JSON.stringify(ownEditorCmdFlags)) return;

    // // |--- Find out Active Command
    let activeCommand;

    for(let command in editorCmdFlags){
      if(
        editorCmdFlags[command].flag
        !==
        ownEditorCmdFlags[command].flag
      ){
        activeCommand = command;

        break;
      }
    }

    // // |--- Perform Active Command
    if( activeCommand ){
      let editorCmdFlagsCopy = Object.assign({}, editorCmdFlags);

      switch(activeCommand){
        case 'clearAll':
          setOwnEditorCmdFlags(editorCmdFlagsCopy);
          setCommitLevel(0);
          setSketch([]);

          break;
        case 'addRange':
          setOwnEditorCmdFlags(editorCmdFlagsCopy);

          editorCommands.addRange.range.forEach((v, i)=>{
            if(i===0) return;

            if( cmpDate.getTime()==v.getTime() ){
              let
                sketchCopy = sketch.slice(),
                level  = (cmpCommitLevel+5+1)%5,
                commit = {
                  id: cmpDateFormatted,
                  date: cmpDate,
                  level: level
                };

              setCommitLevel(level);
              sketchCopy.push(commit);

              setSketch(sketchCopy);
            } 
          });

          break;
        case 'select':
          setOwnEditorCmdFlags(editorCmdFlagsCopy);

          let
            dayPos    = refBox.current.getBoundingClientRect(),
            selectPos = editorCommands.select.overlayPos;

          if(
            dayPos.left+dayPos.width < selectPos.left+selectPos.width
            &&
            dayPos.left > selectPos.left
            &&
            dayPos.top+dayPos.height < selectPos.top+selectPos.height 
            &&
            dayPos.top > selectPos.top
          ){
            let copyEditorCommands = Object.assign({}, editorCommands);

            switch(editorCommands.select.mode){
              case 'new':
                copyEditorCommands.select.selectedDays.push({date: dateFormatted});
                setSelected(true);
                break;
              case 'add':
                copyEditorCommands.select.selectedDays.push({date: dateFormatted});
                setSelected(true);
                break;
              case 'remove':
                copyEditorCommands.select.selectedDays.forEach((v, i)=>{
                  if(v.date===dateFormatted){
                    copyEditorCommands.select.selectedDays.splice(i, 1);
                  }
                });
                setSelected(false);
                break;
            }

            setEditorCommands(copyEditorCommands);
          } else if(selected && editorCommands.select.mode==='new') {
            setSelected(false);
          }

          break;
        case 'unselect':
          // console.log('--| [unselect]');

          if(selected){
            setSelected(false);
          }
          break;
        default:
      }
    }
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
      className={
        classes.tile+' '+'commit-'+commitLevel
        + ' ' +
        (selected? classes.selected: '')
      }
      title={dateFormatted}
      onClick={handleClick}
      ref={refBox}
    > </div>
  );
}

export default Day;
