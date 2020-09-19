import types from './types';
import { validationSchema } from './schemas';
import { TEMPERATURE, createApiUrl } from '../consts';
import request from '../utils/request';

export function loadForecast(place) {
    return {
        type: types.LOAD_FORECAST,
        city: place ? place.value : null,
    };
}

export function forecastLoaded(data) {
    return {
        type: types.FORECAST_LOADED,
        payload: data,
    };
}

export function forecastLoadingError(error) {
    console.log(error);
    return {
        type: types.LOAD_FORECAST_ERROR,
        error,
    };
}

export function switchTempUnit(unit) {
    return {
        type: types.SWITCH_UNIT,
        payload: unit,
    };
}

async function _fetchForecastData(place) {
    const [fahrenheit, celsius] = await Promise.all([
        request(createApiUrl(TEMPERATURE.FAHRENHEIT, place), validationSchema),
        request(createApiUrl(TEMPERATURE.CELSIUS, place), validationSchema),
    ])
    return {
        [TEMPERATURE.FAHRENHEIT]: fahrenheit.list,
        [TEMPERATURE.CELSIUS]: celsius.list,
    };
}

export const getNextChunk = (nextEnabled) => {
    return dispatch => {
        if (nextEnabled) {
            dispatch({ type: types.NEXT });
        }
    };
};

export const getPreviousChunk = (pageIndex) => {
    return dispatch => {
        if (pageIndex > 0) {
            dispatch({ type: types.PREVIOUS });
        }
    };
};

export const fetchForecastData = place => {
    return dispatch => {
        dispatch(loadForecast(place));
        _fetchForecastData(place)
            .then(response => {
                dispatch(forecastLoaded(response));
            })
            .catch(error => dispatch(forecastLoadingError(error)));
    };
};
