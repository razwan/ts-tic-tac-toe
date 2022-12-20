import { useCallback } from 'react';

import { OPPONENT, useGameStore } from '../../store';

import { BoardHeader } from './BoardHeader';
import { BoardCell } from './BoardCell';
import { BoardFooter } from './BoardFooter';
import { useCPU } from './useCPU';
import { useForceUpdate } from './useForceUpdate';

export const Board: React.FC = () => {
    const game = useGameStore( state => state.game );
    const endGame = useGameStore( state => state.endGame );
    const playingVSComputer = useGameStore( state => state.opponent === OPPONENT.CPU );
    const player1Mark = useGameStore( state => state.player1Mark );
    const forceUpdate = useForceUpdate();

    const updateState = useCallback( () => {
        if ( game.ended ) {
            endGame();
        } else {
            forceUpdate();
        }
    }, [ game ] );

    useCPU( game, updateState );

    const onCellClick = useCallback( ( row: number, column: number ) => {
        try {
            game.insert( row, column );
            updateState();
        } catch( error ) {

        }
    }, [ game ] )

    return (
        <div className="board__wrapper">
            <BoardHeader />
            <div className={ 'board' }>
                { game.board.map( ( row, rowIdx ) => row.map( ( symbol, columnIdx ) => {
                    const isEmpty = symbol === undefined;
                    const isPlayerTurn = ! playingVSComputer || game.currentPlayer === player1Mark;
                    const isClickable = ! game.ended && isEmpty && isPlayerTurn;
                    const isConnected = game.connected && !! game.connected.find( ( [ x, y ] ) => x === rowIdx && y === columnIdx );
                    const onClick = isPlayerTurn ? () => { onCellClick( rowIdx, columnIdx ) } : undefined;
                    
                    return (
                        <BoardCell 
                            key={ `${ rowIdx }-${ columnIdx }` }
                            onClick={ onClick }
                            symbol={ symbol ?? game.currentPlayer }
                            isFilled={ symbol !== undefined }
                            isClickable={ isClickable } 
                            isConnected={ isConnected } 
                        />
                        ) 
                    } ) ) }
            </div>
            <BoardFooter />
        </div>
    );
}
