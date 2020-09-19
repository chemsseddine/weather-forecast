//
export const TEMPERATURE = {
    FAHRENHEIT: 'imperial',
    CELSIUS: 'metric',
};
export const PAGE_SIZE = 3;

const APPID = process.env.REACT_APP_WEATHERAPP_APPID;
export const DEFAULT_LOCATION = 'Munich,de';
export const COUNT = 40; // we need 24h/3h * 5 to get 5 days
export const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/'

export const AlgoliaConfig = {
    appId: process.env.ALGOLIA_APPID,
    apiKey: process.env.ALGOLIA_API_KEY
};

export const createApiUrl = (unit = TEMPERATURE.FAHRENHEIT, loc) => {
    const location = loc
        ? `lat=${loc.latlng.lat}&lon=${loc.latlng.lng}`
        : `q=${DEFAULT_LOCATION}`;

    return `${OPENWEATHER_BASE_URL}forecast?${location}&APPID=${APPID}&cnt=${COUNT}&units=${unit}`;
};

