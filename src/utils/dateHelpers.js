// FROM SO , better not to trust this code
export const average = array => array.reduce((all, one, _, src) => all += one / src.length, 0)

/**
 * Pick weekdays from list of object days
 *
 *@params arr: list of objects (days)
 *@return array : list of 5 unique objects days 40 entries / 5 days => 8 per day 8* 3 = 24 hours
 */
export const fiveDaysForecast = data => {
    const fiveDaysForecast = [];
    const temperatures = {};
    data.forEach(forecast => {
        const temp = forecast.main.temp;
        const weekDayNumber = new Date(forecast.dt * 1000).getDay(); // 1 or 2, 3, 4 ... 7
        if (!temperatures[weekDayNumber]) {
            const dailyForecast = {
                ...forecast,
                day: new Date(forecast.dt * 1000).toLocaleString('en-us', { weekday: 'long' }),
            }
            fiveDaysForecast.push(dailyForecast);
        }
        temperatures[weekDayNumber] = !temperatures[weekDayNumber] ? [temp] : [...temperatures[weekDayNumber], temp]
    });

    return fiveDaysForecast.map((forecast, index) => ({
        ...forecast,
        calculatedTemperature: Math.round(average(temperatures[index + 1])),
    }))
};
