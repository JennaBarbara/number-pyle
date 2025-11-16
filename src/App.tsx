import './App.css'
import Title from "./components/title.tsx"
import Square from './components/square.tsx';
import Board from './components/board.tsx';
import Button from './components/button.tsx';
import { useState, useCallback, useEffect } from 'react';


export interface SquareStatus {
  number?: number,
  scored: boolean,
  selectable: boolean
} 




export default function App() {

 const [squareStatuses, setSquareStatuses ] = useState(getDefaultStatus)
 const [score, setScore] = useState(0)

 const [isDefaultState, setIsDefaultState] = useState(true)
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
      console.log(`${rowIndex}-${columnIndex}`)
      const newSquareStatuses  = Object.assign({}, squareStatuses); 
      //make all unselectable
      newSquareStatuses.forEach((squareStatusRow) => {
        squareStatusRow.forEach((squareStatus) => squareStatus.selectable = false)
      })

      //updateSquare
      newSquareStatuses[rowIndex][columnIndex].number = currentDie
      
      //check and set for scored
          //
      

      //set new selectable

      //set new status
      setSquareStatuses(newSquareStatuses)
      //roll new die
      setCurrentDie(rollDie)

    },
    [squareStatuses, setSquareStatuses, currentDie, setCurrentDie],
  )
const resetGame = useCallback(() => {
      setSquareStatuses(getDefaultStatus())
      setIsDefaultState(true)
    },
    [ setSquareStatuses, setIsDefaultState],
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-t from-neutral-400 to-stone-400">
      <div className="flex flex-col min-h-screen w-full max-w-4xl content-start py-10 px-10 bg-stone-50/50 gap-x-2 gap-y-10">
        <Title />
        {isGameOver && <div className='flex flex-row p-x-5 justify-center gap-4 text-center'>
          <p className='text-5xl'>GAME OVER</p>
        </div>}
        <div className='flex flex-row p-x-5 justify-center gap-4'>
          <div className='flex flex-col text-center'>
            <p className='text-xl'>Score</p>
            <p className='text-lg'>{score}</p>
          </div>
          <div className='flex flex-col text-center'>
            <p className='text-xl'>Current Roll</p>
            <p className='text-lg'>{currentDie}</p>
          </div>

        </div>
        <Board>
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
        <Button onClick={() => resetGame} />

      </div>
    </div>

  )
}

function rollDie(): number {
  return Math.floor(Math.random() * 5) + 1
}

function getDefaultStatus():  Array<Array<SquareStatus>> {
  const defaultStatus: Array<Array<SquareStatus>> = [[]]
  for (let i = 0; i < 9; i++) {
    const defaultRow: Array<SquareStatus> = []
    for (let j=0; j<9; j++) {
      defaultRow.push(
        {
          scored: false,
          selectable: j == 0 || j== 8  ? true : false
        }
      )
    }
    defaultStatus.push(defaultRow)
  }
  return defaultStatus  
}



