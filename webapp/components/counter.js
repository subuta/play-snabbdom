import h from 'snabbdom/h';

import store, { getContext } from 'webapp/store.js'
import { createSelector } from 'reselect';
import { getCount } from 'webapp/reducers/counter.js';

const render = (state) => {
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
};

export default () => {
    const { dispatch, state } = getContext();
    return render(state);
};