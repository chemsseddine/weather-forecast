import { createSelector } from 'reselect';

import { PAGE_SIZE } from '../consts';
import { fiveDaysForecast } from '../utils/dateHelpers';

export const selectTempUnit = state => state.tempUnit;
export const selectForecastData = state => state.forecast.data;
export const selectCurrentIndex = state => state.pageIndex;


export const selectForecastDataByTemp = createSelector(
    selectForecastData,
    selectTempUnit,
    (forecastData, tempUnit) => forecastData[tempUnit],
);

export const pick5DaysSelector = createSelector(
    selectForecastDataByTemp,
    forecastData => fiveDaysForecast(forecastData),
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

