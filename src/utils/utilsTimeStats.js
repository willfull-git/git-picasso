import {
  format,
  formatDistance,
  intervalToDuration,
  eachDayOfInterval
} from 'date-fns';
import {
  sketchSort
} from './utilsSketch';

// |---------------
// | Get - Start/End
// |--------------- 
export const getStartEnd = (sketch)=>{
  // |--- Validation
  if(!sketch.length){
    return 'none';
  }

  if(sketch.length===1){
    return format(sketch[0].date, 'yyyy.MM.dd');
  }

  let
    output = '',
    start  = '',
    end    = '';

  // |--- Sorting
  const sortedSketch = sketchSort(sketch);

  start  = format(sortedSketch[0].date, 'yyyy.MM.dd');
  end    = format(sortedSketch[sortedSketch.length-1].date, 'yyyy.MM.dd');
  output = start+ ' / ' + end;

  return output;
}

// |---------------
// | Get - Time Period
// |--------------- 
export const getTimePeriod = (sketch)=>{
  // |--- Validation
  if(!sketch || sketch.length<2) {
    // Log
    // console.log(' - sketch is too short!');

    return sketch.length;
  }

  // |--- Sorting
  const sortedSketch = sketchSort(sketch);  

  const output = eachDayOfInterval({
    start: sortedSketch[0].date,
    end:   sortedSketch[sortedSketch.length-1].date
  })

  return output.length;
}

// |---------------
// | Get - Work Days
// |--------------- 
export const getWorkDays = (sketch)=>{
  return sketch.length;
}

// |---------------
// | Get - Days of Type
// |--------------- 
export const getDaysOfType = (sketch, type)=>{
  // Log
  // console.log('-- get days of type');

  // |--- Validation
  // ...

  sketch = sketch.slice();

  let
    output = 0;

  sketch.forEach((v)=>{
    if(v.level===type) output+=1;
  });

  return output;
}

// |---------------
// | Get - Chill Days
// |--------------- 
export const getChillDays = (sketch)=>{
  // |--- Validation
  if(sketch.length<2){
    // Log
    // console.log('-- get chill days: sketch too short');

    return 0;
  }

  let
    output = 0,
    start  = undefined,
    end    = undefined;

  // |--- Sorting
  const sortedSketch = sketchSort(sketch);  

  start = sortedSketch[0];
  end   = sortedSketch[sortedSketch.length-1];

  // |--- Get Time Period
  const timePeriod = eachDayOfInterval({
    start: start.date,
    end:   end.date
  })

  output = timePeriod.length - sketch.length;

  return output;
}

