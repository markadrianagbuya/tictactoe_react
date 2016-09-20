import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Cell extends Component {
  render() {

    return (
      <button style={{width: 40, height: 40}} onClick={this.props.onClick}><p>{this.props.symbol}</p></button>
    )
  }

}
class App extends Component {
  constructor(props) {
    super(props);
    var cells = [];

    for (var i = 0; i < 9; i++) {
      cells.push({id: i, symbol: ''});
    }

    this.state = {
      cells: cells,
      currentSymbol: "X"
    }
  }

  winnerExists = () => {
    var { cells } = this.state
    var winningLines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    return winningLines.some(line => {
      return this.cellsEqual(cells[line[0]].symbol, cells[line[1]].symbol, cells[line[2]].symbol)
    })
  }

  cellsEqual = (x,y,z) => {
    return (x === y) && (y === z) && (x != "")
  }

  setSymbol = (id) => {
    var nextSymbol = this.state.currentSymbol === "X" ? "O" : "X"
    var cellTmp = this.state.cells
    cellTmp[id].symbol = nextSymbol


    this.setState({
      currentSymbol: nextSymbol,
      cells: cellTmp
    })

    if (this.winnerExists()) { alert("You win!") }
  };

  getCells = () => {
    return this.state.cells.map((cell) => {
      return <span>

        <Cell onClick={() => this.setSymbol(cell.id)} symbol={cell.symbol}/>
        {(cell.id + 1) % 3 === 0 ? <br /> : '' }
      </span>
    })
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tic Tac Toe</h2>
        </div>
        <p className="App-intro">
          {this.getCells()}
        </p>
      </div>
    );
  }
}

export default App;
