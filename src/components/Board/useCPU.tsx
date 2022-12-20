import { useEffect } from 'react';

import TicTacToe from '../TicTacToe/TicTacToe';
import { OPPONENT, useGameStore } from '../../store';
import { Player } from '../../types';

export const useCPU = ( game: TicTacToe<Player>, callback: Function ) => {
    const opponent = useGameStore( state => state.opponent );
    const player1Mark = useGameStore( state => state.player1Mark );

    useEffect( () => {
        if ( opponent === OPPONENT.CPU && game.currentPlayer !== player1Mark ) {
            (async () => {
                const [ row, column ] = await game.cpuMove();
                game.insert( row, column );
                callback();
            })();
        }
    }, [ game.currentPlayer ] )
}