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
