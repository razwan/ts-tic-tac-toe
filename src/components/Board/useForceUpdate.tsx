import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
    const [ count, setCount ] = useState( 0 );
    return useCallback( () => setCount( ( count ) => count + 1 ), [] );
}
