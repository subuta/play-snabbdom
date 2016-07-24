import h from 'snabbdom/h';

import {connect, inject} from 'webapp/store.js'
import {createSelector} from 'reselect';
import { bindActionCreators } from 'redux'
import {getCount} from 'webapp/reducers/counter.js';

const dummyActions = {
  dummyAction: () => {
    return {
      type: 'dummy'
    }
  }
};

const mapStateToProps = (state) => {
  return {
    count: getCount(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(dummyActions, dispatch)
  }
};

const render = ({props}) => {
  return h(`span`, {
    on: {
      'click': function (ev) {
        return props.dummyAction();
      }
    }
  }, [props.count]);
};

// react-redux way
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(render);

// deku flavored way
// export default inject(
//   render,
//   mapStateToProps,
//   mapDispatchToProps
// );
