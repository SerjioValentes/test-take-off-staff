import {userAction, userActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    user: '',
    password: '',
    userParams: [],
    isLogin: false,
    isEnter: false,
    error: null,
}

export const userReducer = (state = initialState, action: userAction): UserState => {
    switch (action.type) {
        case userActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case userActionTypes.SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            }
        case userActionTypes.IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }
        case userActionTypes.SIGN_UP:
            return {
                ...state,
                userParams: action.payload,
            }
        case userActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case userActionTypes.LOGIN:
            return {
                ...state,
                isEnter: true,
            }
        default:
            return state
    }
}

