/**
 * Pick weekdays from list of object days
 *
 *@params arr: list of objects (days)
 *@return array : list of 5 unique objects days
 */
export const pick5Days = arr => {
    const tempArray = [];
    const days = [];
    arr.forEach(function (element) {
        let currentDay = new Date(element.dt * 1000).getDay();
        if (!days.length) {
            tempArray.push({
                day: new Date(element.dt * 1000).toLocaleString('en-us', {
                    weekday: 'long',
                }),
                ...element,
            });
            days.push(currentDay);
        } else if (!days.includes(currentDay)) {
            tempArray.push({
                day: new Date(element.dt * 1000).toLocaleString('en-us', {
                    weekday: 'long',
                }),
                ...element,
            });
            days.push(currentDay);
        }
    });
    return tempArray;
};
