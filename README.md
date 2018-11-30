# sciris-uikit

Shared components for ScirisApps


## Instalation 

**Step 1** Install the package using NPM

`npm install --save git+https://github.com/sciris/sciris-uikit.git`

**Step 2** install the plugin with Vue by added the following to your project (most likey in a `index.js`):

```
mport Vuex from 'vuex';
import ScirisUIKit from 'sciris-uikit';
Vue.use(ScirisUIKit, {
  router: router
});
```

## Example `index.js` 

```js
import Vuex from 'vuex';
import Router from 'vue-router';
import ScirisUIKit from 'sciris-uikit';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: {}, 
  },  
  mutations: {
    newUser(state, user) {
      state.currentUser = user
    },  
  },  
});

Vue.use(Router);

let router = new Router({
  routes: []  
});

Vue.use(ScirisUIKit, {
  router: router
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
})

```
