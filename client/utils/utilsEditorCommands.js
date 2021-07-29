// | Model - Editor Commands
// |----------
export const editorCmdFlagsModel = {
  clearAll: {
    flag: false
  },
  addRange: {
    flag: false,
  },
  select: {
    flag: false,
    overlayPos: {},
    selectedDays: [],
    mode: 'new'
  },
  unselect: {
    flag: false
  },
  editSelection: {
    flag: false,
    mode: ''
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
      flag: false,
    },
    select: {
      flag: false,
      overlayPos: {},
      selectedDays: [],
      mode: 'new'
    },
    unselect: {
      flag: false
    },
    editSelection: {
      flag: false,
      mode: ''
    }
  }
}
