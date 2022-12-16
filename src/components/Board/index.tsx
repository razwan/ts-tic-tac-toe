import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Button, Logo, Mark } from '../index';
import { OPPONENT, useGameStore } from '../../store';
import TicTacToe from '../TicTacToe/TicTacToe';
import { Player } from '../../types';

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

export const Board: React.FC = () => {
    const game = useGameStore( state => state.game );
    const endGame = useGameStore( state => state.endGame );
    const restartGame = useGameStore( state => state.opponent === OPPONENT.CPU ? state.startGameVSComputer : state.startGameVSPlayer );
    const forceUpdate = useForceUpdate();
    const currentPlayer = useGameStore( state => state.game.currentPlayer );

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
            <div className="board__header">
                <div>
                    <Logo colored />
                </div>
                <div>
                    <div className="surface">
                        <Mark mark={ currentPlayer } />
                        <h4>Turn</h4>
                    </div>
                </div>
                <div>
                    <Button isTertiary onClick={ () => { restartGame() } }>Restart</Button>
                </div>
            </div>
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
            <BoardFooter />
        </div>
    );
}

const BoardFooter: React.FC = () => {
    const player1Mark = useGameStore( state => state.player1Mark );
    const player1Score = useGameStore( state => state.player1Score );
    const opponentScore = useGameStore( state => state.opponentScore );
    const ties = useGameStore( state => state.ties );

    const opponentLabel = useGameStore( state => state.opponent === OPPONENT.CPU ? 'CPU' : 'P2' );
    const XLabel = player1Mark === 'x' ? 'YOU' : opponentLabel;
    const XScore = player1Mark === 'x' ? player1Score : opponentScore;
    const OLabel = player1Mark === 'o' ? 'YOU' : opponentLabel;
    const OScore = player1Mark === 'o' ? player1Score : opponentScore;

    return (
        <div className="board__footer">
            <div className="board__footer-cell">
                <p>{ `X (${ XLabel })` }</p>
                <h2>{ XScore }</h2>
            </div>
            <div className="board__footer-cell">
                <p>Ties</p>
                <h2>{ ties }</h2>
            </div>
            <div className="board__footer-cell">
                <p>{ `O (${ OLabel })` }</p>
                <h2>{ OScore }</h2>
            </div>
        </div>
    )
}