import React, {
  useContext
}   from 'react';
import classes from './tools.css';

import {
  SketchContext,
  ToolCommandContext
} from '../../context';

function Tools(props){
  const {sketch, setSketch} = useContext(SketchContext);
  const {toolCommand, setToolCommand} = useContext(ToolCommandContext);

  const handleClearAll = ()=>{
    setSketch([]);
    setToolCommand({
      flag: !toolCommand.flag,
      command: 'clear-all'
    });
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
