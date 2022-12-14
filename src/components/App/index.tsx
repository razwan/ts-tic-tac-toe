import { useCallback } from 'react';
import { Board, Button, Logo, Mark, Surface, Switch, Wrapper } from '../index';
import { Player } from '../../types';
import { GAME_STATE, OPPONENT, useGameStore } from '../../store';

export const HomeView: React.FC = ( props ) => {
    const [ startGameVSComputer, startGameVSPlayer ] = useGameStore( state => [ state.startGameVSComputer, state.startGameVSPlayer ] );

    return (
        <Wrapper>
            <Logo />
            <Surface>
                <h3>Pick player 1's mark</h3>
                <Switch />
                <p>Remember: X goes first</p>
            </Surface>
            <Button isPrimary isLarge onClick={ startGameVSComputer }>New Game (vs CPU)</Button>
            <Button isLarge onClick={ startGameVSPlayer } isSecondary>New Game (vs Player)</Button>
        </Wrapper>
    );
}

type OverlayProps = {
    show: boolean,
    children: React.ReactNode,
}

const Overlay: React.FC<OverlayProps> = props => {
    const { children, show } = props;

    if ( ! show ) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="overlay__content">
                { children }
            </div>
        </div>
    )
}

type GameEndedOverlayProps = {
    onQuit: () => void,
    onNextRound: () => void,
    winner: Player | undefined,
    show: boolean,
    title: string,
    subtitle: string,
}

const GameEndedOverlayWrapper: React.FC = () => {
    const game = useGameStore( state => state.game );
    const gameState = useGameStore( state => state.gameState );
    const opponent = useGameStore( state => state.opponent );
    const player1Mark = useGameStore( state => state.player1Mark );
    const startGameVSComputer = useGameStore( state => state.startGameVSComputer );
    const startGameVSPlayer = useGameStore( state => state.startGameVSPlayer );
    const quitGame = useGameStore( state => state.quitGame );

    console.log( 'GameEndedOverlayWrapper', gameState );
    
    const onQuit = useCallback( quitGame, [] );

    const onNextRound = useCallback( () => {
        if ( opponent === OPPONENT.CPU ) {
            startGameVSComputer();
        } else {
            startGameVSPlayer();
        }
    }, [ opponent ] );

    return (
        <GameEndedOverlay 
            winner={ game?.winner }
            onQuit={ onQuit }
            onNextRound={ onNextRound }
            show={ gameState === GAME_STATE.ENDED }
            subtitle={ game?.winner === player1Mark ? 'You won!' : 'You lost...' }
            title={ game?.winner ? 'Takes the round' : 'Round tied' }
        />
    )
}

const GameEndedOverlay: React.FC<GameEndedOverlayProps> = props => {
    const { show, winner, title, subtitle, onQuit, onNextRound } = props;

    return (
        <Overlay show={ show }>
            { winner && <h4>{ subtitle }</h4> }
            <div className={ `winner winner--${ winner }` }>
                { winner && <div className="winner__mark">
                    <Mark mark={ winner } />
                </div> }
                <div className="winner__text">
                    <h1>{ title }</h1>
                </div>
            </div>
            <div className="button-list">
                <Button isTertiary onClick={ () => { onQuit() } }>Quit</Button>
                <Button onClick={ () => { onNextRound() } }>Next Round</Button>
            </div>
        </Overlay> 
    )
}

export const App: React.FC = ( props ) => {
    const gameState = useGameStore( state => state.gameState );

    return (
        <Wrapper>
            { gameState === GAME_STATE.LOADING && <HomeView /> }
            { gameState !== GAME_STATE.LOADING && <Board /> }
            <GameEndedOverlayWrapper />
        </Wrapper>
    )
}