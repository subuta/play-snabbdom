import snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import styleModule from 'snabbdom/modules/style';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import h from 'snabbdom/h';
import _ from 'lodash';

console.log('sample!');

const patch = snabbdom.init([ // Init patch function with choosen modules
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventlistenersModule // attaches event listeners
]);

const hooks = ['create', 'update', 'remove', 'insert', 'destroy', 'pre', 'post'];
const generateHooks = (name) =>{
    return _.reduce(hooks, (result, hook) => {
        result[hook] = () => console.log(`${name}'s ${hook} called.`);
        return result;
    }, {});
};

// childrenのみを書き換えるパターン
// const render = (phase = 1) => {
//     let children = [];
//     if (phase === 1) {
//         children = h('span', {hook: generateHooks('child')}, ['nested']);
//     } else if (phase === 2) {
//         children = h('span', {hook: generateHooks('child')}, ['updated']);
//     } else if (phase === 3) {
//         children = h('span', {hook: generateHooks('child')}, ['done']);
//     }
//
//     return h(`div#app-container`, {
//         hook: generateHooks('container')
//     }, h('div', {
//         hook: generateHooks('nested')
//     }, [children]));
// };

// 全部描画しなおし+Elementsのみl
const render = (phase = 1) => {
    if (phase === 1) {
        return h(`div#app-container`, {
            hook: generateHooks('container')
        }, [h('div', {
            hook: generateHooks('nested')
        }, [h('span', {hook: generateHooks('child')}, ['nested'])])]);
    } else if (phase === 2) {
        return h(`div#app-container`, {
            hook: generateHooks('container')
        }, [h('div', {
            hook: generateHooks('nested')
        }, [h('span', {hook: generateHooks('child')}, ['updated'])])]);
    } else if (phase === 3) {
        return h(`div#app-container`, {
            hook: generateHooks('container')
        }, [h('div', {
            hook: generateHooks('nested')
        }, [h('span', {hook: generateHooks('child')}, ['done'])])]);
    } else if (phase === 4) {
        return h(`div#app-container`, {
            hook: generateHooks('container')
        }, []);
    }
};

let container = document.querySelector('#app-container');

// Patch into empty DOM element – this modifies the DOM as a side effect
let tree = render(); // We need an initial tree
patch(container, tree);

// - with diff then patch(efficient way / with vdom)
const update = (phase = 1) => {
    var newTree = render(phase);
    patch(tree, newTree);
    tree = newTree;
};

_.delay(() => {
    update(2);
}, 3000);

_.delay(() => {
    update(3);
}, 5000);

_.delay(() => {
    update(1);
}, 7000);

_.delay(() => {
    update(4);
}, 9000);

_.delay(() => {
    update(1);
}, 11000);