import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'weathericons/css/weather-icons.min.css';

import App from './components/App';
import configureStore from './store';
import 'index.css';


const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);