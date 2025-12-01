import { rollDie } from "./rollDie"


const STORED_CURRENT_DIE = "numberPyre.currentDie"

export function getStoredCurrentDie(): number {
  const rawDie = localStorage.getItem(STORED_CURRENT_DIE)
  if(rawDie && typeof parseInt(rawDie) === 'number' ) {
    return parseInt(rawDie)
  }
  return  rollDie()
}

export function setStoredCurrentDie(die: number ) {
  localStorage.setItem(STORED_CURRENT_DIE, die.toString())
}
