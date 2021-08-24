import {
  createContext,
  useReducer
} from 'react';
import {
  format,
  formatDistance,
  intervalToDuration,
  eachDayOfInterval
} from 'date-fns';

const Context = createContext();
export default Context;

// | Reducer
// |----------
const reducer = (state, action)=>{
  switch(action.type){
    case 'sketch/commit-add':
      return sketchAddCommit(state, action.payload);
    case 'sketch/commit-remove':
      return sketchRemoveCommit(state, action.payload);
    case 'selection/add':
      return selectionAdd(state, action.payload);
    default:
      return state;
  }
}


// |--- Dummy Stats Data
const initState = {
  sketch: {
    commits: [],
    stats: {
      startEnd: 'none',
      timePeriod: 0,
      workDays: 0,
      "days-0": 0,
      "days-1": 0,
      "days-2": 0,
      "days-3": 0,
      "days-4": 0,
      author: 'willfull',
      date:   'today',
      likes:  67
    },
  },
  editorCommands: {

  },
  selection: [
  ]
}


// | Provider
// |----------
export const EditorProvider = (props)=>{
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
}


// | Add Commit
// |----------
const sketchAddCommit = (oldState, commit)=>{
  console.log('--| action: add cmt');

  let state = Object.assign({}, oldState);

  // |--- Find Commit
  let i = state.sketch.commits.findIndex( e => e.id===commit.id );

  if(i>=0){
    state.sketch.commits[i] = commit;
  } else {
    state.sketch.commits.push(commit);
    state.sketch.commits = sketchSort(state.sketch.commits);
  }

  // statsGetStartEnd(state);
  statsUpdate(state);
  
  return state;
} 


// | Remove Commit
// |----------
const sketchRemoveCommit = (oldState, commit)=>{
  let state = Object.assign({}, oldState);

  // |--- Find Commit
  let i = state.sketch.commits.findIndex( e => e.id===commit.id );

  if(i>=0){
    state.sketch.commits.splice(i, 1);
  }

  // statsGetStartEnd(state);
  statsUpdate(state);

  return state;
}


const selectionAdd = (state, day)=>{
  state.selection.push(day);

  return state
}


// | Stats - Updats Stats
// |----------
const statsUpdate = (state)=>{
  statsGetStartEnd(state);

  [1,2,3,4].forEach((v)=>{
    statsGetDaysOfType(state, v);
  });

  statsGetChillDays(state);
  statsGetWorkDays(state);

  getTimePeriod(state);
}


// | Stats - Get Start/End
// |----------
const statsGetStartEnd = (oldState)=>{
  let
    state  = Object.assign({}, oldState),
    output = '';
  
  // |--- Validation
  if(!state.sketch.commits.length){
    output = 'none';
  }

  if(state.sketch.commits.length===1){
    output = format(state.sketch.commits[0].date, 'yyyy.MM.dd');
  }

  let start = '', end = '';

  // |--- Sorting
  start  = format(state.sketch.commits[0].date, 'yyyy.MM.dd');
  end    = format(state.sketch.commits[ state.sketch.commits.length-1 ].date, 'yyyy.MM.dd');
  output = start+ ' / ' + end;

  state.sketch.stats.startEnd = output;

  return state;
}


// | Stats - Get 
// |----------
const statsGetDaysOfType = (state, type)=>{
  // |--- Validation
  if(!state.sketch.commits.length){
    return 0;
  }

  return state.sketch.stats['days-'+type] = state.sketch.commits.reduce(
    (acm,v) => v.level===type? acm+=1: acm,
    0
  );
}


// | Stats - Get Work Days
// |----------
const statsGetWorkDays = (state)=>{
  state.sketch.stats.workDays = state.sketch.commits.length;
}


// | Sketch - Get Chill Days
// |----------
const statsGetChillDays = (state)=>{
  // |--- Validation
  if(state.sketch.commits.length<2){
    return 0;
  }

  let
    output = 0,
    start  = state.sketch.commits[0],
    end    = state.sketch.commits[state.sketch.commits.length-1];

  // |--- Get Time Period
  const timePeriod = eachDayOfInterval({
    start: start.date,
    end:   end.date
  })

  return state.sketch.stats['days-0'] = timePeriod.length - state.sketch.commits.length;
}


// | Sketch - Get Time Period
// |----------
const getTimePeriod = (state)=>{
  // |--- Validation
  if(!state.sketch.commits || state.sketch.commits.length<2) {
    return state.sketch.stats.timePeriod = state.sketch.length;
  }

  return state.sketch.stats.timePeriod = eachDayOfInterval({
    start: state.sketch.commits[0].date,
    end:   state.sketch.commits[state.sketch.commits.length-1].date
  }).length;
}


// | Sketch - Sort
// |----------
const sketchSort = commits => commits.sort( (first,second) => first.date.getTime()-second.date.getTime() );
