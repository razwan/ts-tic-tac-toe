import classnames from 'classnames';
import { Mark, Surface } from "../index";

type Player = 'x' | 'o';
type BoardSymbol = Player | '';
type BoardRow = [BoardSymbol, BoardSymbol, BoardSymbol];
type BoardConfig = [BoardRow, BoardRow, BoardRow];

type BoardCellProps = {
    symbol: BoardSymbol,
    isClickable: boolean
}

export const BoardCell: React.FunctionComponent<BoardCellProps> = ( props ) => {
    const { isClickable, symbol } = props;

    const className = classnames(
        'board__cell',
        {
            'board__cell--clickable': isClickable
        }
    );
    
    return (
        <div className={ className }>
            <Mark mark={ symbol } />   
        </div>
    )
}

export const Board: React.FunctionComponent<any> = ( props ) => {
    const currentPlayer: Player = 'x';

    const state: BoardConfig = [
        ['x', '', ''],
        ['', 'x', ''],
        ['', 'o', ''],
    ];

    return (
        <div className={ 'board' }>
            { state.map( ( row, rowIdx ) => row.map( ( symbol, symbolIdx ) => {
                const isClickable = symbol === '';
                return (
                    <Surface key={ `${ rowIdx }-${ symbolIdx }` }>
                        <BoardCell symbol={ symbol || currentPlayer } isClickable={ isClickable } />
                    </Surface>
                ) 
            } ) ) }
        </div>
    );
}