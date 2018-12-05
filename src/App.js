import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Router from './Router';

const App = () => {

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

console.disableYellowBox = true;

export default App;