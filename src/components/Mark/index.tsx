import classnames from 'classnames';
import * as lib from './svgs';

export const Mark: React.FunctionComponent<any> = ( props ) => {
    const { mark } = props;

    if ( ! mark ) {
        return null;
    }

	const svg: any = lib[ mark as keyof typeof lib ];
    const className = classnames(
        'mark',
        `mark--${ mark }`
    )

    return (
        <svg className={ className } viewBox={ svg.viewBox }>
            <use className="mark__symbol" xlinkHref={ `#${ svg.id } `} />
        </svg>
    )
}
