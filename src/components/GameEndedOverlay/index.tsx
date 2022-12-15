import { useCallback } from "react";

import { Button, Mark, Overlay } from '../index';
import { useGameStore, OPPONENT, GAME_STATE } from "../../store"
import { Player } from "../../types"

// ### OBJECT TYPE
type GameEndedOverlayProps = {
    onQuit: () => void,
    onNextRound: () => void,
    winner: Player | undefined,
    show: boolean,
    title: string,
    subtitle: string,
}

// ### MAPPED TYPE
type GameEndedOverlayWrapperProps = {
    [ key: keyof never ]: any
}

const GameEndedOverlayWrapper: React.FC<GameEndedOverlayWrapperProps> = () => {
    const game = useGameStore( state => state.game );
    const gameState = useGameStore( state => state.gameState );
    const player1Mark = useGameStore( state => state.player1Mark );
    const quitGame = useGameStore( state => state.quitGame );

    const onQuit = useCallback( quitGame, [] );
    const onNextRound = useGameStore( state => state.opponent === OPPONENT.CPU ? state.startGameVSComputer : state.startGameVSPlayer );

    return (
        <GameEndedOverlay 
            winner={ game?.winner }
            onQuit={ onQuit }
            onNextRound={ onNextRound }
            show={ gameState === GAME_STATE.ENDED }
            subtitle={ game?.winner === player1Mark ? 'You won!' : 'You lost!' }
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

export { 
    GameEndedOverlayWrapper as GameEndedOverlay
};
