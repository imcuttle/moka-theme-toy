/**
 * Created by Moyu on 16/10/21.
 */
import { createStore } from 'redux';

export default function configureStore(rootReducer, initialState) {
    const store = createStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./appReducers', () => {
            const nextRootReducer = require('./appReducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}