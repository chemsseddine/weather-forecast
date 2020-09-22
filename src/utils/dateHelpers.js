// FROM SO , better not to trust this code
export const average = (array = []) => array.reduce((all, one, _, src) => all += one / src.length, 0)

const getWeekDayNumber = unixTimestamp => new Date(unixTimestamp * 1000).getDay();

/**
 * Pick weekdays from list of object days
 *
 *@params arr: list of objects (days)
 *@return array : list of 5 unique objects days  
 */
export const fiveDaysForecast = data => {
    const fiveDaysForecast = [];
    const temperatures = {};
    data.forEach(forecast => {
        const temp = forecast.main.temp;
        const weekDayNumber = getWeekDayNumber(forecast.dt);
        if (!temperatures[weekDayNumber]) {
            fiveDaysForecast.push(forecast);
        }
        temperatures[weekDayNumber] = !temperatures[weekDayNumber] ? [temp] : [...temperatures[weekDayNumber], temp]
    });

    return fiveDaysForecast.map(forecast => {
        const weekDayNumber = getWeekDayNumber(forecast.dt);
        return {
            ...forecast,
            calculatedTemperature: Math.round(average(temperatures[weekDayNumber])),
        };
    })
};
