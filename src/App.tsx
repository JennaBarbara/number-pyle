import './App.css'
import Title from "./components/title.tsx"
import Square from './components/square.tsx';
import Board from './components/board.tsx';
import Button from './components/button.tsx';
import Roll from './components/roll.tsx';
import HowToDialog from './components/how-to-dialog.tsx';
import { useState, useCallback, useEffect } from 'react';
import Score from './components/score.tsx';


export interface SquareStatus {
  number?: number,
  scored: boolean,
  selectable: boolean
} 




export default function App() {

 const [squareStatuses, setSquareStatuses ] = useState<Array<Array<SquareStatus>>>(getDefaultStatus)
 const [score, setScore] = useState(0)


 const [currentDie, setCurrentDie] = useState(rollDie)
 const [isGameOver, setIsGameOver] = useState(false)

  //calculate score
  useEffect(() => {
    let score = 0
      squareStatuses.forEach((squareStatusRow) => {
      squareStatusRow.forEach((squareStatus) =>{if(squareStatus.scored) score++})
    })
    setScore(score)
  },[squareStatuses] )

  //check if is Game Over 
    useEffect(() => {
    let gameOver = true
    squareStatuses.forEach((squareStatusRow) => {
        squareStatusRow.forEach((squareStatus) =>{if(squareStatus.selectable) gameOver=false})
      })
    setIsGameOver(gameOver)
  },[squareStatuses] )

  const selectSquare = useCallback(
    (rowIndex: number, columnIndex:number) => {

      const newSquareStatuses= squareStatuses.map(function(row) {
         return row.slice();
      });

      for (let i = 0; i < 9; i++) {
        for (let j=0; j<9; j++) {
          newSquareStatuses[i][j].selectable=false
        }
      }

      //updateSquare
      newSquareStatuses[rowIndex][columnIndex].number = currentDie
      
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
      
      //set new selectable
      const newRoll = rollDie()
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

      //set new status
      setSquareStatuses(newSquareStatuses)
      //roll new die
      setCurrentDie(newRoll )

    },
    [squareStatuses, setSquareStatuses, currentDie, setCurrentDie],
  )
  const resetGame = useCallback(() => {
      setSquareStatuses(getDefaultStatus())
      setCurrentDie(rollDie)
    
    },
    [ setSquareStatuses, setCurrentDie],
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-t from-neutral-400 to-stone-400">
      <div className="flex flex-col min-h-screen w-full max-w-xl content-start py-10 px-10 bg-stone-50/50 gap-x-2 gap-y-4">
       <HowToDialog />
        <Title />
        <div className='flex flex-row p-x-5 justify-center gap-8'>
          <Score score={score} />
          <Roll currentDie={currentDie} />
        </div>
        {isGameOver && <div className='flex flex-row p-x-5 justify-center gap-2 text-center'>
          <p className='text-5xl'>GAME OVER</p>
        </div>}
        <Board isGameOver={isGameOver}>
            {squareStatuses.map((squareStatusRow, rowIndex) =>(
               squareStatusRow.map((squareStatus, columnIndex) => (
                 <Square 
                  squareStatus={squareStatus} 
                  index={`${rowIndex}-${columnIndex}`} 
                  key={`square-${rowIndex}-${columnIndex}`} 
                  onClick={()=>selectSquare(rowIndex, columnIndex)} />
               )       
            )))}
        </Board>
         <div className='flex flex-col items-center'>
          <Button onClick={() => resetGame()}>Reset Game</Button>
         </div>
          <div className='flex flex-col bg-stone-50 p-5 gap-2'>
            <p>Credits:</p>
            <p>The rules and mechanics of Number Pyle were invented by <a className="underline" href="https://lintilion.itch.io/">Lintilion</a></p>
            <p>This implementation is brought to you by <a className="underline" href="https://github.com/JennaBarbara/">JennaBarbara</a></p>
            <p>Another game mode can be found <a className="underline" href="https://jennabarbara.github.io/number-pyre/">here</a></p>
        </div>
      </div>
    </div>

  )
}

function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1
}

function getDefaultStatus():  Array<Array<SquareStatus>> {
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



