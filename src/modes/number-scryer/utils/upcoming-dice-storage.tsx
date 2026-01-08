import { rollDie } from '../../../utils/rollDie.tsx';

const STORED_UPCOMING_DICE = "numberScryer.upcomingDice"


export function getStoredUpcomingDice(): Array<number> {
const rawStoredDice = typeof window !== "undefined" ? localStorage.getItem(STORED_UPCOMING_DICE) : undefined
  if(!rawStoredDice ) {
   return [rollDie(), rollDie()]
  }
  return JSON.parse(rawStoredDice)
}

export function setStoredUpcomingDice(dice: Array<number> ) {
  localStorage.setItem(STORED_UPCOMING_DICE , JSON.stringify(dice))
}
