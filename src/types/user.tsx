export enum userActionTypes {
    SET_USER = 'SET_USER',
    SET_PASSWORD = 'SET_PASSWORD',
    SIGN_UP = 'SIGN_UP',
    LOGIN = 'LOGIN',
    IS_LOGIN = 'IS_LOGIN',
    SET_ERROR = 'SET_ERROR'
}

interface userActionIsLogin {
    type: userActionTypes.IS_LOGIN;
    payload: boolean;
}

interface userActionUser {
    type: userActionTypes.SET_USER;
    payload: string;
}

interface userActionPassword {
    type: userActionTypes.SET_PASSWORD;
    payload: string;
}

interface userActionSetError {
    type: userActionTypes.SET_ERROR;
    payload: string;
}
interface userActionSignUp {
    type: userActionTypes.SIGN_UP;
    payload: string[];
}
interface userActionLogIn {
    type: userActionTypes.LOGIN;
    payload: string[];
}

export interface UserState {
    userParams: string[],
    // name: string;
    user: string;
    password: string;
    error: null | string;
    isLogin: boolean;
    isEnter: boolean;
}

export type userAction = userActionUser | userActionIsLogin | userActionPassword | userActionSignUp | userActionLogIn | userActionSetError
