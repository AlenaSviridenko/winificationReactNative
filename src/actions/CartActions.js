import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
    CART_FETCH,
    CART_ITEM_ADDED,
    CART_ITEM_REMOVED,
    CART_ITEM_UPDATED,
    ORDER_PLACE_START,
    ORDER_PLACE_FAIL,
    ORDER_PLACE_SUCCESS
} from './types';

export const addItem = ({item, quantity}) => {
    return {
        type: CART_ITEM_ADDED,
        payload: { item, quantity }
    }
};

export const updateItem = ({item, quantity}) => {
    return {
        type: CART_ITEM_UPDATED,
        payload: { item, quantity }
    }
};

export const removeItem = ({index, quantity, price}) => {
    return {
        type: CART_ITEM_REMOVED,
        payload: { index, quantity, price }
    }
};

export const placeOrder = (order) => {
    return (dispatch) => {
        dispatch({ type: ORDER_PLACE_START });
        const timeout = setTimeout(() => {orderPlaceFail(dispatch, 'Server doesn\'t respond. Please try again later.')}, 7000);

        axios.post('http://10.0.2.2:3001/orders', order)
            .then((response) => orderPlaceSuccess(dispatch, timeout),
                (error) => orderPlaceFail(dispatch, error.response.data.error, timeout))
            .catch((error) => orderPlaceFail(dispatch, error.response.data.error, timeout));
    }
};

const orderPlaceSuccess = (dispatch, timeout) => {
    clearTimeout(timeout);
    dispatch({ type: ORDER_PLACE_SUCCESS });
    Actions.confirmation();
};

const orderPlaceFail = (dispatch, error, timeout) => {
    clearTimeout(timeout);
    dispatch({
        type: ORDER_PLACE_FAIL,
        payload: error
    })
};


