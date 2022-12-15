type OverlayProps = {
    show: boolean,
    children: React.ReactNode,
}

export const Overlay: React.FC<OverlayProps> = props => {
    const { children, show } = props;

    if ( ! show ) {
        return null;
    }

    return (
        <div className="overlay">
            <div className="overlay__content">
                { children }
            </div>
        </div>
    )
}
