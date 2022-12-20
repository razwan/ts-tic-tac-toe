import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Mark } from '../index';
import { OPPONENT, useGameStore } from '../../store';
import TicTacToe from '../TicTacToe/TicTacToe';
import { Player } from '../../types';

import { BoardFooter } from './BoardFooter';

type BoardSymbol = Player | undefined;

type Clickable = {
    isClickable: boolean,
    onClick?: Function,
}

// ### INTERSECTION TYPE
type BoardCellProps = Clickable & {
    symbol: BoardSymbol,
    isConnected?: boolean,
    isFilled?: boolean
}

type GetSymbol<BoardCell> = BoardCell extends { symbol: infer BoardSymbol } ? BoardSymbol : never;
type Symbol = GetSymbol<BoardCellProps>;

export const BoardCell: React.FunctionComponent<BoardCellProps> = ( props ) => {
    const { isClickable, isConnected, isFilled } = props;
    // ### CONDITIONAL TYPE
    const symbol: Symbol = props.symbol;
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

const useCPU = ( game: TicTacToe<Player>, callback: Function ) => {
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

const useForceUpdate = () => {
    const [ count, setCount ] = useState( 0 );
    return useCallback( () => setCount( ( count ) => count + 1 ), [] );
}

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
