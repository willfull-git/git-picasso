import React from 'react';
import {
  eachDay
} from 'date-fns';
import ReactDOM from 'react-dom';
import Editor   from './components/editor/Editor'

function App(){
  return (
    <>
      <Editor/>
    </>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
