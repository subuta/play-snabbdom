import { combineReducers } from 'redux';

import _ from 'lodash';

import counter from './counter.js';

const rootReducer = combineReducers({
    counter
});

export default rootReducer;