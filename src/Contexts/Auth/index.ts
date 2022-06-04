import { createContext } from "react";
import jwt_decode from "jwt-decode";

interface FetchBasket {
    type: AuthActionsTypes;
    payload: UserInformation;
}

type BasketAction = FetchBasket;


export enum AuthActionsTypes {
    AUTHORIZATION = 'AUTHORIZATION',
    UPDATE_AUTH = 'UPDATE_AUTH',
    LOGOUT = 'LOGOUT',
}

export interface UserInformation {
    login?: string
    exp: string
    auth: boolean
    accessToken: string
}


type IProductContext = [
    state: UserInformation,
    dispatch: React.Dispatch<BasketAction>
];

export const initialStateAuth: UserInformation = { auth: false, accessToken: "", exp: "0" };

export const AuthContext = createContext<IProductContext>([
    initialStateAuth,
    () => {
        console.log("Dispatch не работает");
    },
]);

export const AuthReducer = (state: UserInformation, action: BasketAction) => {
    switch (action.type) {
        case AuthActionsTypes.AUTHORIZATION:
            localStorage.accessToken = action.payload.accessToken
            return { ...state, ...jwt_decode<UserInformation>(action.payload.accessToken), auth: true }
        case AuthActionsTypes.UPDATE_AUTH:
            if (new Date(state.exp) > new Date())
                return state
            else
                if (localStorage?.accessToken && new Date(jwt_decode<UserInformation>(localStorage?.accessToken)?.exp) > new Date())
                    return { ...state, ...jwt_decode<UserInformation>(localStorage.accessToken), auth: true }
                else
                    return initialStateAuth
        case AuthActionsTypes.LOGOUT:
            delete localStorage.accessToken
            return initialStateAuth
        default:
            return state;
    }
};
