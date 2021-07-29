import React from 'react';
import Calendar from './calendar/Calendar';

export default (props)=>{
  return (
    <div>
      <Calendar sketch={props.post.sketch} />
    </div>
  );
}
