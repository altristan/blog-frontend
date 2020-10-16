import React, {Component, createContext, useContext} from "react";

interface ContextValueType {
    user: any,
    token: any;
    isAuthenticated: boolean,
    isLoading?: boolean,

    logout?: (...p: any) => any
}

// create the context
export const AuthContext: any = createContext<ContextValueType | null>(null);
export const useAuth: any = () => useContext(AuthContext);

interface IState {
    user: any;
    token: any;
    isAuthenticated: boolean,
    isLoading: boolean,
}

export class AuthProvider extends Component<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: null,
            token: null,
            isLoading: true,
            isAuthenticated: false,
        };

        const authUser = window.localStorage.getItem('user') || null;
        const authToken =window.localStorage.getItem('token') || null;
        this.setState({user: authUser, token: authToken, isLoading: false, isAuthenticated: true});
    }

    render() {
        const {user, token, isLoading, isAuthenticated} = this.state;
        const {children} = this.props;
        const configObject = {
            isLoading,
            isAuthenticated,
            user,
            token,
        };
        return <AuthContext.Provider value={configObject}>{children}</AuthContext.Provider>;
    }
}