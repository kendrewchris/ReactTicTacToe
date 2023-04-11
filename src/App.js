import { useState } from 'react';

//square is a React component of type 'function'
//we are returning JSX code or otherwise known as HTML
function Square({value, onSquareClick}) {
  return(
    <button className="square" onClick={onSquareClick}>
      {value}
      </button>
  ); 
}
/*
function Test(){
  return <button className="test">wowzers</button>
}
*/

var counter = 0;

//This function will continuously be executed and by induction
//re-render the DOM
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [clicked, setClicked] = useState(Array(9).fill(false));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } 

  function handleClick(i) {
    if(calculateWinner(squares)){
      return;
    }

    if(clicked[i] == false){
      counter +=1;
      //creates a copy of our state array
      const nextSquares = squares.slice();
      if(counter%2==1){
        nextSquares[i] = "X";
      }
      else{
        nextSquares[i] = "O";
      }
      const temp = clicked.slice();
      temp[i] = true;
      setSquares(nextSquares);
      setClicked(temp);
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick ={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick ={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick ={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick ={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick ={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick ={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick ={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick ={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick ={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}