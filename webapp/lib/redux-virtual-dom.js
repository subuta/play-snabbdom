import _ from 'lodash';
import {getContext} from './store.js';
import {createSelector} from 'reselect';

// injects store context to render function.
export const inject = (render, mapStateToProps, mapDispatchToProps) => (props = {}) => {
  const {state, dispatch} = getContext();

  // if only render function passed.
  if (!_.isFunction(mapStateToProps)) {
    // render with context
    return render({props, state, dispatch});
  }

  // render with selector
  return render({props, dispatch, state: mapStateToProps(state)});
};

export default {
  inject
}
