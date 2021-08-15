import {
  format,
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns';


// |---------------
// | Sketch - Sort
// |--------------- 
export const sketchSort = (sketch)=>{
  sketch = sketch.slice();

  sketch.sort((first, second)=>{
    const
      firstTime  = first.date.getTime(),
      secondTime = second.date.getTime();

    return firstTime - secondTime;
  });

  return sketch;
}


// |---------------
// | Sketch - Get Prev Commit
// |--------------- 
export const sketchGetPrevCommit = (sketch, commit)=>{
  // Log
  // console.log('--| [get prev. commit]');
  
  sketch = sketchSort(sketch);

  // |--- if zero 'commits'
  if(sketch.length===0){
    console.log(' - there is no commits yet');
    return null;
  }

  return sketch[sketch.length-1];
}


// |---------------
// | Add Commit
// |--------------- 
export const addCommit = (sketch, setSketch, commit)=>{
  let arr = sketch.slice();

  // |--- Update old Commit
  arr.find((e,i)=>{
    if(e.id===commit.id){
      arr.splice(i, 1);

      return true;
    }
  });

  // |--- Remove old Commit
  if(commit.level===0){
    setSketch(arr);

    return;
  } 

  // |--- Add Commit
  arr.push(commit);
  console.log(' -| [add commit] set sketch');
  console.log(arr);
  setSketch(arr);

  return commit;
} 

// |---------------
// | Add Commits Range
// |--------------- 
export const addCommitsRange = (
  sketch, setSketch,
  commit, yearDays,
  editorCommands, setEditorCommands
)=>{
  // Log
  // console.log('--| [add commits range]');

  let
    prevCommit = sketchGetPrevCommit(sketch, commit),
    newCommits = [],
    days,
    copyEditorCommands = Object.assign({}, editorCommands);

  if(!prevCommit){
    // Log
    console.warn('--| there is no commits yet');

    return;
  }

  days = eachDayOfInterval({
    start: prevCommit.date,
    end:   commit.date
  })

  days.forEach((v, i)=>{
    let
      dateFormatted = format(v, 'yyyy.MM.dd');
      commit = {
        id: dateFormatted,
        date:  v,
        level: 1
      };

    newCommits.push(commit);
  });

  copyEditorCommands.addRange.flag  = !copyEditorCommands.addRange.flag;
  copyEditorCommands.addRange.range = days;

  setEditorCommands(copyEditorCommands);

  return commit;
}


// |---------------
// | Remove Commit
// |--------------- 
export const removeCommit = (sketch, setSketch, commit)=>{
  let arr = sketch.slice();

  arr.find((e,i)=>{
    if(e.id===commit.id){
      arr.splice(i, 1);

      return true;
    }
  });

  setSketch(arr);

  return commit;
}
