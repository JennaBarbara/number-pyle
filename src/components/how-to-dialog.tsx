import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

import Button from './button'

export default function HowToDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='flex flex-col items-end pt-6'>
        <Button size="sm" onClick={() => setIsOpen(true)}>How to play</Button>
      </div>  
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 outline-0 flex w-screen items-center justify-center p-4 bg-stone-700/25">
          <DialogPanel className="max-w-lg rounded-md space-y-4 bg-white p-12">
            <DialogTitle className="font-bold">How To Play</DialogTitle>
            <ul className="list-disc gap-6">
                <li>
                    Look at your current roll, it will be a random number between 1 and 6
                </li>
                <li>
                    You may choose to store your current roll in the bank by picking the bank cell. If you do, your current roll with be replaced by the current contents of the bank, or a new roll if the bank is empty
                </li>
                <li>
                    Pick a central cell on either side as your starting cell, your current roll will be placed there
                </li>
                <li>
                    Every time you place a number, you will get a new roll. If it's even you may place it on one of the last cell's sides, if it's odd you may place it on one of the cells diagonal to the last cell
                </li>
                <li>
                    If two of the same number are 1 or more spaces away from each other in a straight, vertical/horizontal line with no other numbers in between, that's a NumberPyle and the cells in between are scored. Each scored cell is one point, and the filled cells can't be used to place numbers later
                </li>
                <li>
                    The game ends when you can't place your current roll
                </li>
            </ul>
            <div className='flex flex-col items-end pt-6'>
                <Button size="sm" onClick={() => setIsOpen(false)}><b>Close</b></Button>
            </div>  
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}