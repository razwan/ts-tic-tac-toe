import React, { createContext, Component } from 'react';
import { createStore } from 'zustand';

type LoadingStore = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const loadingStore = createStore<LoadingStore>((set) => ({
    loading: false,
    setLoading: ( loading: boolean ) => {
        console.log( loading );
        set({ loading })
    },
}));

const LoadingStoreContext = createContext( null );

export const withLoadingProvider = ( WrappedComponent: React.FC ) => {
    return ( props: any ) => {
        return (
            <LoadingStoreContext.Provider value={ loadingStore }>
                <WrappedComponent { ...props } />
            </LoadingStoreContext.Provider>
        )
    }
}

type Constructor<T = {}> = new (...args: any[]) => T;

type LoaderProps = { loading: boolean };

// ### MIXIN
function LoaderMixin<T extends Constructor<Component<LoaderProps>>>(baseClass: T) {
    return class extends baseClass implements Component {

        render() {
            if ( ! this.props.loading ) {
                return null;
            }

            return super.render();
        }
    };
}

class Loader extends Component<LoaderProps> {

    render() {

       return (
            <div>Loading...</div>
       )
    }
}

const LoaderWithMixin = LoaderMixin( Loader );

export { LoaderWithMixin as Loader }
