# sciris-uikit

Shared components for ScirisApps


# install the plugin

NOTE: Documentation on this is a WIP

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
