import h from 'snabbdom/h';

import store, {inject} from 'webapp/store.js'
import {createSelector} from 'reselect';
import {getCount} from 'webapp/reducers/counter.js';

export default inject(({state}) => {
  const count = getCount(state);
  return h(`span`, {
    on: {
      'click': function (ev) {
        store.dispatch({
          type: 'dummy'
        });
      }
    }
  }, [count]);
});
