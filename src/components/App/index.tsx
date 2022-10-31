import { useContext } from 'react';
import { Board, Button, Logo, Surface, Switch, Wrapper } from '../index';

export const HomeView: React.FC = ( props ) => {
    return (
        <Wrapper>
            <Logo />
            <Surface>
                <h3>Pick player 1's mark</h3>
                <Switch />
                <p>Remember: X goes first</p>
            </Surface>
            <Button isLarge>New Game (vs CPU)</Button>
            <Button isLarge isSecondary>New Game (vs Player)</Button>
        </Wrapper>
    );
}

export const App: React.FC = ( props ) => {
    return (
        <Wrapper>
            <HomeView />
            <Board />
        </Wrapper>
    )
}