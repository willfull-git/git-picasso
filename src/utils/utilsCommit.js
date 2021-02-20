import {
  sketchGetPrevCommit
} from './utilsSketch';

// | Add Commit
// |----------
export const addCommit = (sketch, setSketch, commit)=>{
  // Log
  console.log('-- add commit()');

  let arr = sketch.slice();

  // Update old Commit
  arr.find((e,i)=>{
    if(e.id===commit.id){
      arr.splice(i, 1);

      return true;
    }
  });

  // Remove old Commit
  if(commit.level===0){
    setSketch(arr);

    return;
  } 

  // Add Commit
  arr.push(commit);
  setSketch((sketch)=>{
    return arr;
  });

  return commit;
} 

// | Add Commits
// |----------
export const addCommits = (sketch, setSketch, commit)=>{
  // Log
  console.log('-- add commits()');

  addCommit(sketch, setSketch, commit);

  setSketch((sketch)=>{
    let prevCommit = sketchGetPrevCommit(sketch, commit);
    return sketch;
  })

  return commit;
}

// | Remove Commit
// |----------
export const removeCommit = (sketch, setSketch, commit)=>{
  // Log
  console.log('-- remove commit()');

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
