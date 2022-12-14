type Mark = 'x' | 'o';
type Cell = Mark | undefined;
type Row = [Cell, Cell, Cell];
type Board = [Row, Row, Row];
type Position = [number, number];
type Connected = [Position, Position, Position];

class TicTacToe {
    private _board: Board;
    private _currentPlayer: Mark;
    private _ended: Boolean;
    private _winner: Mark | undefined;
    private _connected: Array<Position> | undefined;

    constructor() {
        this._board = [
            [ undefined, undefined, undefined ],
            [ undefined, undefined, undefined ],
            [ undefined, undefined, undefined ],
        ]

        this._currentPlayer = 'x';
    }

    private checkWin() {

        const rows = [ 0, 1, 2 ].map( rowIndex => {
            return [ 0, 1, 2 ].map( columnIndex => [ rowIndex, columnIndex ] )
        } );

        const columns = rows.map( row => row.map( ( [ x, y ] ) => [ y, x ] ) );
        const diagonals = [
            [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ] ],
            [ [ 0, 2 ], [ 1, 1 ], [ 2, 0 ] ],
        ]

        const possibilities = [
            ...rows,
            ...columns,
            ...diagonals
        ] as Array<Connected>;

        return possibilities.find( set => {
            const first = this._board[ set[0][0] ][ set[0][1] ];

            return first !== undefined && set.every( pos => {
                const current = this._board[ pos[0] ][ pos[1] ];
                return current === first;
            } );
        } );
    }

    private checkDraw() {
        return this._board.every( row => row.every( cell => cell !== undefined ) );
    }

    private assertLegalMove( rowIndex: number, columnIndex: number ) {

        if ( this._ended ) {
            throw new Error( 'Game ended' );
        }
        if ( this._board[ rowIndex ][ columnIndex ] !== undefined ) {
            throw new Error( 'Illegal move' );
        }
    }

    public insert( rowIndex: number, columnIndex: number ) {
        this.assertLegalMove( rowIndex, columnIndex );

        this._board[ rowIndex ][ columnIndex ] = this._currentPlayer;
        this._connected = this.checkWin();

        if ( this._connected ) {
            this._ended = true;
            this._winner = this._currentPlayer;
            return;
        }

        if ( this.checkDraw() ) {
            this._ended = true;
            return;
        }

        this._currentPlayer = this._currentPlayer === 'x' ? 'o' : 'x';
    }

    public cpuMove() {
        const emptyCells = [ 0, 1, 2 ].flatMap( rowIndex => {
            return [ 0, 1, 2 ].map( columnIndex => [ rowIndex, columnIndex ] )
        } ).filter( ( [ rowIndex, columnIndex ] ) => this._board[ rowIndex ][ columnIndex ] === undefined );

        const randomIndex = Math.floor( Math.random() * emptyCells.length );
        return emptyCells[ randomIndex ];
    }

    get board() {
        return this._board;
    }

    get winner() {
        return this._winner;
    }

    get ended() {
        return this._ended; 
    }

    get connected() {
        return this._connected;
    }

    get currentPlayer() {
        return this._currentPlayer;
    }
}

export default TicTacToe;
