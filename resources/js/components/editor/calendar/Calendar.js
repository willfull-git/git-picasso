import React, {
  useState,
  useEffect,
  createRef
} from 'react';
import { ErrorBound } from './ErrorBoundary';
import styles from './calendar.css';
import Day from './day/Day';
import {
  atom,
  selector,
  atomFamily,
  useRecoilState,
  useSetRecoilState
} from 'recoil';
import {
  daysAtomFamily,
  dayIdsAtom
} from './state.js';
import {
  startOfYear,
  lastDayOfYear,
  eachDayOfInterval
} from 'date-fns'

export default ({year})=>{
  const [dayIds, setDayIds] = useRecoilState(dayIdsAtom);
  const [yearDays, setYearDays] = 
    useState( eachDayOfInterval({
      start: startOfYear(year),
      end:   lastDayOfYear(year)
    }));

  // |--- Debug
  console.log('--| render');
  console.log(dayIds);


  // |--- Create days state
  useEffect(()=>{
    const days = yearDays.map((date, i)=>{

      return {
        date: date
      }
    });

    setDayIds(days);
  }, [year]);


  // |--- Render
  return (
    <ErrorBound>
      <div
        className={styles.cnt}
      >
        <div
          className={styles.grid}
        >
          {/* days */}
        </div>

        <div
          className={styles.selection}
        >
        </div>
      </div>
    </ErrorBound>
  )
}
