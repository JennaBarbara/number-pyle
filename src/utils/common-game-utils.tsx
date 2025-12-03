import type { SquareStatus } from "./square-status"

export function getDefaultStatus():  Array<Array<SquareStatus>> {
  const defaultStatus: Array<Array<SquareStatus>> = []
  for (let i = 0; i < 9; i++) {
    const defaultRow: Array<SquareStatus> = []
    for (let j=0; j<9; j++) {
      defaultRow.push(
        {
          scored: false,
          selectable: j == 0 && i == 4 || j== 8 && i == 4 ? true : false
        }
      )
    }
    defaultStatus.push(defaultRow)
  }

  return defaultStatus  
}

export function upkeepOnSelectSquare(currentDie:number, newRoll:number, rowIndex: number, columnIndex: number, newSquareStatuses: Array<Array<SquareStatus>>){
    //clear selectable cells
    clearSelectableSquares(newSquareStatuses)

    //updateSquare
    newSquareStatuses[rowIndex][columnIndex].number = currentDie
    
    //check and set for scored
      setScored(currentDie, rowIndex, columnIndex, newSquareStatuses)
    
    //set new selectable
    setSelectable(newRoll, rowIndex, columnIndex, newSquareStatuses)
}



export function setSelectable(newRoll:number, rowIndex: number, columnIndex: number, newSquareStatuses: Array<Array<SquareStatus>>){
        //even
        if(newRoll % 2 == 0) {
        //up
        if ( rowIndex-1 > -1 &&
          newSquareStatuses[rowIndex-1][columnIndex] !==undefined && 
          newSquareStatuses[rowIndex-1][columnIndex].number === undefined && 
         !newSquareStatuses[rowIndex-1][columnIndex].scored) {
          newSquareStatuses[rowIndex-1][columnIndex].selectable = true
        }
        //down

      if ( rowIndex+1 <9 &&
          newSquareStatuses[rowIndex+1][columnIndex] !==undefined && 
          newSquareStatuses[rowIndex+1][columnIndex].number === undefined && 
         !newSquareStatuses[rowIndex+1][columnIndex].scored) {
          newSquareStatuses[rowIndex+1][columnIndex].selectable = true
        }

        //left
        if ( columnIndex-1 > -1 &&
          newSquareStatuses[rowIndex][columnIndex-1] !==undefined && 
          newSquareStatuses[rowIndex][columnIndex-1].number === undefined && 
         !newSquareStatuses[rowIndex][columnIndex-1].scored) {
          newSquareStatuses[rowIndex][columnIndex-1].selectable = true
        }

        //right
      if ( columnIndex+1 <9 &&
          newSquareStatuses[rowIndex][columnIndex+1] !==undefined && 
          newSquareStatuses[rowIndex][columnIndex+1].number === undefined && 
         !newSquareStatuses[rowIndex][columnIndex+1].scored) {
          newSquareStatuses[rowIndex][columnIndex+1].selectable = true
        }
      }
      //odd
      else {
        //up - left
        if (
          rowIndex-1 > -1 && columnIndex-1 > -1 &&
          newSquareStatuses[rowIndex-1][columnIndex-1] !==undefined && 
          newSquareStatuses[rowIndex-1][columnIndex-1].number === undefined && 
         !newSquareStatuses[rowIndex-1][columnIndex-1].scored) {
          newSquareStatuses[rowIndex-1][columnIndex-1].selectable = true
        }
        //up-right
        if (rowIndex-1 > -1 && columnIndex+1 < 9 &&
          newSquareStatuses[rowIndex-1][columnIndex+1] !==undefined && 
          newSquareStatuses[rowIndex-1][columnIndex+1].number === undefined && 
         !newSquareStatuses[rowIndex-1][columnIndex+1].scored) {
          newSquareStatuses[rowIndex-1][columnIndex+1].selectable = true
        }
        //down left
        if (
          rowIndex+1 < 9 && columnIndex-1 > -1 &&
          newSquareStatuses[rowIndex+1][columnIndex-1] !==undefined && 
          newSquareStatuses[rowIndex+1][columnIndex-1].number === undefined && 
         !newSquareStatuses[rowIndex+1][columnIndex-1].scored) {
          newSquareStatuses[rowIndex+1][columnIndex-1].selectable = true
        }

        //down right
        if (
          rowIndex+1 < 9 && columnIndex+1 < 9 &&
          newSquareStatuses[rowIndex+1][columnIndex+1] !==undefined && 
          newSquareStatuses[rowIndex+1][columnIndex+1].number === undefined && 
         !newSquareStatuses[rowIndex+1][columnIndex+1].scored) {
          newSquareStatuses[rowIndex+1][columnIndex+1].selectable = true
        }
      }
}

export function setScored( currentDie: number, rowIndex: number, columnIndex: number, newSquareStatuses: Array<Array<SquareStatus>>) {
//check and set for scored
    //check left on row
    for(let i = columnIndex+1; i < 9 ; i++){
      if(newSquareStatuses[rowIndex][i].number !== undefined){
        if(newSquareStatuses[rowIndex][i].number !== currentDie){
          break
        }
        else if(newSquareStatuses[rowIndex][i].number === currentDie) {
          for(let j = columnIndex+1; j < i ; j++){
            newSquareStatuses[rowIndex][j].scored = true
          }
          break
        }
      }
    }

    //check right on row
      for(let i = columnIndex-1; i > -1  ; i--){
      if(newSquareStatuses[rowIndex][i].number !== undefined){
        if(newSquareStatuses[rowIndex][i].number !== currentDie){
          break
        }
        else if(newSquareStatuses[rowIndex][i].number === currentDie) {
          for(let j = columnIndex-1; j > i ; j--){
            newSquareStatuses[rowIndex][j].scored = true
          }
          break
        }
      }
    }

    //check up on column
    for(let i = rowIndex-1; i > -1  ; i--){
      if(newSquareStatuses[i][columnIndex].number !== undefined){
        if(newSquareStatuses[i][columnIndex].number !== currentDie){
          break
        }
        else if(newSquareStatuses[i][columnIndex].number === currentDie) {
          for(let j = rowIndex-1; j > i ; j--){
            newSquareStatuses[j][columnIndex].scored = true
          }
          break
        }
      }
    }
    
    //check down on column
    for(let i = rowIndex+1; i < 9  ; i++){
      if(newSquareStatuses[i][columnIndex].number !== undefined){
        if(newSquareStatuses[i][columnIndex].number !== currentDie){
          break
        }
        else if(newSquareStatuses[i][columnIndex].number === currentDie) {
          for(let j = rowIndex+1; j < i ; j++){
            newSquareStatuses[j][columnIndex].scored = true
          }
          break
        }
      }
    }
}

export function clearSelectableSquares(newSquareStatuses: Array<Array<SquareStatus>>) {
  for (let i = 0; i < 9; i++) {
    for (let j=0; j<9; j++) {
      newSquareStatuses[i][j].selectable=false
    }
  }
}