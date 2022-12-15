import { Board, Button, GameEndedOverlay, Logo, Surface, Switch, Wrapper } from '../index';
import { GAME_STATE, useGameStore } from '../../store';

// ### UNIT TYPE
type EmptyObjectType = {};
export const HomeView: React.FC<EmptyObjectType> = () => {
    const [ startGameVSComputer, startGameVSPlayer ] = useGameStore( state => [ state.startGameVSComputer, state.startGameVSPlayer ] );

    return (
        <Wrapper>
            <Logo colored />
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



export const App: React.FC = ( props ) => {
    const gameState = useGameStore( state => state.gameState );

    return (
        <Wrapper>
            { gameState === GAME_STATE.LOADING && <HomeView /> }
            { gameState !== GAME_STATE.LOADING && <Board /> }
            <GameEndedOverlay />
        </Wrapper>
    )
}