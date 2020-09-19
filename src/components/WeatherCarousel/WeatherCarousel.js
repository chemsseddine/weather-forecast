import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import WeatherCard from './WeatherCard';
import { selectForecastChunk } from '../../store/selectors';
import { TEMPERATURE } from '../../consts';


const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridGap: '1em'
    },
})

function WeatherCarousel() {
    const forecasts = useSelector(selectForecastChunk)
    const selectedTemperature = useSelector(state => state.tempUnit) || TEMPERATURE.FAHRENHEIT;
    const isFahrenheit = selectedTemperature === TEMPERATURE.FAHRENHEIT;
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {forecasts.length && forecasts.map(forecast => (
                <WeatherCard key={forecast.dt} {...forecast} isFahrenheit={isFahrenheit} />
            ))}
        </div>
    )
}

export default WeatherCarousel
