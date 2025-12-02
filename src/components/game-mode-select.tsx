import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Button from './button'
import { NavLink } from 'react-router'

export default function GameModeSelect(){


  return (
<Menu>
      <MenuButton className="focus-visible:outline-0"><Button size="sm">Game Mode</Button></MenuButton>
      <MenuItems anchor="bottom" className="mt-1 outline-0 border-2 rounded-md bg-stone-200 divide-solid divide-y-2 data-focus:outline-red">
        <MenuItem>
          <NavLink className="p-2 block data-focus:bg-white " to="/number-pyle">
            Number Pyle
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink className="p-2 block data-focus:bg-white " to="/number-pyle/number-pyre">
             Number Pyre
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink className="p-2 block data-focus:bg-white " to="/number-pyle/number-scryer">
             Number Pyre
          </NavLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  
  )
}