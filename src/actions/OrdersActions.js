import axios from 'axios';

import {
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} from './types';

export const fetchOrders = ({userId}) => {
    return (dispatch) => {
        dispatch({ type: FETCH_ORDERS_START });
        axios.get('http://10.0.2.2:3001/orders?userId=' + userId)
            .then((response) => {
                dispatch({
                    type: FETCH_ORDERS_SUCCESS,
                    payload: response.data
                });
        })
            .catch((error) => {
                dispatch({
                    type: FETCH_ORDERS_FAIL,
                    payload: error.response.data.error
                })
            })
    }
};