import React, {
  useState,
  useEffect
} from 'react';
import {
  eachDay
} from 'date-fns';
import ReactDOM from 'react-dom';
import Editor   from './components/editor/Editor'


/*
 * # APP
 */
function App(){
  return (
    <div>
      <Editor/>
    </div>
  );
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);