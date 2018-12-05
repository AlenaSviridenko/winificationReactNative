import {
    MODEL_UPDATE,
    MODEL_UPDATE_START,
    MODEL_UPDATE_FAIL,
    MODEL_UPDATE_SUCCESS,
    MODEL_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    country: '',
    thumbnail: '',
    year: '',
    type: 'red dry',
    desc: '',
    price: '',
    available: '',
    image: '',
    loading: false,
    message: '',
    error: '',
    _id: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODEL_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case MODEL_UPDATE_START:
            return { ...state, loading: true, error: '' };
        case MODEL_SAVE_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case MODEL_UPDATE_SUCCESS:
            return { ...state,
                ...action.payload,
                image: action.payload.image.uri,
                thumbnail: action.payload.thumbnail.uri,
                year: action.payload.year,
                price: action.payload.price,
                available: action.payload.available,
                loading: false,
                message: 'Item updated successfully'
            };
        case MODEL_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
