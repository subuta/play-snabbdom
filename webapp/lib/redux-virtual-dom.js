import equal from 'deep-equal';

// receive redux store and return inject.
export default function(store) {
  const {dispatch, getState} = store;
  let cache = {};

  // injects store context to render function.
  const inject = function(render, mapStateToProps, mapDispatchToProps) {
    return (props = {}) => {
      const state = getState();

      // check mapper functions.
      const hasMapStateToProps = mapStateToProps && mapStateToProps instanceof Function;
      const hasDispatchToProps = mapDispatchToProps && mapDispatchToProps instanceof Function;
      const isChanged = !equal(cache[render].lastProps, props) || !equal(cache[render].lastState, state);

      // getResult from render and state.
      const getResult = () => {
        if (hasMapStateToProps) {
          props = {...props, ...mapStateToProps(state)};
        } else if (hasDispatchToProps) {
          props = {...props, ...mapDispatchToProps(dispatch)};
        }
        return render({props, state, dispatch});
      };

      // calls if not cached or has some changes in state. (memoize)
      if (!cache[render] || isChanged) {
        cache[render] = {
          result: getResult(),
          lastProps: props,
          lastState: state
        }
      }

      return cache[render].result;
    };
  };

  return inject;
};
