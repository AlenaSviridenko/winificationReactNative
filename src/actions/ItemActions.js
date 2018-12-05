import {
    ITEM_QUANTITY_DECREASED,
    ITEM_QUANTITY_INCREASED,
    ITEM_QUANTITY_UPDATED
} from './types';

export const increaseQuantity = () => {
    return {
        type: ITEM_QUANTITY_INCREASED,
        payload: {}
    }
};

export const decreaseQuantity = () => {
    return {
        type: ITEM_QUANTITY_DECREASED,
        payload: {}
    }
};

export const updateQuantity = (value) => {
    return {
        type: ITEM_QUANTITY_UPDATED,
        payload: { value }
    }
};

