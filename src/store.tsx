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
    game?: TicTacToe;
    gameState: GAME_STATE;
    player1Mark: Player;
    opponent: OPPONENT | null;
    setPlayer1Mark: (mark: Player) => void;
    startGameVSComputer: () => void;
    startGameVSPlayer: () => void;
    quitGame: () => void;
    endGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    gameState: GAME_STATE.LOADING,
    player1Mark: 'x',
    opponent: null,
    setPlayer1Mark: mark => set({ player1Mark: mark }),
    startGameVSComputer: () => {
        set({ 
            gameState: GAME_STATE.RUNNING,
            opponent: OPPONENT.CPU,
            game: new TicTacToe()
        })
    },
    startGameVSPlayer: () => {
        set({ 
            gameState: GAME_STATE.RUNNING,
            opponent: OPPONENT.PLAYER,
            game: new TicTacToe()
        })
    },
    quitGame: () => {
        set({ gameState: GAME_STATE.LOADING })
    },
    endGame: () => {
        set({ gameState: GAME_STATE.ENDED })
    }
}))
