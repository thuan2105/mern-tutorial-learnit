import { createContext, useReducer, useEffect } from 'react';

import { authReducer } from '~/reducers/authReducer';

import setAuthToken from '~/utils/setAuthToken';
import { LOCAL_STORAGE_TOKEN_NAME } from '~/Services/constants';
import * as httpRequest from '~/utils/httpRequest';
import { SET_AUTH } from '~/Services/constants';

export const AuthContext = createContext();

const initialState = {
    authLoading: true,
    isAuthenticated: false,
    user: null,
};
// Authenticate user

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        const getToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
        if (getToken) {
            setAuthToken(getToken);
            const response = await httpRequest.get('auth');
            if (response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: { isAuthenticated: true, user: response.data.user },
                });
            }
        } else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    useEffect(() => {
        loadUser();
    }, []);
    // Return Provider
    const authContextData = { loadUser, logoutUser, authState };
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
