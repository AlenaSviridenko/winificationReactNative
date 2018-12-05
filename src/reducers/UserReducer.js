import {
    USER_UPDATE,
    USER_UPDATE_START,
    USER_LOGOUT,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
    gender: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    loading: '',
    error: '',
    message: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case USER_SAVE_SUCCESS:
            return { ...state, ...action.payload.user, loading: false, message: action.payload.message };
        case USER_SAVE_FAIL:
            return { ...state, loading: false, error: action.payload.error };
        case USER_UPDATE_START:
            return { ...state, loading: true, error: '', message: '' };
        case USER_LOGOUT:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
