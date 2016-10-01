import React, { Component } from 'react';
import './App.css';
import seed from './components/seed.js'
import Grid from './components/grid.js'
import Button from './components/button.js'
import gamelogic from './gamelogic.js'
class App extends Component {
  constructor(props){
    super(props)
    var self = this;
    this.state = {
    gridSize: [50,50],
    gridMatrix: gamelogic.randomSeed([50,50]),
    gridSpeed: 900,
    generationNumber: 0,
    running: true,
    
    };
    this._setGridSize = this._setGridSize.bind(this)
    this._setTheSpeed = this._setTheSpeed.bind(this)
    this._startOrStopTheGrid = this._startOrStopTheGrid.bind(this)
    this._renderTheGrid = this._renderTheGrid.bind(this)
    this._resetTheGrid = this._resetTheGrid.bind(this)
    this._randomGrid = this._randomGrid.bind(this)
    this._changeCell = this._changeCell.bind(this)
  }
  componentDidMount(){
    this._renderTheGrid()
  }
  _renderTheGrid(){
        clearInterval(this.state.gridInterval)
    this.setState({gridInterval: ""})
    var self=this;
    var newGridInt = setInterval(function(){
        var newGrid = gamelogic.cycle(self.state.gridMatrix, self.state.gridSize)
            self.setState({gridMatrix: newGrid[0], generationNumber: self.state.generationNumber + newGrid[1]})
      }, self.state.gridSpeed)
      this.setState({gridInterval: newGridInt})
      
  }
  _randomGrid(){
    this.setState({gridMatrix: gamelogic.randomSeed(this.state.gridSize)})
  }
  _setGridSize(size){
    this.setState({gridSize: size}, function(){
      
      
      this._resetTheGrid()
    })
  }
  _setTheSpeed(num){
    clearInterval(this.state.gridInterval)
    this.setState({gridSpeed: num, gridInterval: ""}, function(){
      this._renderTheGrid()
    })
    
      
  }
  _startOrStopTheGrid(){
    
    var self = this;
    
    if (this.state.running){
        clearInterval(this.state.gridInterval)
        this.setState({gridInterval: ""})
    } 
    if (!this.state.running){
      this._renderTheGrid()
    }
    
    this.setState({running: !this.state.running})

  }
  _resetTheGrid(){
    var cells = this.state.gridMatrix
      
      cells.forEach((row, rowindex) => {
        row.forEach((cell, cellindex)=>{
          cells[rowindex][cellindex] = 0;
      })
    })
    var size= this.state.gridSize;
      var matrix = [];
      for (var i = 0; i < size[0]; i++) {
         matrix[i] = [];
         for (var j = 0; j < size[1]; j++) {
           matrix[i][j] = 0;
           }
        };
    clearInterval(this.state.gridInterval)
    this.setState({running: false, generationNumber: 0, gridMatrix: matrix, gridInterval: ""})
  }
  _changeCell(rowIndex, cellIndex){
    var matrix = this.state.gridMatrix;
    matrix[rowIndex][cellIndex] = !matrix[rowIndex][cellIndex]
    this.setState({gridMatrix: matrix})
  }

  render() {
	    
    return (
      <div className="container">
        
         
          <div className="row text-center">
          <div className="col-md-12">
            <h1>Game Of Life</h1>
            <Grid gridMatrix={this.state.gridMatrix} gridSize={this.state.gridSize} onClick={this._changeCell}/>
            </div>
             </div>
            
              <div className="row text-center">
                
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2 well controldiv">
                    <div className="col-md-4">
                      <p>Controls</p>
                      <Button dialogue={this.state.running ? "Stop" : "Start"} onClick={this._startOrStopTheGrid}/>
                      <Button dialogue="Reset" onClick={this._resetTheGrid}/>
                      <Button dialogue="Random" onClick={this._randomGrid}/>
                      <br/><br/>
                      <p className="btn btn-danger"> {"Generation: " + this.state.generationNumber}</p>
                    </div>
                 
                  
                  
                  <div className="col-md-4">
                    <p>Speed</p>
                    <Button dialogue="Slow" onClick={this._setTheSpeed.bind(this, 1000)}/>
                    <Button dialogue="Medium" onClick={this._setTheSpeed.bind(this, 600)}/>
                    <Button dialogue="Fast" onClick={this._setTheSpeed.bind(this, 200)}/>
                  </div>
                
                  
                  
                  <div className="col-md-4">
                    <p>Grid Size</p>
                    <Button dialogue="20x20" onClick={this._setGridSize.bind(this,[20,20])}/>
                    <Button dialogue="50x50" onClick={this._setGridSize.bind(this,[50,50])}/>
                    <Button dialogue="60x60" onClick={this._setGridSize.bind(this, [60,60])}/>
                  </div>
                 </div>
                </div>
           </div>
           
        </div>
         
       
    
    )
  }
}

export default App;
