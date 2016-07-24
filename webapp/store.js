import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import injectCreator from 'webapp/lib/redux-virtual-dom.js';

import reducer from './reducers/index.js';

const middlewares = [thunk];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export const inject = injectCreator(store);

export default store;
