import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
   SketchProvider
} from './context/SketchContext';
import Editor   from './components/editor/Editor'

function App(){
  const [sketch, setSketch] = useState([]);

  return (
    <SketchProvider value={{sketch, setSketch}}>
      <Editor/>
    </SketchProvider>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
