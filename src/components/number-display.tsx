interface NumberDisplayProps {
    numbers: Array<number | undefined>,
    color: 'red' | 'blue' | 'stone',
    label:string,
    onClick?: () => void,
}
export default function NumberDisplay({numbers, color, label, onClick}:NumberDisplayProps) {
    
    const bgColor = `bg-${color}-200`

    return (
          <div 
            className={`${onClick !== undefined && 'cursor-pointer'} flex flex-col text-center items-center justify-end gap-2 outline-1 outline-stone-200 rounded-md p-2 bg-stone-200/50`}
            onClick={onClick}
          >
                <p className='text-lg sm:text-xl'>{label}</p>
                <div className="flex flex-row gap-2">
                     {numbers.map((roll, index) => (
                        <div key={`${label}-${index}`}
                        className={`flex flex-col rounded-md justify-center gap-4 text-center text-lg size-8 md:size-16 md:text-2xl ${bgColor}`}
                        >
                            {roll === undefined ? '' : roll}
                        </div>
                    ))} 
                    {numbers.length == 0 &&  <div className={`flex flex-col rounded-md bg-stone-200 justify-center gap-4 text-center text-lg size-8 md:size-16 md:text-2xl`} />
                    }
                </div>
          </div>
    )
    
}