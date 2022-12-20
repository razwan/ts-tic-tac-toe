import { Board, GameEndedOverlay, HomeView, Loader, Wrapper } from '../index';
import { useStore } from 'zustand';
import { GAME_STATE, useGameStore } from '../../store';
import { loadingStore, withLoadingProvider } from '../Loader';
  
const App: React.FC = () => {
    const gameState = useGameStore( state => state.gameState );
    const loading = useStore( loadingStore, state => state.loading );

    return (
        <Wrapper>
            <Loader loading={ loading } />
            { gameState === GAME_STATE.LOADING && <HomeView /> }
            { gameState !== GAME_STATE.LOADING && <Board /> }
            <GameEndedOverlay />
        </Wrapper>
    )
}

const AppWithLoadingProvider = withLoadingProvider( App );

export { AppWithLoadingProvider as App };


