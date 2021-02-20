import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  SketchProvider,
  ToolCommandProvider
} from './context';
import 'normalize.css';
import './styles.css';
import Editor   from './components/editor/Editor';

function App(){
  const [sketch, setSketch] = useState([]);
  const [toolCommand, setToolCommand] = useState({flag: false, command: ''});

  return (
    <SketchProvider value={{sketch, setSketch}}>
      <ToolCommandProvider value={{toolCommand, setToolCommand}}>
        <Editor/>
      </ToolCommandProvider>
    </SketchProvider>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
