export default class {
  constructor(){
    this.overlay = {
      start: {
      },
      end: {
      },
      boundary: {
        x: {
          from: null,
          to:   null
        },
        y: {
          from: null,
          to:   null
        }
      }
    };
    this.isActive  = false;
    this.refSelect = null;
    this.refGrid   = null;
    // this.selection.editorCommands    = props.editorCommands;
    // this.selection.setEditorCommands = props.setEditorCommands;
    this.calendarClasses = null;
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

    this.isActive = true;

    this.overlay.start = {
      y: cursorY,
      x: cursorX,
      yRel: cursorY-gridY,
      xRel: cursorX-gridX
    }

    this.refSelect.style.height = '1px';
    this.refSelect.style.width  = '1px';
    this.refSelect.style.top    = this.overlay.start.yRel+'px';
    this.refSelect.style.left   = this.overlay.start.xRel+'px';

    this.refSelect.style.visibility = 'visible';
  }


  // | Handler - Mouse Key Up
  // |----------
  handleMouseUp(event){
    // Log
    console.log('--| mouse key up');

    this.isActive = false;
    // console.log(this.overlayStartPoint);
    // console.log(this.overlayEndPoint);

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


  // | Handle - Mouse Move
  // |----------
  handleMouseMove(event){
    // Log
    // console.log('--| mouse move');
    
    if(!this.isActive) return;

    let
      cursorX    = event.clientX,
      cursorY    = event.clientY,
      overlayPos = this.refSelect.getBoundingClientRect(),
      overlayX   = overlayPos.x,
      overlayY   = overlayPos.y;

    this.overlay.end = {
      y: cursorY,
      x: cursorX,
    };

    // |--- Overlay boundary - Horizontal
    if(this.overlay.start.x < this.overlay.end.x){
      this.overlay.boundary.x = {
        from: this.overlay.start.x,
        to:   this.overlay.end.x
      }
    } else {
      this.overlay.boundary.x = {
        from: this.overlay.end.x,
        to:   this.overlay.start.x
      }
    }

    // |--- Overlay boundary - Vertical
    if(this.overlay.start.y < this.overlay.end.y){
      this.overlay.boundary.y = {
        from: this.overlay.start.y,
        to:   this.overlay.end.y
      }
    } else {
      this.overlay.boundary.y = {
        from: this.overlay.end.y,
        to:   this.overlay.start.y
      }
    }

    // |--- Horizontal Move
    if(cursorX>this.overlay.start.x){
      this.refSelect.style.left  = this.overlay.start.xRel+'px';
      this.refSelect.style.right = 'unset';
    } else {
      this.refSelect.style.right = (this.refGrid.offsetWidth-this.overlay.start.xRel)+'px';
      this.refSelect.style.left  = 'unset';
    }

    // |--- Vertical Move
    if(cursorY>this.overlay.start.y){
      this.refSelect.style.top    = (this.overlay.start.yRel)+'px';
      this.refSelect.style.bottom = 'unset';
    } else {
      this.refSelect.style.bottom = (this.refGrid.offsetHeight-this.overlay.start.yRel)+'px';
      this.refSelect.style.top    = 'unset';
    }

    // |--- Overlay Size
    if(
      cursorX>this.overlay.start.x /* left */
      &&
      cursorY>this.overlay.start.y /* top */
    ){
       this.refSelect.style.height = (cursorY-overlayY)+'px';
       this.refSelect.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<this.overlay.start.x /* right */
      &&
      cursorY>this.overlay.start.y /* top */
    ) {
       this.refSelect.style.height = (cursorY-overlayY)+'px';
       this.refSelect.style.width  = (this.overlay.start.x-cursorX)+'px';
    } else if(
      cursorX>this.overlay.start.x /* left */
      &&
      cursorY<this.overlay.start.y /* bottom */
    ) {
       this.refSelect.style.height = (this.overlay.start.y-cursorY)+'px';
       this.refSelect.style.width  = (cursorX-overlayX)+'px';
    } else if(
      cursorX<this.overlay.start.x /* right */
      &&
      cursorY<this.overlay.start.y /* bottom */
    ) {
        this.refSelect.style.height = (this.overlay.start.y-cursorY)+'px';
        this.refSelect.style.width  = (this.overlay.start.x-cursorX)+'px';
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
