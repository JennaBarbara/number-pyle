import { useState, useEffect } from 'react';
import {getStoredHighScore, setStoredHighScore} from './high-score-storage'

export function useHighScore(modeKey:string): [number, React.Dispatch<React.SetStateAction<number>>] {
    const [highScore, setHighScore] = useState<number>(getStoredHighScore(modeKey))

    useEffect(()=>{
        setStoredHighScore(modeKey, highScore)
    }, [highScore, modeKey])

    return [highScore, setHighScore]
}