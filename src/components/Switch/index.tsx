import { Mark } from '../index';

export const Switch: React.FunctionComponent<any> = ( props ) => {
    return (
        <div className={ 'switch' }>
            <div className="switch__option  switch__option--x">
                <Mark mark='x' />
            </div>
            <div className="switch__option  switch__option--selected  switch__option--o">
                <Mark mark='o' />
            </div>
        </div>
    )
}