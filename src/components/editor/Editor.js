import React, {useState, useContext} from 'react';
import classes  from './editor.css';
import Sketch   from '../../context/Sketch';
import Calendar from '../calendar/Calendar';
import Stats    from '../stats/Stats';

// EDITOR
// =======
function Editor(){
  const {sketch, setSketch} = useContext(Sketch);

  return (
    <div className={classes.cnt}>
      <div className={classes.wrapper}>
         <Stats/>
         <Calendar/>
      </div>
    </div>
  );
}

export default Editor;
