import { useState, useEffect } from 'react';
import {getStoredHighScore, setStoredHighScore} from './high-score-storage'

export function useHighScoreStorage(): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [highScore, setHighScore] = useState<number>(getStoredHighScore())

    useEffect(()=>{
        setStoredHighScore(highScore)
    }, [highScore])

    return [highScore, setHighScore]
}