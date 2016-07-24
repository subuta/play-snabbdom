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

      // getResult from render and state.
      const getResult = () => {
        if (!hasMapStateToProps) {
          return render({props, state, dispatch});
        } else if (hasMapStateToProps && !hasDispatchToProps) {
          return render({props, dispatch, state: mapStateToProps(state)});
        }
        return render({props, dispatch: dispatch, state: mapStateToProps(state)});
      };

      // calls if not cached or has some changes in state. (memoize)
      if (!cache[render] || !equal(cache[render].lastState, state)) {
        cache[render] = {
          result: getResult(),
          lastState: state
        }
      }

      return cache[render].result;
    };
  };

  return inject;
};
