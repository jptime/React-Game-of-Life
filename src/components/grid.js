import React, { Component } from 'react';
import './grid.css'
class App extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
   var size = this.props.gridSize[0]
   var cellSize = size === 20 ? "small" : size === 50 ? "medium" : "large"
	  var Grid = 
	    this.props.gridMatrix.map((row, rowIndex)=>{
	      var cells = row.map((cell, cellIndex) =>{
	        var isItAlive = cell ? "cell alive " + cellSize: "cell dead " + cellSize;
	        
	        return <div key={"cell" + rowIndex + cellIndex} className={isItAlive} onClick={this.props.onClick.bind(this, rowIndex, cellIndex)}></div>
	      })
	      return <div className="cellRow">{cells}</div>
	    })
	    
	    
    return (
      <div>
        <div className="mainbox">
          {Grid}
        </div>
      </div>
    )
  }
}

export default App;
