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
        className={` ${variant} flex flex-col rounded-md  justify-center gap-4 text-center text-lg size-8 md:size-16 md:text-2xl`}
        onClick={squareStatus.selectable ? onClick : undefined}
        >
          {squareStatus.number}
    </div>
)

}