import React, {
  useState,
  useEffect,
  useContext,
  createRef
} from 'react';
import classes  from './calendar.css';

import {
  YearDaysContext
} from '../../context/index.js';

import {
  ErrorBound
} from './ErrorBoundary';
import Day from './day/Day';

function Calendar(props){
  const {yearDays} = useContext(YearDaysContext);

  const [gridDays, setGridDays] = useState([]);

  const refGrid    = createRef();
  const refOverlay = createRef();

  let overlayStartPoint = {};

  // | Effect - on init
  // |----------
  useEffect(()=>{
    console.log('-- [mount effect] calendar');

    let yearDaysGridTmp = [];

    yearDays.map((v,i)=>{
      yearDaysGridTmp.push(
        <Day
          date={v}
          key={v.toString()}
        />);
    });

    setGridDays(yearDaysGridTmp);
  }, []);


  // | Handler - Mouse Key Down
  // |----------
  function handleMouseDown(event){
    // Log
    console.log('--| mouse key down');

    event.preventDefault();

    let
      cursorX = event.clientX,
      cursorY = event.clientY,
      gridPos = refGrid.current.getBoundingClientRect(),
      gridX   = gridPos.x,
      gridY   = gridPos.y;

    // Log
    // console.log(gridPos);

    // Log
    // console.log(' -| clientX: '+ event.clientX);
    // console.log(' -| clientY: '+ event.clientY);

    // Log
    // console.log(' -| gridX: ' +gridX);
    // console.log(' -| gridY: ' +gridY);

    // Log
    // console.log(' -| x: ' +(cursorX-gridX));
    // console.log(' -| y: ' +(cursorY-gridY));

    refOverlay.current.style.height = '1px';
    refOverlay.current.style.width  = '1px';
    refOverlay.current.style.top    = (cursorY-gridY)+'px';
    refOverlay.current.style.left   = (cursorX-gridX)+'px';

    overlayStartPoint = {
      y: cursorY-gridY,
      x: cursorX-gridX
    };

    // Log
    console.log(overlayStartPoint);

    refOverlay.current.style.visibility = 'visible';
  }

  // | Handler - Mouse Key Up
  // |----------
  function handleMouseUp(event){
    // Log
    console.log('--| mouse key up');

    event.preventDefault();

    refOverlay.current.style.visibility = 'hidden';
  }

  // | Handle - Mouse Moove
  // |----------
  function handleMouseMove(){
    // Log
    // console.log('--| mouse move');

    let
      cursorX    = event.clientX,
      cursorY    = event.clientY,
      overlayPos = refOverlay.current.getBoundingClientRect(),
      overlayX   = overlayPos.x,
      overlayY   = overlayPos.y,
      gridPos    = refGrid.current.getBoundingClientRect(),
      gridX      = gridPos.x,
      gridY      = gridPos.y;

    // |--- Horizontal Move
    if(cursorX>overlayStartPoint.x+gridX){
      // Log
      // console.log(' -| [overlay] stick to left');

      refOverlay.current.style.left  = overlayStartPoint.x+'px';
      refOverlay.current.style.right = 'unset';
    } else {
      // Log
      // console.log(' -| [overlay] stick to right');

      refOverlay.current.style.right = (refGrid.current.offsetWidth-overlayStartPoint.x)+'px';
      refOverlay.current.style.left  = 'unset';
    }

    // |--- Vertical Move
    if(cursorY>gridY+overlayStartPoint.y){
      // Log
      // console.log(' -| [overlay] stick to top');

      refOverlay.current.style.top    = overlayStartPoint.y+'px';
      refOverlay.current.style.bottom = 'unset';
    } else {
      // Log
      // console.log(' -| [overlay] stick to bottom');

      refOverlay.current.style.bottom = (refGrid.current.offsetHeight-overlayStartPoint.y)+'px';
      refOverlay.current.style.top    = 'unset';
    }

    // |--- Overlay Size
    if(
      cursorX>overlayStartPoint.x+gridX /* left */
      &&
      cursorY>gridY+overlayStartPoint.y /* top */
    ){
      // Log
      // console.log(' -| [overlay] stick to ltop');

      refOverlay.current.style.height = (cursorY-overlayY)+'px';
      refOverlay.current.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<overlayStartPoint.x+gridX /* right */
      &&
      cursorY>gridY+overlayStartPoint.y /* top */
    ) {
      // Log
      // console.log(' -| [overlay] stick to rtop');

      refOverlay.current.style.height = (cursorY-overlayY)+'px';
      refOverlay.current.style.width  = (gridX+overlayStartPoint.x-cursorX)+'px';
    } else if(
      cursorX>overlayStartPoint.x+gridX /* left */
      &&
      cursorY<gridY+overlayStartPoint.y /* bottom */
    ) {
      // Log
      // console.log(' -| [overlay] stick to lbottom');

      refOverlay.current.style.height = (gridY+overlayStartPoint.y-cursorY)+'px';
      refOverlay.current.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<overlayStartPoint.x+gridX /* right */
      &&
      cursorY<gridY+overlayStartPoint.y /* bottom */
    ) {
      // Log
      // console.log(' -| [overlay] stick to rbottom');

      refOverlay.current.style.height = (gridY+overlayStartPoint.y-cursorY)+'px';
      refOverlay.current.style.width  = (gridX+overlayStartPoint.x-cursorX)+'px';
    }

  }

  return (
    <ErrorBound>
      <div
        className={classes.cnt}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className={classes.grid}
          ref={refGrid}
        >
          {gridDays}
        </div>

        <div
          className={classes.overlay}
          ref={refOverlay}
        >
        </div>
      </div>
    </ErrorBound>
  );
}

export default Calendar;
