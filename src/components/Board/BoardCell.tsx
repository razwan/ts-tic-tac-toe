import classnames from 'classnames';

import { Player } from '../../types';

import { Mark } from '../index';

// ### CONDITIONAL TYPE
type GetSymbol<BoardCell> = BoardCell extends { symbol: infer BoardSymbol } ? BoardSymbol : never;
type Symbol = GetSymbol<BoardCellProps>;

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
