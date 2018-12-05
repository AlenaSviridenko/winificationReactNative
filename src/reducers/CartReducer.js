import {
    CART_FETCH,
    CART_ITEM_REMOVED,
    CART_ITEM_ADDED,
    CART_ITEM_UPDATED,
    ORDER_PLACE_START,
    ORDER_PLACE_FAIL,
    ORDER_PLACE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    cart: [],
    count: 0,
    totalAmount: 0,
    loading: false,
    error: '',
    timeIsOver: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CART_ITEM_ADDED:
            return {
                ...state,
                cart: [...state.cart, { item: action.payload.item, quantity: action.payload.quantity }],
                count: state.count + action.payload.quantity,
                totalAmount: state.totalAmount + (action.payload.quantity * action.payload.item.price)
            };

        case CART_ITEM_UPDATED:
            return {
                ...state,
                cart: state.cart.map(obj => { return obj.item._id === action.payload.item._id ? Object.assign(obj, { quantity: obj.quantity + action.payload.quantity }) : obj}),
                count: state.count + action.payload.quantity,
                totalAmount: state.totalAmount + (action.payload.quantity * action.payload.item.price)
            };

        case CART_ITEM_REMOVED:
            return {
                ...state,
                cart: state.cart.filter((obj,index) => {return action.payload.index !== index}),
                count: state.count - action.payload.quantity,
                totalAmount: state.totalAmount - (action.payload.quantity * action.payload.price)
            };

        case ORDER_PLACE_START:
            return { ...state, loading: true, timeIsOver: false };
        case ORDER_PLACE_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case ORDER_PLACE_FAIL:
            return { ...state, loading: false, error: action.payload};
        default:
            return state;
    }

};
