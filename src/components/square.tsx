import type { SquareStatus } from "../App"

interface SquareProps {
    index: string
    squareStatus: SquareStatus
    onClick?: () => void, 
}

export default function Square({squareStatus, onClick}: SquareProps ) {

const variant = squareStatus.selectable ? 'bg-white cursor-pointer': squareStatus.number ? "bg-blue-500" : squareStatus.scored? "bg-red-500" : "bg-stone-500"

return (
    <div 
        className={` ${variant} rounded-md size-8 md:size-16`}
        onClick={squareStatus.selectable ? onClick : undefined}

        >
        <p className="text-lg">{squareStatus.number}</p>
    </div>
)

}