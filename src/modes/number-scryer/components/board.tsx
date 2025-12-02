interface BoardProps {
    children:  React.ReactNode,
    isGameOver: boolean
}



export default function Board({
  children,
  isGameOver
}: BoardProps) {
    const variant = isGameOver? 'opacity-75' : ''

    return (
         <div className={`${variant} bg-stone-50 rounded-md`}>
            <div className='p-4 grid grid-flow-row grid-cols-9 grid-rows-9 gap-1 md:gap-2'>
                {children}
            </div>
        </div>        
    )
}