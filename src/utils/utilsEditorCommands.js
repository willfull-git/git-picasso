// | Model - Editor Commands
// |----------
export const editorCmdFlagsModel = {
  clearAll: {
    flag: false
  },
  addRange: {
    flag:  false,
  }
}


// | Get - Editor Commands Model
// |----------
export const getEditorCommandsModel = ()=>{
  return {
    clearAll: {
      flag: false
    },
    addRange: {
      flag:  false,
    }
  }
}


// | Check - Flags
// |----------
export const performEditorCommands = (
  editorCmdFlags, cmpEditorCmdFlags,
  editorCommands, setCmpEditorCmdFlags,
  setCommitLevel, setSketch,
  cmpDate, cmpDateFormatted, cmpCommitLevel, sketch
)=>{
  // // |--- Validation
  if(JSON.stringify(editorCmdFlags) === JSON.stringify(cmpEditorCmdFlags)) return;

  // // |--- Find out Active Command
  let activeCommand;

  for(let command in editorCmdFlags){
    if(
      editorCmdFlags[command].flag
      !==
      cmpEditorCmdFlags[command].flag
    ){
      activeCommand = command;

      break;
    }
  }

  // // |--- Perform Active Command
  if( activeCommand ){
    let editorCmdFlagsCopy = Object.assign({}, editorCmdFlags);

    switch(activeCommand){
      case 'clearAll':
        setCmpEditorCmdFlags(editorCmdFlagsCopy);
        setCommitLevel(0);
        setSketch([]);

        break;
      case 'addRange':
        setCmpEditorCmdFlags(editorCmdFlagsCopy);

        editorCommands.addRange.range.forEach((v, i)=>{
          if(i===0) return;

          if( cmpDate.getTime()==v.getTime() ){
            let
              sketchCopy = sketch.slice(),
              level  = (cmpCommitLevel+5+1)%5,
              commit = {
                id: cmpDateFormatted,
                date: cmpDate,
                level: level
              };

            setCommitLevel(level);
            sketchCopy.push(commit);

            setSketch(sketchCopy);
          } 
        });

        break;
      default:
    }
  }

  return activeCommand;
}
