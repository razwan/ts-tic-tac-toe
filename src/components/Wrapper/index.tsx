export const Wrapper: React.FunctionComponent<React.PropsWithChildren> = ( props ) => {
    const { children } = props;
    
    return (
        <div className="wrapper">{ children }</div>
    )
}