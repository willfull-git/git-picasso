import {
  // useContext
} from 'react';

import {
  SketchProvider,
  EditorCommandsProvider,
  YearDaysProvider
} from '../../context';

export default (props)=>{
  return (
    <SketchProvider value={props.sketch}>
      <EditorCommandsProvider value={props.editorCommands}>
        <YearDaysProvider value={props.yearDays}>
          { props.children }
        </YearDaysProvider>
      </EditorCommandsProvider>
    </SketchProvider>
  );
}
