import React from 'react';
import Next from './Next';
import Prev from './Prev';
import TemperatureSwitcher from './TemperatureSwitcher';
import WeatherCarousel from './WeatherCarousel/WeatherCarousel';

function App() {
  return (
    <div>
      <TemperatureSwitcher />
      <div>
        <Prev />
        <Next />
      </div>
      <h1>Munich, DE</h1>
      <WeatherCarousel />
    </div>
  );
}

export default App;
