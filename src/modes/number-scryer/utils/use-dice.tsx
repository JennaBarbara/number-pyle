import { useState, useEffect, useCallback } from 'react';
import { getStoredCurrentDie, setStoredCurrentDie } from '../../../utils/current-die-storage'
import { getStoredUpcomingDice, setStoredUpcomingDice } from './upcoming-dice-storage';
import { rollDie } from '../../../utils/rollDie.tsx';

export function useDice(modeKey: string): [number,Array<number>, ()=>void, ()=>void ] {
     const [currentDie, setCurrentDie] = useState<number>(getStoredCurrentDie(modeKey))
     const [upcomingDice, setUpcomingDice] = useState<Array<number>>(getStoredUpcomingDice())


    useEffect(()=>{
        setStoredCurrentDie(modeKey, currentDie)
    }, [modeKey,currentDie])


    useEffect(()=>{
        setStoredUpcomingDice(upcomingDice)
    }, [upcomingDice])

    const updateCurrentDie = useCallback((()=>{
        setCurrentDie(upcomingDice[0])
        setUpcomingDice([upcomingDice[1], rollDie()]) 

    }),[ setCurrentDie, upcomingDice, setUpcomingDice])

    const resetDice = useCallback((()=>{
        setCurrentDie(rollDie())
        setUpcomingDice([rollDie(), rollDie()]) 

    }),[ setCurrentDie,  setUpcomingDice])

    return [currentDie, upcomingDice, updateCurrentDie, resetDice]
}