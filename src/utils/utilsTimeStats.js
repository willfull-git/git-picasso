import {
  format,
  formatDistance,
  intervalToDuration,
  eachDayOfInterval
} from 'date-fns';

// Get - Start/End
// ========== 
export const getStartEnd = (sketch)=>{
  // Validation
  // ---
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

  const sortedSketch = sketch.slice().sort((first, second)=>{
    const
      firstTime  = first.date.getTime(),
      secondTime = second.date.getTime();

    return firstTime - secondTime;
  });

  start = format(sortedSketch[0].date, 'yyyy.MM.dd');
  end   = format(sortedSketch[sortedSketch.length-1].date, 'yyyy.MM.dd');
  output = start+ ' / ' + end;

  // Log
  console.log(sortedSketch);
  // console.log(format(sortedSketch[0].date, 'yyyy.MM.dd'));
  // console.log(format(sortedSketch[sortedSketch.length-1].date, 'yyyy.MM.dd'));

  return output;
}

// Get - Time Period
// ========== 
export const getTimePeriod = (sketch)=>{
  // Validation
  // ---
  if(!sketch || sketch.length<2) {
    console.log(' - sketch is too short!');

    return sketch.length;
  }

  const sortedSketch = sketch.slice().sort((first, second)=>{
    const
      firstTime  = first.date.getTime(),
      secondTime = second.date.getTime();

    return firstTime - secondTime;
  });
  
  const output = eachDayOfInterval({
    start: sortedSketch[0].date,
    end:   sortedSketch[sortedSketch.length-1].date
  })

  return output.length;
}

// Get - Work Days
// ========== 
export const getWorkDays = (sketch)=>{
  return sketch.length;
}
