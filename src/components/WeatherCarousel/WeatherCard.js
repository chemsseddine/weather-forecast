import React from 'react';
import Card from '@material-ui/core/Card';

import PressureIcon from "assets/gauge.svg";
import HumidityIcon from "assets/humidity.svg";
import WindIcon from "assets/wind.svg";
import {
    ExtraInfo,
    Img,
    Daily,
    Temperature,
    Wrapper,
    DateRow,
    WeatherType,
    Weather,
    CurrentDate
} from "./extendedComponents";


export default function WeatherCard(props) {

    const mainTemperature = Math.round(props.main.temp);
    const mainPressure = Math.round(props.main.pressure);
    const forecastDate = new Date(props.dt * 1000).toDateString();

    return (
        <Card>
            <Wrapper>
                <DateRow>
                    <CurrentDate>{forecastDate}</CurrentDate>
                    <WeatherType>{props.weather[0].description}</WeatherType>
                </DateRow>
                <Weather>
                    <Temperature>
                        {mainTemperature}° {props.isFahrenheit ? 'F' : 'C'}
                    </Temperature>
                    <i className={`wi wi-owm-day-${props.weather[0].id}`} />
                    <Daily>
                        <ExtraInfo>
                            <span>
                                <Img src={HumidityIcon} />
                            </span>
                            <span>{props.main.humidity} %</span>
                        </ExtraInfo>
                        <ExtraInfo>
                            <span>
                                <Img src={PressureIcon} />
                            </span>
                            <span>{mainPressure} hPa</span>
                        </ExtraInfo>
                        <ExtraInfo>
                            <span>
                                <Img src={WindIcon} />
                            </span>
                            <span>
                                {props.wind.speed} {props.isFahrenheit ? 'mph' : 'mps'}
                            </span>
                        </ExtraInfo>
                    </Daily>
                </Weather>
            </Wrapper>
        </Card>
    );
}