export default function Board({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


    return (
         <div className='bg-stone-50'>
            <div className='p-4 grid grid-flow-row grid-cols-9 grid-rows-9 gap-1 md:gap-2'>
                {children}
            </div>
        </div>        
    )
}