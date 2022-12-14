import classnames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import { OPPONENT } from '../../store';
import { Mark } from "../index";
import TicTacToe from '../TicTacToe/TicTacToe';
import { useGameStore } from '../../store';
import { Player } from '../../types';

type BoardSymbol = Player | undefined;

type BoardCellProps = {
    symbol: BoardSymbol,
    isClickable: boolean,
    onClick?: Function,
    isConnected?: boolean,
    isFilled?: boolean
}

export const BoardCell: React.FunctionComponent<BoardCellProps> = ( props ) => {
    const { isClickable, isConnected, isFilled, symbol } = props;
    const onClick = props.onClick ?? (() => {});

    const className = classnames(
        'board__cell',
        {
            'board__cell--x': symbol === 'x',
            'board__cell--o': symbol === 'o',
            'board__cell--clickable': isClickable,
            'board__cell--connected': isConnected
        }
    );
    
    return (
        <div className={ className } onClick={ () => { onClick() } }>
            { ( isFilled || isClickable ) && <Mark mark={ symbol } /> }
        </div>
    )
}

const useCPU = ( game: TicTacToe, callback: Function ) => {
    const opponent = useGameStore( state => state.opponent );
    const player1Mark = useGameStore( state => state.player1Mark );

    useEffect( () => {
        if ( opponent === OPPONENT.CPU && game.currentPlayer !== player1Mark ) {
            const [ row, column ] = game.cpuMove();
            game.insert( row, column );
            callback();
        }
    }, [ game.currentPlayer ] )
}

const useForceUpdate = () => {
    const [ count, setCount ] = useState( 0 );
    return useCallback( () => setCount( ( count ) => count + 1 ), [] );
}

export const Board: React.FunctionComponent<any> = ( props ) => {
    const game = useGameStore( state => state.game );
    const gameState = useGameStore( state => state.gameState );
    const endGame = useGameStore( state => state.endGame );
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
        <div className={ 'board' }>
            { game.board.map( ( row, rowIdx ) => row.map( ( symbol, columnIdx ) => {
                const isClickable = ! game.ended && symbol === undefined;
                const isConnected = game.connected && !! game.connected.find( ( [ x, y ] ) => x === rowIdx && y === columnIdx );

                return (
                    <BoardCell 
                        key={ `${ rowIdx }-${ columnIdx }` }
                        onClick={ () => { onCellClick( rowIdx, columnIdx )} } 
                        symbol={ symbol ?? game.currentPlayer }
                        isFilled={ symbol !== undefined }
                        isClickable={ isClickable } 
                        isConnected={ isConnected } 
                    />
                ) 
            } ) ) }
        </div>
    );
}