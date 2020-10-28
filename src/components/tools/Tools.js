import React, {
  useContext
}   from 'react';
import classes from './tools.css';

import SketchContext from '../../context/SketchContext';

function Tools(props){
  const {sketch, setSketch} = useContext(SketchContext);

  const handleClearAll = ()=>{
    setSketch([]);
    props.clearAll();
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
