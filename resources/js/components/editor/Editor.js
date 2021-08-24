import React, {
  useState
} from 'react';
import styles from './editor.module.css';

import Calendar from './calendar/Calendar';
import Stats    from './stats/Stats';
import Tools    from './tools/Tools';

import {
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';

import {
  getEditorCommandsModel
} from '../../utils/utilsEditorCommands';

import {EditorProvider} from '../../context/context-editor.js';

export default ()=>{
  const [sketch, setSketch]                 = useState( [] );
  const [editorCommands, setEditorCommands] = useState( getEditorCommandsModel() );
  const [year, setYear]                     = useState( new Date );
  const [yearDays, setYearDays]             = useState( eachDayOfInterval({
                                                start: startOfYear(year),
                                                end:   lastDayOfYear(year)
                                              }));

  return (
    <div className={styles.cnt}>
      <div className={styles.wrapper}>
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
