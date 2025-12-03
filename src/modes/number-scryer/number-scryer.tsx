
import Board from '../../components/board.tsx';
import Button from '../../components/button.tsx';
import Roll from '../../components/roll.tsx';
import HowToDialog from './components/how-to-dialog.tsx';
import ShareButton from '../../components/share-button.tsx';
import UpcomingDice from './components/upcoming-dice.tsx';
import { useState, useCallback, useEffect } from 'react';
import Score from '../../components/score.tsx';
import {useDice} from './utils/use-dice.tsx';
import { useHighScore } from '../../utils/use-high-score.tsx';
import StatsDialog from './components/stats-dialog.tsx';
import GameModeSelect from '../../components/game-mode-select.tsx';
import Title from "../../components/title.tsx"
import {getDefaultStatus, upkeepOnSelectSquare} from '../../utils/common-game-utils.tsx'
import { useSquareStatuses } from "../../utils/use-square-status.tsx";





const gameModeTitle = "Number Scryer"
const gameModeKey = "numberScryer"

export default function NumberScryer() {

 const [squareStatuses, setSquareStatuses ] = useSquareStatuses(gameModeKey)
 const [score, setScore] = useState<number>(0)
 const [highScore, setHighScore] = useHighScore(gameModeKey)

 const [currentDie, upcomingDice, updateCurrentDie, resetDice] = useDice(gameModeKey)
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
         return row.slice();
      })

      upkeepOnSelectSquare(currentDie, upcomingDice[0], rowIndex, columnIndex, newSquareStatuses)

      //set new status
      setSquareStatuses(newSquareStatuses)

      //updateDice
       updateCurrentDie()
    },
    [squareStatuses, setSquareStatuses, currentDie, upcomingDice, updateCurrentDie],
  )
  const resetGame = useCallback(() => {
      setSquareStatuses(getDefaultStatus())
      resetDice()
    },
    [ setSquareStatuses, resetDice],
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-t from-blue-300 to-stone-400">
      <div className="flex flex-col min-h-screen w-full max-w-xl content-start py-10 px-10 bg-stone-50/50 gap-x-2 gap-y-4">
       <div className="flex flex-row justify-between pb-4 ">
        <StatsDialog highScore={highScore} />
        <GameModeSelect />
        <HowToDialog />
        </div>
        <Title title={gameModeTitle} />
        <div className='flex flex-row p-x-5 justify-center content-end gap-8'>
          <Score score={score} />
          <Roll currentDie={currentDie} />
          <UpcomingDice upcomingDice={upcomingDice} />
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
            <p> Number Scryer is a variant game mode of <a className="underline" href="https://jennabarbara.github.io/number-pyle/">Number Pyle</a>, with a mechanic to view upcoming rolls.</p>
            <p>The rules and mechanics of <a className="underline" href="https://jennabarbara.github.io/number-pyle/">Number Pyle</a> were invented by <a className="underline" href="https://lintilion.itch.io/">Lintilion</a></p>
            <p>This implementation is brought to you by <a className="underline" href="https://github.com/JennaBarbara/">JennaBarbara</a></p>
        </div>
      </div>
    </div>

  )
}





