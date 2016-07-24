// receive redux store and return inject.
export default (store) => {
  const {dispatch, getState} = store;
  // injects store context to render function.
  const inject = (render, mapStateToProps, mapDispatchToProps) => (props = {}) => {
    const state = getState();

    const hasMapStateToProps = mapStateToProps && mapStateToProps instanceof Function;
    // const hasDispatchToProps = mapDispatchToProps && mapDispatchToProps instanceof Function;

    // if only render function passed.
    if (!hasMapStateToProps) {
      // render with context
      return render({props, state, dispatch});
    }

    // render with selector
    return render({props, dispatch, state: mapStateToProps(state)});
  };

  return inject;
};
