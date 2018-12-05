import {
    ITEM_QUANTITY_INCREASED,
    ITEM_QUANTITY_DECREASED,
    ITEM_QUANTITY_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
    quantity: 1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_QUANTITY_INCREASED:
            return { ...state, quantity: parseInt(state.quantity) + 1 };
        case ITEM_QUANTITY_DECREASED:
            return { ...state, quantity: parseInt(state.quantity) - 1 };
        case ITEM_QUANTITY_UPDATED:
            return { ...state, quantity: parseInt(action.payload.value) };
        default:
            return state;
    }
};
