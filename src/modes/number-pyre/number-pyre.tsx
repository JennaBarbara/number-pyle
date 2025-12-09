
import Title from "../../components/title.tsx"
import Board from '../../components/board.tsx'
import Button from '../../components/button.tsx'
import ShareButton from '../../components/share-button.tsx'
import { useState, useCallback, useEffect } from 'react'
import { useCurrentDie } from '../../utils/use-current-die.tsx'
import { rollDie } from '../../utils/rollDie.tsx'
import { useHighScore } from '../../utils/use-high-score.tsx'
import { useBankedDie } from './utils/use-banked-die.tsx'
import { getDefaultStatus, setSelectable, clearSelectableSquares, upkeepOnSelectSquare } from '../../utils/common-game-utils.tsx'
import { useSquareStatuses } from "../../utils/use-square-status.tsx"
import NumberDisplay from "../../components/number-display.tsx"
import Header from "../../components/header.tsx"


const gameModeTitle = "Number Pyre"
const gameModeKey = "numberPyre"

export default function NumberPyre() {

 const [squareStatuses, setSquareStatuses ] = useSquareStatuses(gameModeKey)
 const [score, setScore] = useState<number>(0)
 const [highScore, setHighScore] = useHighScore(gameModeKey)

 const [currentDie, setCurrentDie] = useCurrentDie(gameModeKey)
 const [isGameOver, setIsGameOver] = useState(false)
 const [bank, setBank] = useBankedDie()
 const [lastPlacedLocation, setLastPlacedLocation] =useState<undefined | Array<number>>(undefined)

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

  const bankRoll = useCallback (() => {

     const newSquareStatuses= squareStatuses.map(function(row) {
        return row.slice()
     })

     const newRoll = bank ?? rollDie()

    //clear selectable cells
    if(lastPlacedLocation !== undefined){
      clearSelectableSquares(newSquareStatuses)
      setSelectable(newRoll, lastPlacedLocation[0], lastPlacedLocation[1], newSquareStatuses)
      setSquareStatuses(newSquareStatuses)
    }

    setBank(currentDie)
    setCurrentDie(newRoll)


  }, [lastPlacedLocation, squareStatuses, currentDie, setCurrentDie, bank, setBank, setSquareStatuses])

  const selectSquare = useCallback(
    (rowIndex: number, columnIndex:number) => {

      const newSquareStatuses= squareStatuses.map(function(row) {
         return row.slice()
      })

      const newRoll = rollDie()
      setLastPlacedLocation([rowIndex, columnIndex])

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
      setBank(undefined)
      setLastPlacedLocation(undefined)
    
    },
    [ setBank, setSquareStatuses, setCurrentDie],
  )

  return (
    <div className="flex  items-center justify-center bg-linear-to-t from-red-600 to-stone-400">
      <div className="flex flex-col  w-full max-w-xl content-start py-10 px-10 bg-stone-50/50 gap-x-2 gap-y-4">
        <Header  highScore={highScore} gameModeTitle={gameModeTitle} gameModeKey={gameModeKey} />
        <Title title={gameModeTitle}/>

        <div className='flex flex-row gap-4 justify-between items-end'>
          <NumberDisplay label='Score' color='red' numbers={[score]} />
          <NumberDisplay label='Current Roll' color='stone' numbers={[currentDie]} />
          <NumberDisplay label='Banked Roll' color='blue' numbers={[bank]} onClick={() => bankRoll()} />
        </div>
        <div className={`flex flex-col p-x-5 justify-center gap-2 text-center transition-[height] duration-500 overflow-hidden ${!isGameOver ? 'h-0' : 'h-25'}`}>
          <p className='text-5xl'>GAME OVER</p>
          <ShareButton score={score} squareStasuses={squareStatuses} gameModeTitle={gameModeTitle} />
        </div>
        <Board isGameOver={isGameOver} squareStatuses={squareStatuses} onSelectSquare={selectSquare} />
        <div className='flex flex-row justify-center items-center'>
          <Button onClick={() => resetGame()}>Reset Game</Button>
        </div>

        <div className='flex flex-col bg-stone-50 p-5 gap-2'>
            <p>Credits:</p>
            <p> Number Pyre is a variant game mode of <a className="underline" href="https://jennabarbara.github.io/number-pyle/">Number Pyle</a>, with a mechanic to bank a roll.</p>
            <p>The rules and mechanics of <a className="underline" href="https://jennabarbara.github.io/number-pyle/">Number Pyle</a> were invented by <a className="underline" href="https://lintilion.itch.io/">Lintilion</a></p>
            <p>This implementation is brought to you by <a className="underline" href="https://github.com/JennaBarbara/">JennaBarbara</a></p>
        </div>
      </div>
    </div>

  )
}



