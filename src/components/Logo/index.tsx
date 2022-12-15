import classnames from 'classnames'
import { Mark } from '../index';

type LogoProps = {
    colored?: boolean
}

export const Logo: React.FC<LogoProps> = ( props ) => {
    const className = classnames(
        'logo',
        { 'logo--colored': props.colored }
    )

    return (
        <div className={ className }>
            <Mark mark='x' />
            <Mark mark='o' />
        </div>
    )
}