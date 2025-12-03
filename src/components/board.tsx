import type { SquareStatus } from "../utils/square-status"
import Square from "./square"

interface BoardProps {
    isGameOver: boolean,
    squareStatuses: Array<Array<SquareStatus>>
    onSelectSquare: (rowIndex: number, columnIndex: number) => void, 
}



export default function Board({
  isGameOver,
  squareStatuses,
  onSelectSquare
}: BoardProps) {
    const variant = isGameOver? 'opacity-75' : ''

    return (
         <div className={`${variant} bg-stone-50 rounded-md`}>
            <div className='p-4 grid grid-flow-row grid-cols-9 grid-rows-9 gap-1 md:gap-2'>
                            {squareStatuses.map((squareStatusRow, rowIndex) =>(
                               squareStatusRow.map((squareStatus, columnIndex) => (
                                 <Square 
                                  squareStatus={squareStatus} 
                                  index={`${rowIndex}-${columnIndex}`} 
                                  key={`square-${rowIndex}-${columnIndex}`} 
                                  onClick={()=>onSelectSquare(rowIndex, columnIndex)} />
                               )       
                            )))}
            </div>
        </div>        
    )
}