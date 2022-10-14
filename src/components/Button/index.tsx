import classnames from 'classnames';

type ButtonProps = {
    children?: React.ReactNode,
    isSecondary?: boolean
    isLarge?: boolean
}

export const Button: React.FunctionComponent<ButtonProps> = ( props ) => {
    const { children, isSecondary, isLarge } = props;

    const className = classnames(
        'button',
        {
            'button--primary': ! isSecondary,
            'button--large': isLarge,
        }
    )

    return (
        <button className={ className }>{ children }</button>
    )
}
