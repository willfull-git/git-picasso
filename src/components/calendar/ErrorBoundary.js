import {
  Component
} from 'react';

export class ErrorBound extends Component {
  constructor(props){
    super(props);
    this.state = { hasError:false };
  }

  static getDerivedStateError(error){
    return { hasError:true };
  }

  render(){
    if(this.state.hasError){
      return (
        <h1>Houston we have a problem!</h1>
      );
    }

    return (
      this.props.children
    );
  }
}
