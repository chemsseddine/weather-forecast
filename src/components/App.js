import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import AlgoliaPlaces from 'algolia-places-react';


import WeatherBarChart from './WeatherBarChart';
import Next from './Next';
import Prev from './Prev';
import Spinner from './Spinner';
import TemperatureSwitcher from './TemperatureSwitcher';
import WeatherCarousel from './WeatherCarousel/WeatherCarousel';
import { AlgoliaConfig } from 'consts';

import { fetchForecastData } from '../store/actions';

const Wrapper = styled.div`
  text-align: center;
`

const Container = styled.div`
  padding: 3em;
`;

function App() {
  const city = useSelector(state => state.forecast.city);
  const isLoading = useSelector(state => state.forecast.loading);
  const loaded = useSelector(state => state.forecast.loaded);
  const error = useSelector(state => state.forecast.error)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchForecastData())
  }, [dispatch])

  if (isLoading && !loaded) return <Spinner />
  if (error) return <div>error</div>
  return (
    <Container>
      <TemperatureSwitcher />
      <Wrapper>
        <Prev />
        <Next />
        <h1>{city}</h1>
        <AlgoliaPlaces
          placeholder="Search by city"
          options={AlgoliaConfig}
          onChange={({ suggestion }) => dispatch(fetchForecastData(suggestion))}
        />
      </Wrapper>
      <WeatherCarousel />
      <WeatherBarChart />
    </Container>
  );
}

export default App;
