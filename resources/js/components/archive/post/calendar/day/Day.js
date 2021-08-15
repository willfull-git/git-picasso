import React from 'react';
import classes  from './day.module.css';
import {
  format
} from 'date-fns';

const mapCommitClasses = {
  '0': classes['commit-0'],
  '1': classes['commit-1'],
  '2': classes['commit-2'],
  '3': classes['commit-3'],
  '4': classes['commit-4'],
}

// DATA - Commit Levels
const commitLevels = [0,1,2,3,4];

export default function(props){
  const dateFormatted  = format(props.date, 'yyyy.MM.dd');


  // Render
  // -----
  return (
    <div
      className={
        classes.tile+' '+mapCommitClasses[props.commitLevel]
      }
      title={dateFormatted}
    > </div>
  );
}
