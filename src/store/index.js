import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import createReducer from './reducers';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const rootReducer = createReducer();

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(ReduxThunk)),
    );
}
