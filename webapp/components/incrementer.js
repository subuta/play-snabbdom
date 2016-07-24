import h from 'snabbdom/h';
import { getContext } from 'webapp/store.js'

import {
    increment
} from 'webapp/actions/counter.js';

export default () => {
    const { dispatch, state } = getContext();
    return h(`button`, {
        on : {
          click: function (ev) {
              dispatch(increment());
          }
        },
        style: {
            height: '20px'
        }
    }, ['increment']);
};