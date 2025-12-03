import { rollDie } from "./rollDie"


const STORED_CURRENT_DIE_KEY = ".currentDie"

export function getStoredCurrentDie(modeKey: string): number {
  const rawDie = localStorage.getItem(modeKey+STORED_CURRENT_DIE_KEY)
  if(rawDie && typeof parseInt(rawDie) === 'number' ) {
    return parseInt(rawDie)
  }
  return  rollDie()
}

export function setStoredCurrentDie(modeKey: string, die: number ) {
  localStorage.setItem(modeKey+STORED_CURRENT_DIE_KEY, die.toString())
}
