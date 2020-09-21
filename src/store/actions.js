import types from './types';
import { validationSchema } from './schemas';
import { TEMPERATURE, createApiUrl } from '../consts';
import request from '../utils/request';

export const loadForecast = ({ value: city } = {}) => ({ type: types.LOAD_FORECAST, city });

export const forecastLoaded = data => ({ type: types.FORECAST_LOADED, payload: data });

export const forecastLoadingError = error => ({ type: types.LOAD_FORECAST_ERROR, error })

export const switchTempUnit = unit => ({ type: types.SWITCH_UNIT, payload: unit })

export const getNextChunk = () => ({ type: types.NEXT });

export const getPreviousChunk = () => ({ type: types.PREVIOUS });

async function _fetchForecastData(place) {
    const [{ list: fahrenheit }, { list: celsius }] = await Promise.all([
        request(createApiUrl(TEMPERATURE.FAHRENHEIT, place), validationSchema),
        request(createApiUrl(TEMPERATURE.CELSIUS, place), validationSchema)
    ]);
    return {
        [TEMPERATURE.FAHRENHEIT]: fahrenheit,
        [TEMPERATURE.CELSIUS]: celsius,
    };
}


export const fetchForecastData = place => {
    return async (dispatch) => {
        dispatch(loadForecast(place));
        try {
            const data = await _fetchForecastData(place)
            dispatch(forecastLoaded(data))
        } catch (error) {
            console.log(error);
            dispatch(forecastLoadingError(error));
        }
    };
};
