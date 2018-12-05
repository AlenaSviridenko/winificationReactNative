import {
    CATALOG_FETCH_SUCCESS,
    CATALOG_SEARCH_SUCCESS,
    CATALOG_FETCH_START,
    CATALOG_FETCH_TIMEOUT,
    CATALOG_ITEM_ADDED,
    CATALOG_ITEM_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
    cards: [],
    searchCards: [],
    loading: false,
    error: '',
    timeIsOver: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATALOG_FETCH_START:
            return { ...state, loading: true, error: '', timeIsOver: false };
        case CATALOG_FETCH_SUCCESS:
            return { ...state, cards: action.payload, loading: false };
        case CATALOG_SEARCH_SUCCESS:
            return { ...state, searchCards: action.payload, loading: false };
        case CATALOG_FETCH_TIMEOUT:
            return { ...state, loading: false, error: 'Server doesn\'t respond. Please try again later.', timeIsOver: true };
        case CATALOG_ITEM_ADDED:
            return {
                ...state,
                cards: [...state.cards, action.payload.card]
            };
        case CATALOG_ITEM_UPDATED:
            return {
                ...state,
                cards: state.cards.map(obj => { return obj._id === action.payload._id ? {...obj, ...action.payload } : obj})
            };
        default:
            return state;
    }
};