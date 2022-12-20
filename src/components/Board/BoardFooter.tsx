import { OPPONENT, useGameStore } from '../../store';

export const BoardFooter: React.FC = () => {
    const player1Mark = useGameStore( state => state.player1Mark );
    const player1Score = useGameStore( state => state.player1Score );
    const opponentScore = useGameStore( state => state.opponentScore );
    const ties = useGameStore( state => state.ties );

    const opponentLabel = useGameStore( state => state.opponent === OPPONENT.CPU ? 'CPU' : 'P2' );
    const XLabel = player1Mark === 'x' ? 'YOU' : opponentLabel;
    const XScore = player1Mark === 'x' ? player1Score : opponentScore;
    const OLabel = player1Mark === 'o' ? 'YOU' : opponentLabel;
    const OScore = player1Mark === 'o' ? player1Score : opponentScore;

    return (
        <div className="board__footer">
            <div className="board__footer-cell">
                <p>{ `X (${ XLabel })` }</p>
                <h2>{ XScore }</h2>
            </div>
            <div className="board__footer-cell">
                <p>Ties</p>
                <h2>{ ties }</h2>
            </div>
            <div className="board__footer-cell">
                <p>{ `O (${ OLabel })` }</p>
                <h2>{ OScore }</h2>
            </div>
        </div>
    )
}