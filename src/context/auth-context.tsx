import {createContext} from "react";
import {ActionTypes} from "./auth-actions";

interface AuthState {
    user: string;
    token: string;
    isAuthenticated: boolean;
}

export const INITIAL_STATE = {
    user: '',
    token: '',
    isAuthenticated: false,
}

export interface Action {
    type: ActionTypes;
    payload?: any;
}

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: (action: Action) => void;
}>({
    state: INITIAL_STATE, dispatch: () => {
    }
});

function checkAuth() {
    const token = window.localStorage.getItem('token');
    let isAuthenticated = false;
    if (token){
        isAuthenticated = true;
    }
    return {token, isAuthenticated}
}

export const authReducer: (state: any, action: any) => ({ isAuthenticated: boolean; user: string; token: string}) = (state, action) => {
    const {type} = action;
    switch (type) {
        case ActionTypes.AUTHORIZED:
            const authValues = checkAuth();
            return {
                ...state,
                token: authValues.token,
                isAuthenticated: authValues.isAuthenticated
            };
        case ActionTypes.UNAUTHORIZED:
            return {
                ...state,
                user: '',
                token: localStorage.setItem('token', ''),
                isAuthenticated: false
            };
        // case ActionTypes.CURRENTUSER:
        //     return {
        //         ...state,
        //         user: async () => {
        //             return await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/me`)
        //                 .then(res => res.json());
        //         }
        //     }
        default:
            return state;
    }
}
//
// interface ContextValueType {
//     user: any,
//     token: any;
//     isAuthenticated: boolean,
//     isLoading?: boolean,
//
//     logout?: (...p: any) => any
// }
//
// // create the context
// export const AuthContext: any = createContext<ContextValueType | null>(null);
// export const useAuth: any = () => useContext(AuthContext);
//
// interface IState {
//     user: any;
//     token: any;
//     isAuthenticated: boolean,
//     isLoading: boolean,
// }
//
// export class AuthProvider extends Component<{}, IState> {
//     constructor(props: any) {
//         super(props)
//         this.state = {
//             user: null,
//             token: null,
//             isLoading: true,
//             isAuthenticated: false,
//         };
//
//         const authUser = window.localStorage.getItem('user') || null;
//         const authToken =window.localStorage.getItem('token') || null;
//         this.setState({user: authUser, token: authToken, isLoading: false, isAuthenticated: true});
//     }
//
//     render() {
//         const {user, token, isLoading, isAuthenticated} = this.state;
//         const {children} = this.props;
//         const configObject = {
//             isLoading,
//             isAuthenticated,
//             user,
//             token,
//         };
//         return <AuthContext.Provider value={configObject}>{children}</AuthContext.Provider>;
//     }
// }