import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import WeatherCard from './WeatherCard';
import { selectForecastChunk } from '../../store/selectors';
import { TEMPERATURE } from '../../consts';



const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gridGap: 1em;
`

function WeatherCarousel() {
    const forecasts = useSelector(selectForecastChunk)
    const selectedTemperature = useSelector(state => state.tempUnit) || TEMPERATURE.FAHRENHEIT;
    const isFahrenheit = selectedTemperature === TEMPERATURE.FAHRENHEIT;
    return (
        <Container>
            {forecasts.length && forecasts.map(forecast => (
                <WeatherCard key={forecast.dt} {...forecast} isFahrenheit={isFahrenheit} />
            ))}
        </Container>
    )
}

export default WeatherCarousel
