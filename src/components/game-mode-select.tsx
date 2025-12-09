import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { NavLink } from 'react-router'

export default function GameModeSelect(){


  return (
<Menu>
      <MenuButton className="focus-visible:outline-0">
        <div className="p-2 cursor-pointer rounded-md bg-radial-[at_25%_25%] from-white via-stone-200 to-stone-100 hover:via-stone-100 hover:to-white disabled:opacity-50">
          Game Mode
        </div></MenuButton>
      <MenuItems anchor="bottom" className="mt-1 outline-0 border-0 rounded-md bg-stone-200 divide-solid divide-y-2 divide-white data-focus:outline-red">
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
             Number Scryer
          </NavLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  
  )
}