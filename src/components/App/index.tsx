import { Board, Button, Logo, Surface, Switch, Wrapper } from '../index';

export const App: React.FunctionComponent = ( props ) => {
    return (
        <Wrapper>
            <Logo />
            <Surface>
                <h3>Pick player 1's mark</h3>
                <Switch />
                <p>Remember: X goes first</p>
            </Surface>
            <Button isLarge>Button 1</Button>
            <Button isLarge isSecondary>Button 1</Button>
            <Board />
        </Wrapper>
    )
}