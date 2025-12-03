
import Title from "../../components/title.tsx"
import Board from '../../components/board.tsx'
import Button from '../../components/button.tsx'
import Roll from '../../components/roll.tsx'
import Score from '../../components/score.tsx'
import ShareButton from '../../components/share-button.tsx'
import { rollDie } from '../../utils/rollDie.tsx'
import { useHighScore } from '../../utils/use-high-score.tsx'
import { useCurrentDie } from '../../utils/use-current-die.tsx'
import { useState, useCallback, useEffect } from 'react'
import {getDefaultStatus, upkeepOnSelectSquare} from '../../utils/common-game-utils.tsx'
import { useSquareStatuses } from "../../utils/use-square-status.tsx"
import Header from "../../components/header.tsx"



const gameModeTitle = "Number Pyle"
const gameModeKey = "numberPyle"

export default function App() {

 const [squareStatuses, setSquareStatuses ] = useSquareStatuses(gameModeKey)
 const [score, setScore] = useState<number>(0)
 const [highScore, setHighScore] = useHighScore(gameModeKey)


 const [currentDie, setCurrentDie] = useCurrentDie(gameModeKey)
 const [isGameOver, setIsGameOver] = useState(false)


  //update high score
  useEffect(()=>{
    if(score > highScore){
      setHighScore(score)
    }
  }, [score, highScore, setHighScore])


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
        return row.slice()
      })
      
      const newRoll = rollDie()

      upkeepOnSelectSquare(currentDie, newRoll, rowIndex, columnIndex, newSquareStatuses)

      //set new status
      setSquareStatuses(newSquareStatuses)
      //roll new die
      setCurrentDie(newRoll)

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
        <Header highScore={highScore} gameModeTitle={gameModeTitle} gameModeKey={gameModeKey} />
        <Title title={gameModeTitle} />
        
        <div className='flex flex-row p-x-5 justify-center gap-8'>
          <Score score={score} />
          <Roll currentDie={currentDie} />
        </div>
        {isGameOver && <div className='flex flex-col p-x-5 justify-center gap-2 text-center'>
          <p className='text-5xl'>GAME OVER</p>
           <ShareButton score={score} squareStasuses={squareStatuses} gameModeTitle={gameModeTitle} />
        </div>}
        <Board isGameOver={isGameOver} squareStatuses={squareStatuses} onSelectSquare={selectSquare} />
         <div className='flex flex-col items-center'>
          <Button onClick={() => resetGame()}>Reset Game</Button>
         </div>
          <div className='flex flex-col bg-stone-50 p-5 gap-2'>
            <p>Credits:</p>
            <p>The rules and mechanics of Number Pyle were invented by <a className="underline" href="https://lintilion.itch.io/">Lintilion</a></p>
            <p>This implementation is brought to you by <a className="underline" href="https://github.com/JennaBarbara/">JennaBarbara</a></p>
        </div>
      </div>
    </div>

  )
}



