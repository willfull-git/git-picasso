import React, {
  createRef,
  Component
} from 'react';
import classes  from './calendar.module.css';
import EditorContext from '../../../context/context-editor.js';

import {
  ErrorBound
} from './ErrorBoundary';
import Selection from './class-selection.js'
import Day from './day/Day';

export default class Calendar extends Component {
  constructor(props){
    super();

    // |--- STATE
    this.state = {
      gridCmps:  [],
      gridDays:  [],
      gridModel: [],
    };

    // |--- REFs
    this.refGrid    = createRef();
    this.refOverlay = createRef();
    this.refSelect  = createRef();

    // |--- META
    this.isGridReady       = false;
    this.isGridDaysReady   = false;
    this.overlayStartPoint = {};
    this.selection         = new Selection();

    // |--- BIND METHODS
    this.handleMouseDown  = this.handleMouseDown.bind(this);
    this.handleMouseUp    = this.handleMouseUp.bind(this);
    this.handleMouseMove  = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }


  // | Build - Grid Cmps
  // |----------
  buildGridCmps(){
    console.log('---| [func - build grid cmps]');

    let
      _gridCmps = [],
      _gridRefs = [];

    this.props.yearDays.forEach((v)=>{
      let
        refDay = createRef(),
        cmpDay = 
          <Day
            key={v.toString()}
            date={v}
            ref={refDay}
          />

      _gridRefs.push(refDay);
      _gridCmps.push(cmpDay);
    })

    this.setState({
      gridCmps: _gridCmps
    });
    this.isGridReady = true;

    this.buildGridDays(_gridRefs);
  }


  // | Build - Grid Days array
  // |----------
  buildGridDays(_gridRefs){
    console.log('---| [method - build grid]');

    let
      days      = [],
      iWeekDay  = 1, // < 8
      iWeek     = 1, // < 4
      iBlocks   = {
        top:    1,
        middle: 2,
        bottom: 3
      }

    _gridRefs.forEach((ref, i)=>{
      let day = {
        ref: ref,
        block: null,
      }

      // |--- set block
      if(iWeekDay<3){
        day.block = iBlocks.top;
      } else if(iWeekDay<6){
        day.block = iBlocks.middle;
      } else {
        day.block = iBlocks.bottom;
      }

      // |--- track - week days
      if(iWeekDay===7){
        iWeekDay = 1;
        iWeek   += 1;
      } else {
        iWeekDay += 1;
      }

      // |--- track - weeks
      if(iWeek>3){
        iBlocks.top    += 3;
        iBlocks.middle += 3;
        iBlocks.bottom += 3;

        iWeek = 1;
      }

      days.push(day);
    });

    // Log
    // console.log('---| days:');
    // console.log(days);

    this.setState({
      gridDays: days
    });
    this.isGridDaysReady = true;
  }


  // | Helper - Build Grid Model
  // |----------
  buildGridModel(){
    console.log('---| [method] build grid model');

    let _gridModel = [];

    _gridModel = this.state.gridDays.map((day)=>{
      let outputDay = {
        ...day,
        coords: {
          x: null,
          y: null
        }
      }

      // Log
      // console.log('  -| ref');
      // console.log(outputDay.ref.current);

      // |--- set coords
      outputDay.coords.x = outputDay.ref.current.refBox.current.getBoundingClientRect().x;
      outputDay.coords.y = outputDay.ref.current.refBox.current.getBoundingClientRect().y;

      // if(output[day.block]===undefined){
        // output[day.block] = [];
      // }
      // output[day.block].push(outputDay);

      // Log
      // console.log('---|');
      // console.log(day);
      // console.log(outputDay);

      return outputDay;
    });

    this.setState({
      gridModel: _gridModel
    });
    this.isGridDaysReady = false;
  }


  // | Effect - on Mount
  // |----------
  componentDidMount(){
    if(!this.isGridReady) this.buildGridCmps();

    this.selection.refSelect = this.refSelect.current;
    this.selection.refGrid   = this.refGrid.current;
    // this.selection.editorCommands    = props.editorCommands;
    // this.selection.setEditorCommands = props.setEditorCommands;
    this.selection.calendarClasses   = classes;
  }


  // | Effect - on Update
  // |----------
  componentDidUpdate(){
    console.log('---| update');
    console.log('  -| grid days ready: '+this.isGridDaysReady);

    if(this.isGridDaysReady) this.buildGridModel();
  }


  // | Handler - Mouse Key Down
  // |----------
  handleMouseDown(event){
    // Log
    // console.log('--| mouse key down');

    this.selection.handleMouseDown(event);
  }

  // | Handler - Mouse Key Up
  // |----------
  handleMouseUp(event){
    // Log
    console.log('--| mouse key up');

    this.state.gridCmps.forEach((v, i)=>{
      if(v.ref.current.state.selected){
        this.context[1]({'type': 'selection/add', payload: v})
      }
    });

    this.selection.handleMouseUp(event);
  }

  // | Handle - Mouse Leave
  // |----------
  handleMouseLeave(event){
    // Log
    // console.log('--| mouse leave');
    
    this.selection.handleMouseLeave(event);
  }

  // | Handle - Mouse Moove
  // |----------
  handleMouseMove(event){
    // Log
    // console.log('--| mouse move');
    
    this.selection.handleMouseMove(event);

    this.state.gridModel.forEach((day)=>{
      if(
        day.coords.x>this.selection.overlay.boundary.x.from
        &&
        day.coords.x<this.selection.overlay.boundary.x.to
        &&
        day.coords.y>this.selection.overlay.boundary.y.from
        &&
        day.coords.y<this.selection.overlay.boundary.y.to
      ){
        day.ref.current.handleSelect();
      } else if(day.ref.current.state.selected) {
        day.ref.current.handleUnselect();
      };
    });
  }


  render(){ return (
    <ErrorBound>
      <div
        className={classes.cnt}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className={classes.grid}
          ref={this.refGrid}
        >
          {this.state.gridCmps}
        </div>

        <div
          className={classes.selection}
          ref={this.refSelect}
        >
        </div>
      </div>
    </ErrorBound>
  )};
}
Calendar.contextType = EditorContext;
