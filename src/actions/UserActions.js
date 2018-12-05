import axios from 'axios';

import {
    USER_UPDATE,
    USER_UPDATE_START,
    LOGIN_USER_SUCCESS,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL
} from '../actions/types';

export const updateUser = ({prop, value}) => {
    return {
        type: USER_UPDATE,
        payload: { prop, value}
    };
};

export const saveUser = ({user, userId}) => {
    return (dispatch) => {
        dispatch({ type: USER_UPDATE_START });
        axios.put('http://10.0.2.2:3001/users/' + userId, user)
            .then(() => {
                dispatch({
                    type: USER_SAVE_SUCCESS,
                    payload: { user, message: 'Information updated.' }
                });

                // update current user information
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: user
                });
                setTimeout(() => {
                    dispatch({
                        type: USER_UPDATE,
                        payload: { prop: 'message', value: ''}
                    })
                }, 5000);
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({
                    type: USER_SAVE_FAIL,
                    payload: error.response.data.error
                })
            })
    }
};