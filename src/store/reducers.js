import { combineReducers } from 'redux';
import { produce } from 'immer';

import { DEFAULT_LOCATION, TEMPERATURE } from '../consts';
import types from './types';

export const initialForecastState = () => ({
    data: {
        [TEMPERATURE.CELSIUS]: [],
        [TEMPERATURE.FAHRENHEIT]: [],
    },
    loading: false,
    error: false,
    loaded: false,
    city: DEFAULT_LOCATION,
});

function tempUnitReducer(state = TEMPERATURE.FAHRENHEIT, action) {
    switch (action.type) {
        case types.SWITCH_UNIT:
            return produce(state, () => action.payload);
        default:
            return state;
    }
}

function pageIndexReducer(state = 0, action) {
    switch (action.type) {
        case types.NEXT:
            return produce(state, draft => draft + 1);
        case types.PREVIOUS:
            return produce(state, draft => draft - 1);
        default:
            return state;
    }
}

function forecastReducer(state = initialForecastState(), action) {
    switch (action.type) {
        case types.LOAD_FORECAST:
            return produce(state, draft => {
                draft.loading = true;
                draft.city = action.city ? action.city : DEFAULT_LOCATION;
            });
        case types.FORECAST_LOADED:
            return produce(state, draft => {
                draft.data = action.payload;
                draft.loading = false;
                draft.loaded = true;
            });
        case types.LOAD_FORECAST_ERROR:
            return produce(state, draft => {
                draft.loading = false;
                draft.error = action.error;
            });
        default:
            return state;
    }
}

export default function createReducer() {
    return combineReducers({
        pageIndex: pageIndexReducer,
        tempUnit: tempUnitReducer,
        forecast: forecastReducer,
    });
}
