import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
    MODEL_UPDATE,
    MODEL_UPDATE_START,
    MODEL_UPDATE_FAIL,
    MODEL_UPDATE_SUCCESS,
    MODEL_SAVE_SUCCESS,
    CATALOG_ITEM_UPDATED,
    CATALOG_ITEM_ADDED
} from './types';

export const modelUpdate = ({prop, value}) => {
    console.log({prop, value});
    return {
        type: MODEL_UPDATE,
        payload: { prop, value }
    }
};

export const modelSave = (model) => {
    return (dispatch) => {
        dispatch({ type: MODEL_UPDATE_START });

        if (model._id) {
            saveExistingModel(model, dispatch);
        } else {
            saveNewModel(model, dispatch);
        }

    }
};

const saveNewModel = (model, dispatch) => {
    axios.post('http://10.0.2.2:3001/wines', model)
        .then((response) => {
            dispatch({
                type: MODEL_SAVE_SUCCESS
            });
            dispatch({
                type: CATALOG_ITEM_ADDED,
                payload: response.data.wine
            });
            Actions.catalog();
        })
        .catch((error) => {
            dispatch({
                type: MODEL_UPDATE_FAIL,
                payload: error.response.data.error
            })
        })
};

const saveExistingModel = (model, dispatch) => {
    axios.put('http://10.0.2.2:3001/wines/' + model._id, model)
        .then((response) => {
            dispatch({
                type: MODEL_UPDATE_SUCCESS,
                payload: response.data.wine
            });
            dispatch({
                type: CATALOG_ITEM_UPDATED,
                payload: response.data.wine
            });
        })
        .catch((error) => {
            dispatch({
                type: MODEL_UPDATE_FAIL,
                payload: error.response.data.error
            })
        })
};

