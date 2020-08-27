import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 * 
 * - coord: string like "y-x"
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit, coord }) {
  function handleFlip(evt) {
    console.log("this is coord", coord)
    flipCellsAroundMe(coord)
  }

  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={handleFlip} />;
}

export default Cell;
