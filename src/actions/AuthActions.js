import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import axios from 'axios';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    NEW_PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    PASSWORD_UPDATE_FAILED,
    PASSWORD_UPDATE_SUCCESS,
    REGISTER_PROPERTY_CHANGED,
    LOGIN_USER,
    LOGOUT_USER,
    USER_LOGOUT,
    USER_SAVE_SUCCESS,
    RESET_ORDERS,
    USER_PASSWORD_FORGOT_SUCCESS,
    USER_PASSWORD_FORGOT_FAIL
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const newPasswordChanged = (text) => {
    return {
        type: NEW_PASSWORD_CHANGED,
        payload: text
    };
};

export const confirmNewPasswordChanged = (text) => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};

export const registrationPropChanged = ({prop, value}) => {
    return {
        type: REGISTER_PROPERTY_CHANGED,
        payload: { prop, value }
    }
}

export const updatePassword = ({username, password, newPassword, confirmNewPassword}) => {
    return (dispatch) => {
        if (newPassword !== confirmNewPassword) {
            passwordUpdateFail(dispatch, 'Passwords not match');
        } else {
            dispatch({ type: LOGIN_USER });

            axios.post('http://10.0.2.2:3001/login', {
                username,
                password
            })
                .then(() => {
                    axios.post('http://10.0.2.2:3001/updatePassword', {
                        username,
                        password: newPassword
                    })
                        .then(() => { passwordUpdateSuccess(dispatch); })
                        .catch((error) => {
                            console.log(error.response);
                            console.log(error);
                            passwordUpdateFail(dispatch, error.response.data.error);
                        })
                })
                .catch((error) => {
                    console.log(error.response);
                    console.log(error);
                    passwordUpdateFail(dispatch, 'Current password is not correct.');
                })
        }
    }
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        const timeout = setTimeout(() => {loginUserFail(dispatch, 'Server doesn\'t respond. Please, try again later.')}, 7000);

        return axios.post('http://10.0.2.2:3001/login', {
            username: email,
            password
        })
            .then((response) => {
                loginUserSuccess(dispatch, response.data.user, timeout);
            })
            .catch((error) => {
                console.log(error.response);
                return loginUserFail(dispatch, error.response.data.error, timeout);
            })
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        axios.get('http://10.0.2.2:3001/logout')
            .then(() => {
                dispatch({
                    type: LOGOUT_USER
                });
                dispatch({
                    type: USER_LOGOUT
                });
                dispatch({
                    type: RESET_ORDERS
                });
                Actions.home();
            })
    }
};

export const loginWithGoogle = () => {
    console.log('Login');
    return (dispatch) => {
        GoogleSignin.signIn()
            .then((userData) => {
                console.log("DATA from Google");
                console.log(userData);
                return loginUserSuccess(dispatch, userData.user)
            },
            (error) => {
                console.log('WRONG SIGNIN', error);
                return loginUserFail(dispatch, 'Error getting data from Google profile');
            });
    }
};

export const loginWithFb = () => {
    return (dispatch) => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    loginUserFail(dispatch, 'Login cancelled');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data;
                        axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                            .then((json) => {
                            console.log(json.data);
                                loginUserSuccess(dispatch, json.data);
                            })
                            .catch(() => {
                                loginUserFail(dispatch, 'Error getting data from Facebook profile');
                            })
                    });
                }
            },
            (error) => loginUserFail(dispatch, 'Login failed'));
    }
};

export const register = (user) => {
    return (dispatch) => {
        if (user.password !== user.confirmNewPassword) {
            passwordUpdateFail(dispatch, 'Passwords not match');
        } else {
            dispatch({ type: LOGIN_USER });
            const timeout = setTimeout(() => {loginUserFail(dispatch, 'Server doesn\'t respond. Please, try again later.')}, 7000);

            axios.get('http://10.0.2.2:3001/users?username=' + user.username)
                .then(() => {
                    clearTimeout(timeout);
                    axios.post('http://10.0.2.2:3001/users', user)
                        .then((response) => loginUserSuccess(dispatch, response.data.user),
                            (error) => loginUserFail(dispatch, error.response.data.error, timeout))
                })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status === 403) {
                        loginUserFail(dispatch, 'User with this email already exists.', timeout)
                    } else {
                        loginUserFail(dispatch, error.response.data.error, timeout)
                    }
                })
        }
    }
};

export const forgotPassword = ({email}) => {
    return (dispatch) => {
        if (!email) {
            dispatch({
                type: USER_PASSWORD_FORGOT_FAIL,
                payload: 'Email address is empty'
            });
        } else {
            dispatch({
                type: LOGOUT_USER
            });
            axios.post('http://10.0.2.2:3001/forgot', { email })
                .then((response) => {
                    dispatch({
                        type: USER_PASSWORD_FORGOT_SUCCESS,
                        payload: response.data.message
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                    dispatch({
                        type: USER_PASSWORD_FORGOT_FAIL,
                        payload: error.response.data.error
                    });
                });
        }
    }
};

const loginUserFail = (dispatch, error, timeout) => {
    if (timeout) {
        clearTimeout(timeout);
    }
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error
    });
};

const loginUserSuccess = (dispatch, user, timeout) => {
    if (timeout) {
        clearTimeout(timeout);
    }

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    dispatch({
        type: USER_SAVE_SUCCESS,
        payload: { user, message: '' }
    });

    Actions.pop({type: 'reset'});
};

const  passwordUpdateFail = (dispatch, error) => {
    dispatch({
        type: PASSWORD_UPDATE_FAILED,
        payload: error
    })
};

const passwordUpdateSuccess = (dispatch) => {
    dispatch({
        type: PASSWORD_UPDATE_SUCCESS
    });
};