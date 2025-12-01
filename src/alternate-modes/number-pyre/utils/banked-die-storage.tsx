
const STORED_BANKED_DIE = "numberPyre.bankedDie"

export function getStoredBankedDie(): number | undefined {
  const rawDie = localStorage.getItem(STORED_BANKED_DIE)
  if(rawDie && typeof parseInt(rawDie) === 'number' ) {
    return parseInt(rawDie)
  }
}

export function setStoredBankedDie(die?: number ) {
  localStorage.setItem(STORED_BANKED_DIE, die ? die.toString() : '')
}
