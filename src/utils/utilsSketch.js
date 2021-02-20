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
  // console.log('-- sketch get prev commit');

  sketch = sketchSort(sketch);

  // Log
  console.log(sketch.length);

  // |--- if zero 'commits'
  if(sketch.length===0){
    console.log(' - there is no commits yet');
    return null;
  }

  // |--- if only one 'commit'
  if(sketch.length===1){
    console.log(' - there is only one commit');
    return sketch[0];
  }

  // |--- normal execution
  let prevCommit;

  for(let i=0; i<sketch.length; i++){
    if(sketch[i].date==commit.date){
      prevCommit = sketch[i-1];
      break;
    }
  }

  // Log
  console.log(' - prev cmt');
  console.log(prevCommit);

  return prevCommit;
}
