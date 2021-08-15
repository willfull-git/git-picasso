import React, {
  createRef
} from 'react';
import classes  from './day.module.css';
import {
  format
} from 'date-fns';
import EditorContext from '../../../../context/context-editor.js';

import {
  getEditorCommandsModel
} from '../../../../utils/utilsEditorCommands';

const mapCommitClasses = {
  '0': classes['commit-0'],
  '1': classes['commit-1'],
  '2': classes['commit-2'],
  '3': classes['commit-3'],
  '4': classes['commit-4'],
}

export default class Day extends React.Component {
  constructor(props){
    super();

    this.state = {
      commitLevel: 0,
      selected: false,
      ownEditorCmdFlags: getEditorCommandsModel()
    }

    this.dateFormatted  = format(props.date, 'yyyy.MM.dd');
    this.editorCmdFlags = props.editorCommands;
    this.refBox         = createRef();
  }

  static commitLevels = [0,1,2,3,4];

  // | Handler - Click
  // |----------
  handleClick(e){
    let
      level  = 
        (this.state.commitLevel+Day.commitLevels.length+1)
        %
        Day.commitLevels.length,
      commit = {
        id: this.dateFormatted,
        date: this.props.date,
        level: level
      };

    if(e.altKey){
      this.context.dispatch({
        type: 'sketch/commit-remove',
        payload: commit
      });

      this.setState({
        commitLevel: 0
      });
      this.state.commitLevel = 0;
    } else if(e.shiftKey) {

    } else {
      this.context[1]({
        type: 'sketch/commit-add',
        payload: commit
      });
      
      this.setState({
        commitLevel: level
      });
    }
  }

  // | Handle - Select
  // |----------
  handleSelect(){
    this.setState({
      selected: true
    });
  }

  // | Handle - Unselect
  // |----------
  handleUnselect(){
    this.setState({
      selected: false
    });
  }

  render(){ return (
    <div
      className={
        classes.tile+' '+mapCommitClasses[this.state.commitLevel]
        + ' ' +
        (this.state.selected? classes.selected: '')
      }
      title={this.dateFormatted}
      onClick={this.handleClick.bind(this)}
      ref={this.refBox}
    > </div>
  )}
}
Day.contextType = EditorContext;
