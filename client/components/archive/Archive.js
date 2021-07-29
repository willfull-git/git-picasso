import React from 'react';
import Post  from './post/Post';

import dataSketch from './dataSketch';

export default ()=>{

  // Log
  console.log('--| data sketch:');
  console.log(dataSketch);

  return (
    <>
      <h1>Archive</h1>

      <div>
        {dataSketch.map(v => <Post post={v} />)}
      </div>
    </>
  );
}
