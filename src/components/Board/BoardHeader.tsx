import { Button, Logo, Mark } from '../index';
import { OPPONENT, useGameStore } from '../../store';

export const BoardHeader: React.FC = () => {
    const currentPlayer = useGameStore( state => state.game.currentPlayer );
    const restartGame = useGameStore( state => state.opponent === OPPONENT.CPU ? state.startGameVSComputer : state.startGameVSPlayer );

    return (
        <div className="board__header">
            <div>
                <Logo colored />
            </div>
            <div>
                <div className="surface">
                    <Mark mark={ currentPlayer } />
                    <h4>Turn</h4>
                </div>
            </div>
            <div>
                <Button isTertiary onClick={ () => { restartGame() } }>Restart</Button>
            </div>
        </div>
    )
}
