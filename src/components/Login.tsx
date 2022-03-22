import React, {FC} from "react";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {userActionTypes} from "../types/user";
import {MainPage} from "../pages/MainPage";

export const Login: FC = () => {
    const {password, userParams, error, isLogin, isEnter, user} = useTypeSelector(state => state.user);
    const dispatch = useDispatch();

    const loginHandler = () => {
        if (userParams[0] === user && userParams[1] === password) {
            dispatch({type: userActionTypes.LOGIN});
            dispatch({type: userActionTypes.SET_ERROR, payload: null});
        } else {
            dispatch({type: userActionTypes.SET_ERROR, payload: 'Incorrect email or password'});
        }
    }

    const signUpHandler = () => {
        if (user.length === 0) {
            return dispatch({type: userActionTypes.SET_ERROR, payload: 'Please enter email'});
        }
        if (password.length === 0) {
            return dispatch({type: userActionTypes.SET_ERROR, payload: 'Please enter password'});
        }
        dispatch({type: userActionTypes.SIGN_UP, payload: [user, password]});
        dispatch({type: userActionTypes.IS_LOGIN, payload: true});
        dispatch({type: userActionTypes.SET_ERROR, payload: ''});
    }

    if (!isEnter) {
        return (
            <div className={'login-wrapper'}>
                <div className={'login-under-wrapper'}>
                    <div>
                        <div>
                            {/*-------------------------------------Login and password Inputs----------------------------*/}
                            <div>
                                <div className={'login-input'}>
                                    <input placeholder={'E-mail or UserName'}
                                           onChange={e => dispatch({
                                               type: userActionTypes.SET_USER,
                                               payload: e.target.value
                                           })}/>
                                </div>
                                <div className={'login-input'}>
                                    <input placeholder={'Password'}
                                           onChange={e => dispatch({
                                               type: userActionTypes.SET_PASSWORD,
                                               payload: e.target.value
                                           })}
                                    />
                                </div>
                            </div>
                            {/*END-------------------------------------Login and password Inputs----------------------------*/}
                            {/*-------------------------------------Check and change sign up and login links----------------------------*/}
                            <div>
                                {
                                    error === null
                                        ?
                                        <></>
                                        :
                                        <p className={'login-error'}>{error}</p>
                                }
                                {
                                    isLogin
                                        ?
                                        <p><a href={'#'} onClick={() => dispatch({
                                            type: userActionTypes.IS_LOGIN,
                                            payload: false
                                        })}>signup</a></p>
                                        :
                                        <p><a href={'#'} onClick={() => dispatch({
                                            type: userActionTypes.IS_LOGIN,
                                            payload: true
                                        })}>login</a></p>
                                }
                            </div>
                            {/*END-------------------------------------Check and change sign up and login links----------------------------*/}
                            {/*-------------------------------------Check and change sign up and login Buttons----------------------------*/}
                        </div>
                        {
                            !isLogin
                                ?
                                <div className={'login-button'}>
                                    <button onClick={signUpHandler}>SignUp</button>
                                </div>
                                :
                                <div className={'login-button'}>
                                    <button onClick={loginHandler}>Login</button>
                                </div>
                        }
                    </div>
                    {/*END-------------------------------------Check and change sign up and login Buttons----------------------------*/}
                </div>
            </div>
        )
    } else
        return (
            <MainPage/>
        )
}
