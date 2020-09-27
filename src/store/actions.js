import types from './types';
import { validationSchema } from './schemas';
import { TEMPERATURE, createApiUrl } from '../consts';
import request from '../utils/request';

export const loadForecast = fetchingId => ({ type: types.LOAD_FORECAST, fetchingId });

export const forecastLoaded = (data, { value: city } = {}, fetchingId) => {
    return {
        type: types.FORECAST_LOADED,
        payload: data,
        city,
        fetchingId
    };
}

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


/* ignore response if its not matching last generated id
state    : { fetchinId: 5}------> { fetchingId: 6} -------{fetchingId: 6}-----{fetchingId: 6}
actions1 : action1(id=1) -----> fetch1 ---------------------------------------response1(id=5)
actions2 :.................action2(id=6) ----> fetch2 --- response2(id=6) 
response2 will be handled since its matching the same fetching id
response1 will be ignored since its fetching id doesnt match the last setted id 
*/
export const fetchForecastData = place => {
    return async (dispatch) => {
        const fetchingId = Math.random();
        dispatch(loadForecast(fetchingId)); // start loading
        try {
            const data = await _fetchForecastData(place)
            dispatch(forecastLoaded(data, place, fetchingId))
        } catch (error) {
            console.log(error);
            dispatch(forecastLoadingError(error.message));
        }
    };
};
