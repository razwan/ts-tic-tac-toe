import classnames from 'classnames';
import { MouseEventHandler } from 'react';

type ButtonProps = {
    children: React.ReactNode,
    isPrimary: boolean,
    isSecondary: boolean,
    isTertiary: boolean,
    isLarge: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>
}

// ### UTILITY TYPE
type OptionalButtonProps = Partial<ButtonProps>;

export const Button: React.FunctionComponent<OptionalButtonProps> = ( props ) => {
    const { children, isPrimary, isSecondary, isTertiary, isLarge } = props;
    const onClick = props.onClick ?? (() => {});

    const className = classnames(
        'button',
        {
            'button--primary': isPrimary,
            'button--secondary': isSecondary,
            'button--tertiary': isTertiary,
            'button--large': isLarge,
        }
    )

    return (
        <button className={ className } onClick={ onClick }>{ children }</button>
    )
}
