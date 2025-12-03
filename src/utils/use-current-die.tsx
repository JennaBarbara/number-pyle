import { useState, useEffect } from 'react';
import { getStoredCurrentDie, setStoredCurrentDie } from './current-die-storage';

export function useCurrentDie(modeKey: string): [number, React.Dispatch<React.SetStateAction<number>>] {
     const [currentDie, setCurrentDie] = useState<number>(getStoredCurrentDie(modeKey))

    useEffect(()=>{
        setStoredCurrentDie(modeKey, currentDie)
    }, [modeKey, currentDie])

    return [currentDie, setCurrentDie]
}