import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import styled from 'styled-components';

import { TEMPERATURE } from '../consts'
import { switchTempUnit } from '../store/actions';

const Wrapper = styled.div`
  text-align: center;
`

function TemperatureSwitcher() {
    const dispatch = useDispatch();

    const selectedTemperature = useSelector(state => state.tempUnit) || TEMPERATURE.FAHRENHEIT;
    const handleTempSwitch = (event) => dispatch(switchTempUnit(event.target.value))

    const isFahrenheit = selectedTemperature === TEMPERATURE.FAHRENHEIT;

    return (
        <Wrapper>
            <FormControlLabel
                control={
                    <Radio
                        onChange={handleTempSwitch}
                        checked={!isFahrenheit}
                        value={TEMPERATURE.CELSIUS}
                    />
                }
                label='Celsius'
                labelPlacement='end'
            />
            <FormControlLabel
                control={
                    <Radio
                        onChange={handleTempSwitch}
                        checked={isFahrenheit}
                        value={TEMPERATURE.FAHRENHEIT}
                    />
                }
                label='Fahrenheit'
                labelPlacement='end'
            />
        </Wrapper>
    )
}

export default TemperatureSwitcher
