import { Mark } from '../index';

export const Logo: React.FunctionComponent<any> = ( props ) => {
    return (
        <div className='logo'>
            <Mark mark='x' />
            <Mark mark='o' />
        </div>
    )
}