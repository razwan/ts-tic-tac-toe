import classnames from 'classnames';
import { Mark } from "../index";
import TicTacToe from '../TicTacToe/TicTacToe';

import { useCallback, useRef, useState } from 'react';

type Player = 'x' | 'o';
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

export const Board: React.FunctionComponent<any> = ( props ) => {
    const game = useRef( new TicTacToe() );
    const [ board, setBoard ] = useState( game.current.board );
    const [ winner, setWinner ] = useState( game.current.winner );
    const [ ended, setEnded ] = useState( game.current.ended );
    const [ currentPlayer, setCurrentPlayer ] = useState( game.current.currentPlayer );
    const [ connected, setConnected ] = useState( game.current.connected );

    const onCellClick = useCallback( ( row: number, column: number ) => {
        try {
            game.current.insert( row, column );
            setBoard( game.current.board );
            setCurrentPlayer( game.current.currentPlayer );
            setEnded( game.current.ended );
            setWinner( game.current.winner );
            setConnected( game.current.connected );
        } catch( error ) {

        }
    }, [] )

    return (
        <div className={ 'board' }>
            { board.map( ( row, rowIdx ) => row.map( ( symbol, columnIdx ) => {
                const isClickable = ! ended && symbol === undefined;
                const isConnected = connected && !! connected.find( ( [ x, y ] ) => x === rowIdx && y === columnIdx );

                return (
                    <BoardCell 
                        key={ `${ rowIdx }-${ columnIdx }` }
                        onClick={ () => { onCellClick( rowIdx, columnIdx )} } 
                        symbol={ symbol ?? currentPlayer }
                        isFilled={ symbol !== undefined }
                        isClickable={ isClickable } 
                        isConnected={ isConnected } 
                    />
                ) 
            } ) ) }
        </div>
    );
}