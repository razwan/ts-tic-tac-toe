import React, { createContext, useState } from "react";

const AppContext = createContext( {} );

export const withContextProvider = ( Component ) => {
    return ( props ) => {
        const [ game, setGame ] = useState();

        const context = {
            game
        };

        return (
            <AppContext.Provider value={ context }>
                <Component />
            </AppContext.Provider>
        )
    }
}

export default AppContext;