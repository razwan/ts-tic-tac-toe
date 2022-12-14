import classnames from 'classnames';
import { Mark } from '../index';
import { useGameStore } from '../../store';
import { Player } from '../../types';

type SwitchOptionProps = {
    mark: Player
}

const SwitchOption: React.FC<SwitchOptionProps> = ( props ) => {
    const player1Mark = useGameStore( state => state.player1Mark );
    const setPlayer1Mark = useGameStore( state => state.setPlayer1Mark );
    const mark = props.mark;

    const className = classnames( 
        'switch__option', 
        `switch__option--${ mark }`,
        {
            'switch__option--selected': player1Mark === mark
        } 
    );

    return (
        <div className={ className } onClick={ () => { setPlayer1Mark( mark ) } }>
            <Mark mark={ mark } />
        </div>
    )
}

export const Switch: React.FC = () => {
    return (
        <div className={ 'switch' }>
            <SwitchOption mark={ 'x' } />
            <SwitchOption mark={ 'o' } />
        </div>
    )
}