export default class {
  constructor(){
    this.overlayStartPoint = {};
  }


  // | Handler - Mouse Key Down
  // |----------
  handleMouseDown(event){
    // Log
    console.log('--| mouse key down');

    event.preventDefault();

    let
      cursorX = event.clientX,
      cursorY = event.clientY,
      gridPos = this.refGrid.getBoundingClientRect(),
      gridX   = gridPos.x,
      gridY   = gridPos.y,
      gridPad = parseInt(document.defaultView
                 .getComputedStyle(document.querySelector('.'+this.calendarClasses.cnt))
                 .getPropertyValue('padding'));

    this.overlayStartPoint = {
      y: cursorY,
      x: cursorX,
      yRel: cursorY-gridY,
      xRel: cursorX-gridX
    };

    this.refSelect.style.height = '1px';
    this.refSelect.style.width  = '1px';
    this.refSelect.style.top    = this.overlayStartPoint.yRel+'px';
    this.refSelect.style.left   = this.overlayStartPoint.xRel+'px';

    this.refSelect.style.visibility = 'visible';
  }


  // | Handler - Mouse Key Up
  // |----------
  handleMouseUp(event){
    // Log
    console.log('--| mouse key up');

    event.preventDefault();

    // let copyEditorCommands = Object.assign({}, this.editorCommands);

    // copyEditorCommands.select.flag       = !copyEditorCommands.select.flag;
    // copyEditorCommands.select.overlayPos = this.refSelect.getBoundingClientRect();

    // if(event.shiftKey){
      // copyEditorCommands.select.mode = 'add';
    // } else if(event.altKey) {
      // copyEditorCommands.select.mode = 'remove';
    // } else {
      // copyEditorCommands.select.mode = 'new';
    // }

    // this.setEditorCommands(copyEditorCommands);

    this.refSelect.style.visibility = 'hidden';
  }


  // | Handle - Mouse Moove
  // |----------
  handleMouseMove(event){
    // Log
    // console.log('--| mouse move');

    let
      cursorX    = event.clientX,
      cursorY    = event.clientY,
      overlayPos = this.refSelect.getBoundingClientRect(),
      overlayX   = overlayPos.x,
      overlayY   = overlayPos.y;

    // |--- Horizontal Move
    if(cursorX>this.overlayStartPoint.x){
      this.refSelect.style.left  = this.overlayStartPoint.xRel+'px';
      this.refSelect.style.right = 'unset';
    } else {
      this.refSelect.style.right = (this.refGrid.offsetWidth-this.overlayStartPoint.xRel)+'px';
      this.refSelect.style.left  = 'unset';
    }

    // |--- Vertical Move
    if(cursorY>this.overlayStartPoint.y){
      this.refSelect.style.top    = (this.overlayStartPoint.yRel)+'px';
      this.refSelect.style.bottom = 'unset';
    } else {
      this.refSelect.style.bottom = (this.refGrid.offsetHeight-this.overlayStartPoint.yRel)+'px';
      this.refSelect.style.top    = 'unset';
    }

    // |--- Overlay Size
    if(
      cursorX>this.overlayStartPoint.x /* left */
      &&
      cursorY>this.overlayStartPoint.y /* top */
    ){
       this.refSelect.style.height = (cursorY-overlayY)+'px';
       this.refSelect.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<this.overlayStartPoint.x /* right */
      &&
      cursorY>this.overlayStartPoint.y /* top */
    ) {
       this.refSelect.style.height = (cursorY-overlayY)+'px';
       this.refSelect.style.width  = (this.overlayStartPoint.x-cursorX)+'px';
    } else if(
      cursorX>this.overlayStartPoint.x /* left */
      &&
      cursorY<this.overlayStartPoint.y /* bottom */
    ) {
       this.refSelect.style.height = (this.overlayStartPoint.y-cursorY)+'px';
       this.refSelect.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<this.overlayStartPoint.x /* right */
      &&
      cursorY<this.overlayStartPoint.y /* bottom */
    ) {
        this.refSelect.style.height = (this.overlayStartPoint.y-cursorY)+'px';
        this.refSelect.style.width  = (this.overlayStartPoint.x-cursorX)+'px';
    }
  }


  // | Handle - Mouse Leave
  // |----------
  handleMouseLeave(event){
    // Log
    console.log('--| mouse leave');

    this.refSelect.style.visibility = 'hidden';
  }
}
