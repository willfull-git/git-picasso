import React, {useState, useContext} from 'react';
import classes  from './editor.css';

import Calendar from '../calendar/Calendar';
import Stats    from '../stats/Stats';
import Tools    from '../tools/Tools';

// EDITOR
// =======
function Editor(){
  const [triggerClearAll, setTriggerClearAll] = useState(false);

  const toolsClearAll = ()=>{
    setTriggerClearAll(!triggerClearAll);
  };

  return (
    <div className={classes.cnt}>
      <div className={classes.wrapper}>
        <Stats/>
        <Calendar
          triggerClearAll={triggerClearAll}
        />
        <Tools
          clearAll={toolsClearAll}
        />
      </div>
    </div>
  );
}

export default Editor;
