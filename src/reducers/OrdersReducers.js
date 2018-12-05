import {
    RESET_ORDERS,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    orders: [],
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ORDERS_START:
            return { ...state, loading: true };
        case FETCH_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case FETCH_ORDERS_FAIL:
            return {  ...state, ...INITIAL_STATE, loading: false, error: action.payload };
        case RESET_ORDERS:
            return {  ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
