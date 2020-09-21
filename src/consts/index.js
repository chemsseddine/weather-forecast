//
export const TEMPERATURE = {
    FAHRENHEIT: 'imperial',
    CELSIUS: 'metric',
};
export const PAGE_SIZE = 3;

const APPID = process.env.REACT_APP_WEATHERAPP_APPID;
export const DEFAULT_LOCATION = 'Munich,de';
export const COUNT = 40; // we need 24h/3h * 5 to get 5 days
export const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast'

export const AlgoliaConfig = {
    appId: process.env.ALGOLIA_APPID,
    apiKey: process.env.ALGOLIA_API_KEY
};

export const createApiUrl = (units = TEMPERATURE.FAHRENHEIT, loc) => {
    let params = {
        q: DEFAULT_LOCATION,
        cnt: COUNT,
        APPID,
        units,
    }
    if (loc) {
        const { lat, lng: lon } = loc.latlng
        params = { ...params, lat, lon }
        delete params.q;
    }
    const url = new URL(OPENWEATHER_BASE_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return url
};

