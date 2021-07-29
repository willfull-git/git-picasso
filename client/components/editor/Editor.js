import React, {
  useState,
  useContext
} from 'react';
import classes  from './editor.module.css';

import Calendar from './calendar/Calendar';
import Stats    from './stats/Stats';
import Tools    from './tools/Tools';

import {
  format,
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';

import {
  getEditorCommandsModel
} from '../../utils/utilsEditorCommands';

// import Context from './context';
import {EditorProvider} from '../../context/context-editor.js';

function Editor(){
  const [sketch, setSketch]                 = useState( [] );
  const [editorCommands, setEditorCommands] = useState( getEditorCommandsModel() );
  const [year, setYear]                     = useState( new Date );
  const [yearDays, setYearDays]             = useState( eachDayOfInterval({
                                                start: startOfYear(year),
                                                end:   lastDayOfYear(year)
                                              }));

  return (
    <div className={classes.cnt}>
      <div className={classes.wrapper}>
        <EditorProvider>
          <Stats sketch={sketch}/>
          <Calendar
            editorCommands={editorCommands}
            setEditorCommands={setEditorCommands}
            yearDays={yearDays}
            sketch={sketch}
            setSketch={setSketch}
          />
          <Tools
            editorCommands={editorCommands}
            setEditorCommands={setEditorCommands} 
          />
        </EditorProvider>
      </div>
    </div>
  );
}

export default Editor;
