export const Surface: React.FunctionComponent<React.PropsWithChildren> = ( props ) => {
    const { children } = props;
    
    return (
        <div className="surface">{ children }</div>
    )
}