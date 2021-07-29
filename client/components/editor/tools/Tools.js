import React, {
  useContext
}   from 'react';
import classes from './tools.module.css';

import {
  getEditorCommandsModel
} from '../../../utils/utilsEditorCommands';

function Tools(props){
  // | Handle - Clear All
  // |----------
  const handleClearAll = ()=>{
    // Log
    console.log('--| TOOLs [clear all]');

    props.setEditorCommands( Object.assign(getEditorCommandsModel(), {
      clearAll: {
        flag: !props.editorCommands.clearAll.flag
      }
    }));
  }

  // | Handle - Unselect
  // |----------
  const handleUnselect = ()=>{
    // Log
    console.log('--| TOOLs [unselect]');

    let copyEditorCommands = Object.assign({}, props.editorCommands);

    copyEditorCommands.unselect.flag       = !copyEditorCommands.unselect.flag;
    copyEditorCommands.select.overlayPos   = {};
    copyEditorCommands.select.selectedDays = [];

    props.setEditorCommands(copyEditorCommands);
  }

  // | Handdle - Selection add commit
  // |----------
  const handleSelectionAddCommit = ()=>{
    // Log
    console.log('--| [selection add commit]');

    let copyEditorCommands = Object.assign({}, props.editorCommands);

    copyEditorCommands.editSelection.flag = !copyEditorCommands.editSelection.flag;
    copyEditorCommands.editSelection.mode = 'addCommit';

    props.setEditorCommands(copyEditorCommands);
  }

  // | Handdle - Selection remove commit
  // |----------
  const handleSelectionRemoveCommit = ()=>{
    // Log
    console.log('--| [selection remove commit]');

    let copyEditorCommands = Object.assign({}, props.editorCommands);

    copyEditorCommands.editSelection.flag = !copyEditorCommands.editSelection.flag;
    copyEditorCommands.editSelection.mode = 'removeCommit';

    props.setEditorCommands(copyEditorCommands);
  }

  return (
    <div className={classes.cnt}>
      <ul className={classes['tools-left']}>
        <li>
          <button
            onClick={handleClearAll}
          >
            Clear all
          </button>
        </li>
      </ul>

      <ul className={classes['tools-right']}>
        { !props.editorCommands.select.selectedDays.length || (
          <>
          <li>
            <button
              onClick={handleSelectionAddCommit}
            >
              Add Commit
            </button>
          </li>
          <li>
            <button
              onClick={handleSelectionRemoveCommit}
            >
              Remove Commit
            </button>
          </li>
          <li>
            <button
              onClick={handleUnselect}
            >
              Unselect all
            </button>
          </li>
          </>)
        }
      </ul>
    </div>
  );
}

export default Tools;
