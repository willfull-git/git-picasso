import React, {
  useState,
  useEffect,
  useContext,
  createRef
} from 'react';
import classes  from './day.module.css';
import {
  format
} from 'date-fns';
import {
  addCommit,
  addCommitsRange,
  removeCommit
} from '../../../../utils/utilsSketch.js';

import {
  getEditorCommandsModel
} from '../../../../utils/utilsEditorCommands';

// import {
  // SketchContext,
  // EditorCommandsContext,
  // YearDaysContext
// } from '../../../../context';
import EditorContext from '../../../../context/context-editor.js';

const mapCommitClasses = {
  '0': classes['commit-0'],
  '1': classes['commit-1'],
  '2': classes['commit-2'],
  '3': classes['commit-3'],
  '4': classes['commit-4'],
}

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

function Day(props){
  // |--- State
  const [commitLevel, setCommitLevel] = useState(0);
  const [selected, setSelected]       = useState(false);
  const [ownEditorCmdFlags, setOwnEditorCmdFlags] = useState(getEditorCommandsModel());

  const dateFormatted  = format(props.date, 'yyyy.MM.dd');
  const editorCmdFlags = props.editorCommands;

  const refBox = createRef();

  // |--- Context
  // const [sketch, setSketch ]                = useContext(SketchContext);
  // const [editorCommands, setEditorCommands] = useContext(EditorCommandsContext);
  // const yearDays                            = useContext(YearDaysContext);
  const [state, dispatch]                   = useContext(EditorContext);

  // Log
  console.log('--| Day rerendered');

  // | Perform Editor Commands
  // |----------
  // useEffect(()=>{
    // // |--- Find out Active Command
    // let activeCommand;

    // for(let command in editorCmdFlags){
      // if(
        // editorCmdFlags[command].flag
        // !==
        // ownEditorCmdFlags[command].flag
      // ){
        // activeCommand = command;

        // break;
      // }
    // }

    // // | Helper - Is Intersect
    // // |----------
    // const helperIsIntersect = (dayPos, selectPos)=>{
      // let output = 
        // dayPos.left+dayPos.width < selectPos.left+selectPos.width
        // &&
        // dayPos.left > selectPos.left
        // &&
        // dayPos.top+dayPos.height < selectPos.top+selectPos.height 
        // &&
        // dayPos.top > selectPos.top;

      // return output;
    // }

    // // Log
    // console.log('--| Active Command:');
    // console.log(activeCommand);

    // // |--- Perform Active Command
    // if( activeCommand ){
      // let
        // editorCmdFlagsCopy = Object.assign({}, editorCmdFlags),
        // copyEditorCommands = Object.assign({}, props.editorCommands);

      // switch(activeCommand){
        // case 'clearAll':
          // setOwnEditorCmdFlags(editorCmdFlagsCopy);
          // setCommitLevel(0);
          // props.setSketch([]);

          // break;
        // case 'addRange':
          // setOwnEditorCmdFlags(editorCmdFlagsCopy);

          // props.editorCommands.addRange.range.forEach((v, i)=>{
            // if(i===0) return;

            // if( cmpDate.getTime()==v.getTime() ){
              // let
                // sketchCopy = props.sketch.slice(),
                // level  = (cmpCommitLevel+5+1)%5,
                // commit = {
                  // id: cmpDateFormatted,
                  // date: cmpDate,
                  // level: level
                // };

              // setCommitLevel(level);
              // sketchCopy.push(commit);

              // props.setSketch(sketchCopy);
            // } 
          // });

          // break;
        // case 'select':
          // setOwnEditorCmdFlags(editorCmdFlagsCopy);

          // let
            // dayPos    = refBox.current.getBoundingClientRect(),
            // selectPos = props.editorCommands.select.overlayPos;

          // // |--- Selection Mode
          // switch(props.editorCommands.select.mode){
            // case 'new':
              // // Log
              // // console.log('--| mode: new');

              // if(helperIsIntersect(dayPos, selectPos)){
                // copyEditorCommands.select.selectedDays.push({date: dateFormatted});
                // setSelected(true);
              // } else {
                // copyEditorCommands.select.selectedDays.forEach((v, i)=>{
                  // if(v.date===dateFormatted){
                    // copyEditorCommands.select.selectedDays.splice(i, 1);
                  // }
                // });
                // setSelected(false);
              // };
              // break;
            // case 'add':
              // // Log
              // // console.log('--| mode: add');

              // if(helperIsIntersect(dayPos, selectPos)){
                // copyEditorCommands.select.selectedDays.push({date: dateFormatted});
                // setSelected(true);
              // }
              // break;
            // case 'remove':
              // // Log
              // // console.log('--| mode: remove');

              // if(helperIsIntersect(dayPos, selectPos)){
                // copyEditorCommands.select.selectedDays.forEach((v, i)=>{
                  // if(v.date===dateFormatted){
                    // copyEditorCommands.select.selectedDays.splice(i, 1);
                  // }
                // });
                // setSelected(false);
              // }
              // break;
          // }

          // props.setEditorCommands(Object.assign({}, props.editorCommands));

          // break;
        // case 'unselect':
          // // console.log('--| [unselect]');

          // if(selected){
            // setSelected(false);
          // }
          // break;
        // case 'editSelection':
          // setOwnEditorCmdFlags(editorCmdFlagsCopy);

          // let level = (commitLevel+commitLevels.length+1)%commitLevels.length;

          // // Log
          // // console.log('--| [edit selection]');

          // switch(props.editorCommands.editSelection.mode){
            // case 'addCommit':
              // // Log
              // // console.log(' -| add');
              // copyEditorCommands.select.selectedDays.forEach((v, i)=>{
                // if(v.date===dateFormatted){
                  // setCommitLevel(level);
                // }
              // });
              // break;
            // case 'removeCommit':
              // // Log
              // // console.log(' -| remove');
              // copyEditorCommands.select.selectedDays.forEach((v, i)=>{
                // if(v.date===dateFormatted){
                  // setCommitLevel(commitLevel>0? commitLevel-1: commitLevel);
                // }
              // });
              // break;
          // } 

          // break;
        // default:
      // }
    // }
  // }, [props.editorCommands]);

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
      // console.log('-- [day - click] remove cmt');

      setCommitLevel(0);
      dispatch({type: 'sketch/commit-remove', payload: commit});
    } else if(e.shiftKey) {
      // Log
      // console.log('-- [day - click] add cmts range');

      // addCommitsRange(props.sketch, props.setSketch, commit, props.yearDays, props.editorCommands, props.setEditorCommands);
    } else {
      // Log
      // console.log('-- [day - click] add cmt');
      
      setCommitLevel(level);
      dispatch({type: 'sketch/commit-add', payload: commit});
    }
  }

  // Render
  // -----
  return (
    <div
      className={
        classes.tile+' '+mapCommitClasses[commitLevel]
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
