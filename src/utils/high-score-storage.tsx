

const STORED_HIGH_SCORE_KEY = ".highScore"

export function getStoredHighScore(modeKey: string): number {
  const rawHighScore = localStorage.getItem(modeKey+STORED_HIGH_SCORE_KEY)
  if(rawHighScore && typeof parseInt(rawHighScore) === 'number' ) {
    return parseInt(rawHighScore)
  }
  return  0

}

export function setStoredHighScore(modeKey: string, highScore: number ) {
  localStorage.setItem(modeKey+STORED_HIGH_SCORE_KEY, highScore.toString())
}
