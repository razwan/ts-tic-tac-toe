import create from 'zustand'
import TicTacToe from './components/TicTacToe/TicTacToe';
import type { Player } from './types';

export enum GAME_STATE {
    LOADING = 0,
    RUNNING = 1,
    ENDED = 2
};

export enum OPPONENT {
    CPU = 0,
    PLAYER = 1
}

type GameStore = {
    game?: TicTacToe<Player>;
    gameState: GAME_STATE;
    player1Mark: Player;
    player1Score: number;
    opponentScore: number;
    ties: number;
    opponent: OPPONENT | null;
    setPlayer1Mark: (mark: Player) => void;
    startGameVSComputer: () => void;
    startGameVSPlayer: () => void;
    quitGame: () => void;
    endGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    gameState: GAME_STATE.LOADING,
    player1Score: 0,
    opponentScore: 0,
    ties: 0,
    player1Mark: 'x',
    opponent: null,
    setPlayer1Mark: mark => set({ player1Mark: mark }),
    startGameVSComputer: () => {
        set({ 
            gameState: GAME_STATE.RUNNING,
            opponent: OPPONENT.CPU,
            game: new TicTacToe<Player>( 'x', 'o' )
        })
    },
    startGameVSPlayer: () => {
        set({ 
            gameState: GAME_STATE.RUNNING,
            opponent: OPPONENT.PLAYER,
            game: new TicTacToe<Player>( 'x', 'o' )
        })
    },
    quitGame: () => {
        set({ gameState: GAME_STATE.LOADING })
    },
    endGame: () => {
        set( state => {
            const hasWinner = !! state.game?.winner;
            const gameWon = hasWinner && state.game.winner === state.player1Mark;
            const gameLost = hasWinner && ! gameWon;

            return { 
                gameState: GAME_STATE.ENDED,
                opponentScore: gameLost ? state.opponentScore + 1 : state.opponentScore,
                ties: ! hasWinner ? state.ties + 1 : state.ties,
                player1Score: gameWon ? state.player1Score + 1 : state.player1Score
            }
        } );
    }
}))
