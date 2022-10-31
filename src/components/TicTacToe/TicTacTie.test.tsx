import TicTacToe from './TicTacToe';

test( 'can insert a symbol', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );

    expect( game.board[0][0] ).toBe( 'x' );
} );

test( 'current player alternation works', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );
    game.insert( 0, 1 );

    expect( game.board[0][1] ).toBe( 'o' );
} );

test( 'game can be won a column', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );
    game.insert( 0, 1 );
    game.insert( 1, 0 );
    game.insert( 1, 1 );
    game.insert( 2, 0 );

    expect( game.ended ).toBe( true );
    expect( game.winner ).toBe( 'x' );
    expect( game.connected ).toEqual( [
        [ 0, 0 ], [ 1, 0 ], [ 2, 0 ],
    ] );
} );

test( 'game can be won a column', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );
    game.insert( 1, 0 );
    game.insert( 0, 1 );
    game.insert( 1, 1 );
    game.insert( 0, 2 );

    expect( game.ended ).toBe( true );
    expect( game.winner ).toBe( 'x' );
    expect( game.connected ).toEqual( [
        [ 0, 0 ], [ 0, 1 ], [ 0, 2 ],
    ] );
} );

test( 'game can be won on the first diagonal', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );
    game.insert( 1, 0 );
    game.insert( 1, 1 );
    game.insert( 2, 0 );
    game.insert( 2, 2 );

    expect( game.ended ).toBe( true );
    expect( game.winner ).toBe( 'x' );
    expect( game.connected ).toEqual( [
        [ 0, 0 ], [ 1, 1 ], [ 2, 2 ],
    ] );
} );

test( 'game can be won on the second diagonal', () => {
    const game = new TicTacToe();

    game.insert( 0, 2 );
    game.insert( 1, 0 );
    game.insert( 1, 1 );
    game.insert( 0, 1 );
    game.insert( 2, 0 );

    expect( game.ended ).toBe( true );
    expect( game.winner ).toBe( 'x' );
    expect( game.connected ).toEqual( [
        [ 0, 2 ], [ 1, 1 ], [ 2, 0 ],
    ] );
} );

test( 'game can be drawn', () => {
    const game = new TicTacToe();
    const moves = [
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 2, 2 ],
        [ 1, 1 ],
        [ 2, 1 ],
        [ 2, 0 ],
        [ 1, 0 ],
        [ 0, 0 ],
    ];

    moves.forEach( move => { game.insert( move[0], move[1] ) } );

    expect( game.ended ).toBe( true );
    expect( game.winner ).toBeUndefined();
    expect( game.connected ).toBeUndefined();
} );

test( 'cannot insert in cell that is not empty', () => {
    const game = new TicTacToe();

    game.insert( 0, 1 );
    
    expect( () => {
        game.insert( 0, 1 );
    } ).toThrow();
} );

test( 'cannot insert if game ended', () => {
    const game = new TicTacToe();

    game.insert( 0, 0 );
    game.insert( 1, 0 );
    game.insert( 0, 1 );
    game.insert( 1, 1 );
    game.insert( 0, 2 );

    expect( () => {
        game.insert( 2, 2 );
    } ).toThrow();
} );

