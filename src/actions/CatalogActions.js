
import axios from 'axios';
import {
    CATALOG_FETCH_SUCCESS,
    CATALOG_SEARCH_SUCCESS,
    CATALOG_FETCH_START,
    CATALOG_FETCH_TIMEOUT
} from './types';

export const catalogFetch = () => {
    return (dispatch) => {
        dispatch({ type: CATALOG_FETCH_START });
        const timeOut = setTimeout(() => {dispatch({ type: CATALOG_FETCH_TIMEOUT})}, 7000);

        axios.get('http://10.0.2.2:3001/wines')
            .then((responseJson) => {
                clearTimeout(timeOut);
                dispatch({ type: CATALOG_FETCH_SUCCESS, payload: responseJson.data });
            });
    };
};

export const searchItems = (query) => {
    return (dispatch) => {
        dispatch({ type: CATALOG_FETCH_START });
        axios.get('http://10.0.2.2:3001/wines?search=' + query)
            .then((responseJson) => {
                dispatch({ type: CATALOG_SEARCH_SUCCESS, payload: responseJson.data });
            })
    }
}
