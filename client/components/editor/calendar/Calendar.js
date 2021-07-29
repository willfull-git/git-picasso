import React, {
  useState,
  useEffect,
  useContext,
  createRef
} from 'react';
import classes  from './calendar.module.css';

import {
  ErrorBound
} from './ErrorBoundary';
import Selection from './class-selection.js'
import Day from './day/Day';

const selection = new Selection();

function Calendar(props){
  const [gridDays, setGridDays]           = useState([]);
  const [overlayEndPos, setOverlayEndPos] = useState([]);

  const refGrid   = createRef();
  const refSelect = createRef();


  // | Effect - on init
  // |----------
  useEffect(()=>{
    console.log('-- [mount effect] calendar');

    setGridDays( props.yearDays.map(
      v => <Day
        date={v}
        key={v.toString()}

        sketch={props.sketch}
        setSketch={props.setSketch}

        editorCommands={props.editorCommands}
        setEditorCommands={props.setEditorCommands}

        yearDays={props.yearDays}
      />
    ));
  }, []);

  useEffect(()=>{
    selection.refSelect = refSelect.current;
    selection.refGrid   = refGrid.current;
    selection.editorCommands    = props.editorCommands;
    selection.setEditorCommands = props.setEditorCommands;
    selection.calendarClasses   = classes;
  });


  // | Handler - Mouse Key Down
  // |----------
  const handleMouseDown = (event)=>{
    // Log
    // console.log('--| mouse key down');

    selection.handleMouseDown(event);
  }

  // | Handler - Mouse Key Up
  // |----------
  const handleMouseUp = (event)=>{
    // Log
    // console.log('--| mouse key up');

    selection.handleMouseUp(event);
  }

  // | Handle - Mouse Leave
  // |----------
  const handleMouseLeave = (event)=>{
    // Log
    // console.log('--| mouse leave');
    
    selection.handleMouseLeave(event);
  }

  // | Handle - Mouse Moove
  // |----------
  const handleMouseMove = (event)=>{
    // Log
    // console.log('--| mouse move');
    
    selection.handleMouseMove(event);
  }


  return (
    <ErrorBound>
      <div
        className={classes.cnt}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={classes.grid}
          ref={refGrid}
        >
          {gridDays}
        </div>

        <div
          className={classes.selection}
          ref={refSelect}
        >
        </div>
      </div>
    </ErrorBound>
  );
}

export default Calendar;
