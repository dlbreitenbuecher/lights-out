import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 * 
 * App -> Board -> Cell
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard);
  const [winStatus, setWinStatus] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // create array-of-arrays of true/false values
    for (let y=0; y<nrows; y++){
      let widthArr = [];
      for (let x=0; x<ncols; x++) {
        widthArr[x] = false
        //(Math.random() < chanceLightStartsOn ? true : false)
      }
      initialBoard.push(widthArr);
    }
    initialBoard[0][0] = true
    initialBoard[0][1] = true
    initialBoard[1][0] = true
    
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // console.log("this is board", board)
    for (let y=0; y<nrows; y++) {
      if (board[y].some(cell => cell === true)) {
        return false
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard].map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x, boardCopy)
      flipCell((y+1), x, boardCopy)
      flipCell((y-1), x, boardCopy)
      flipCell(y, (x+1), boardCopy)
      flipCell(y, (x-1), boardCopy)

      console.log("this is boardCopy", boardCopy)
      return boardCopy
    });
  }

  function checkIfWon() {
    const won = hasWon()
    if (won) {
      setWinStatus(won)
    }
    console.log("this is winStatus", winStatus, board)
  }
  checkIfWon();

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  const cellsInBoard = [];
  for (let y=0; y<nrows; y++){
    const row = board[y].map((cell, idx) => <Cell key={`${y}-${idx}`} coord={`${y}-${idx}`} isLit={cell} flipCellsAroundMe={flipCellsAround} />);
    cellsInBoard.push(row);
  }

  return(
    <div>
      {!winStatus && 
      <table>
        {cellsInBoard.map(row => <tr>{row}</tr>)}
      </table>}
    </div>
  )
}

Board.defaultProps = {
  ncols: 5,
  nrows: 5,
  chanceLightStartsOn: .1
}

export default Board;
