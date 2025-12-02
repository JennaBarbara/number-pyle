import { useState, useEffect } from 'react';
import { getStoredCurrentDie, setStoredCurrentDie } from './current-die-storage';

export function useCurrentDie(): [number, React.Dispatch<React.SetStateAction<number>>] {
     const [currentDie, setCurrentDie] = useState<number>(getStoredCurrentDie())

    useEffect(()=>{
        setStoredCurrentDie(currentDie)
    }, [currentDie])

    return [currentDie, setCurrentDie]
}