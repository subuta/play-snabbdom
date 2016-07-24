import h from 'snabbdom/h';
import {getContext} from 'webapp/store.js'

import {
  decrement
} from 'webapp/actions/counter.js';

export default () => {
  const {dispatch, state} = getContext();
  return h(`button`, {
    on: {
      click: function (ev) {
        dispatch(decrement());
      }
    },
    style: {
      height: '20px'
    }
  }, ['decrement']);
};
