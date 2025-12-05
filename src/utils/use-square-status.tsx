import { useState, useEffect } from 'react';
import type { SquareStatus } from './square-status';
import { getStoredSquareStatuses, setStoredSquareStatuses } from './square-status-storage';
import { getDefaultStatus } from './common-game-utils'

export function useSquareStatuses(modeKey: string): [Array<Array<SquareStatus>> , React.Dispatch<React.SetStateAction<Array<Array<SquareStatus>> >>] {
     const [SquareStatuses, setSquareStatuses] = useState<Array<Array<SquareStatus>>>(getStoredSquareStatuses(modeKey) || getDefaultStatus())

    useEffect(()=>{
        setStoredSquareStatuses(modeKey, SquareStatuses)
    }, [modeKey, SquareStatuses])

    return [SquareStatuses, setSquareStatuses]
}