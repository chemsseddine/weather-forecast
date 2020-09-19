import { createSelector } from 'reselect';

import { PAGE_SIZE, TEMPERATURE } from '../consts';
import { initialForecastState } from './reducers';
import { pick5Days } from '../utils/dateHelpers';

export const selectTempUnit = state => state.tempUnit || TEMPERATURE.FAHRENHEIT;
export const selectForecastData = state => state.forecast.data || initialForecastState;
export const selectCurrentIndex = state => state.pageIndex || 0;


export const selectForecastDataByTemp = createSelector(
    selectForecastData,
    selectTempUnit,
    (forecastData, tempUnit) => forecastData[tempUnit],
);

export const pick5DaysSelector = createSelector(
    selectForecastDataByTemp,
    forecastData => pick5Days(forecastData),
);

export const isNextEnabledSelector = createSelector(
    pick5DaysSelector,
    selectCurrentIndex,
    (forcastData, pageIndex) => !!forcastData[pageIndex + PAGE_SIZE]
)

export const selectForecastChunk = createSelector(
    pick5DaysSelector,
    selectCurrentIndex,
    (forecastData, index) => forecastData.slice(index, index + PAGE_SIZE),
);

