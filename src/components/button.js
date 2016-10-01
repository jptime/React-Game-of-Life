import React, { Component } from 'react';
class App extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
	    
    return (
      <button className="btn btn-primary"onClick={this.props.onClick}>
      {this.props.dialogue}
      </button>
    )
  }
}

export default App;
