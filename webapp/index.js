import snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import styleModule from 'snabbdom/modules/style';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import h from 'snabbdom/h';
import _ from 'lodash';
import page from 'page';

import store, {getContext} from 'webapp/store.js'

import Counter from './components/counter.js';
import incrementer from './components/incrementer.js';
import decrementer from './components/decrementer.js';

const patch = snabbdom.init([ // Init patch function with choosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventlistenersModule // attaches event listeners
]);

const hooks = ['create', 'update', 'remove', 'insert', 'destroy', 'pre', 'post'];
const generateHooks = (name) => {
  return _.reduce(hooks, (result, hook) => {
    result[hook] = () => console.log(`${name}'s ${hook} called.`);
    return result;
  }, {});
};

// childrenのみを書き換えるパターン
const render = ({dispatch, state}) => {
  const count = state.counter.count;
  return h(`div.test${count}`, {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      border: '1px solid red',
      width: 100 + 'px',
      height: 100 + 'px'
    }
  }, [
    incrementer(),
    Counter(),
    decrementer()
  ]);
};

let container = document.querySelector('#app-container');

// Patch into empty DOM element – this modifies the DOM as a side effect
let tree = render(getContext()); // We need an initial tree
patch(container, tree);

// - with diff then patch(efficient way / with vdom)
const update = () => {
  var newTree = render(getContext());
  patch(tree, newTree);
  tree = newTree;
};

const unSubscribe = store.subscribe(update);
