import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {
  SketchProvider,
  EditorCommandsProvider,
  YearDaysProvider
} from './context';

import {
  format,
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';

import 'normalize.css';
import './styles.css';
import Editor   from './components/editor/Editor';
import {
  getEditorCommandsModel
} from './utils/utilsEditorCommands';


function App(){
  const [sketch, setSketch]                 = useState( [] );
  const [editorCommands, setEditorCommands] = useState( getEditorCommandsModel() );
  const [year, setYear]                     = useState( new Date );
  const [yearDays, setYearDays]             = useState( eachDayOfInterval({
                                                start: startOfYear(year),
                                                end:   lastDayOfYear(year)
                                              }));

  return (
    <YearDaysProvider value={{yearDays, setYearDays}}>
      <SketchProvider value={{sketch, setSketch}}>
        <EditorCommandsProvider value={{editorCommands, setEditorCommands}}>
          <Editor/>
        </EditorCommandsProvider>
      </SketchProvider>
    </YearDaysProvider>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
