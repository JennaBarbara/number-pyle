import { useState, useEffect } from 'react';
import { getStoredBankedDie, setStoredBankedDie } from './banked-die-storage';

export function useBankedDie(): [number| undefined, React.Dispatch<React.SetStateAction<number | undefined>>] {
     const [bankedDie, setBankedDie] = useState<number | undefined>(getStoredBankedDie())

    useEffect(()=>{
        setStoredBankedDie(bankedDie)
    }, [bankedDie])

    return [bankedDie, setBankedDie]
}