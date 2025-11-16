import type { SquareStatus } from "../App"

interface SquareProps {
    index: string
    squareStatus: SquareStatus
    onClick?: () => void, 
}

export default function Square({squareStatus, index, onClick}: SquareProps ) {

const variant = squareStatus.selectable ? 'bg-white cursor-pointer' : "bg-stone-500"

return (
    <div 
        className={` ${variant} rounded-md size-8 md:size-16`}
        onClick={squareStatus.selectable ? onClick : undefined}
        >
        <p>{index}</p>
        <p>{squareStatus.number}</p>
    </div>
)

}