import React, {
  useContext
}   from 'react';
import classes from './tools.css';

import {
  EditorCommandsContext
} from '../../context';

import {
  getEditorCommandsModel
} from '../../utils/utilsEditorCommands';

function Tools(props){
  const {editorCommands, setEditorCommands} = useContext(EditorCommandsContext);

  const handleClearAll = ()=>{
    // Log
    console.log('--| TOOLs [clear all]');
    console.log(editorCommands);
    console.log( Object.assign(getEditorCommandsModel(), {
      clearAll: {
        flag: !editorCommands.clearAll.flag
      }
    }));

    setEditorCommands( Object.assign(getEditorCommandsModel(), {
      clearAll: {
        flag: !editorCommands.clearAll.flag
      }
    }));
  }

  return (
    <div className={classes.cnt}>
      <ul>
        <li className={classes.tool}>
          <button
            onClick={handleClearAll}
          >
            Clear all
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Tools;
