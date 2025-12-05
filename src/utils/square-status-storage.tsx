
import type { SquareStatus } from "./square-status"

const STORED_SQUARE_STATUSES_KEY = ".squareStasuses"


export function getStoredSquareStatuses(modeKey: string): Array<Array<SquareStatus>> | undefined {
  const rawStoredStatus = localStorage.getItem(modeKey+STORED_SQUARE_STATUSES_KEY)
  if(!rawStoredStatus) {
    return undefined
  }
  const storedStatus = JSON.parse(rawStoredStatus)
  return storedStatus
}

export function setStoredSquareStatuses(modeKey: string, squareStatuses: Array<Array<SquareStatus>> ) {
  localStorage.setItem(modeKey+STORED_SQUARE_STATUSES_KEY, JSON.stringify(squareStatuses))
}
