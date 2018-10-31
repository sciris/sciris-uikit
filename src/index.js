//import plugins from './plugins.js';
import './styles/index.scss';

import LoginPage from './views/LoginPage.vue';
import ChangePasswordPage from './views/ChangePasswordPage.vue';
import MainAdminPage from './views/MainAdminPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import UserChangeInfoPage from './views/UserChangeInfoPage.vue';

import EventBus from './eventbus.js';
import { events } from './eventbus.js';

const ScirisRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }, {
    path: '/changepassword',
    name: 'Change password',
    component: ChangePasswordPage
  }, {
    path: '/mainadmin',
    name: 'Admin',
    component: MainAdminPage
  }, {
    path: '/register',
    name: 'Registration',
    component: RegisterPage
  }, {
    path: 'changeinfo',
    name: 'Edit account',
    component: UserChangeInfoPage
  }
]

function install(Vue, options={}) {
  options.router.addRoutes(ScirisRoutes);

  let afterLoginPath = options.afterLoginPath || "/"; 
  let afterPasswordChangePath = options.afterPasswordChangePath || "/"; 
  let afterRegistrationPath = options.afterRegistrationPath || "/login"; 

  EventBus.$on(events.EVENT_LOGIN_SUCCESS, (user) => {
    options.router.push(afterLoginPath); 
  });

  EventBus.$on(events.EVENT_REGISTER_SUCCESS, () => {
      setTimeout(function() {
        options.router.push(afterRegistrationPath)
      }, 1000); // Navigate automatically to the login page after a delay
  });

  EventBus.$on(events.EVENT_PASSWORD_CHANGE_SUCCESS, (user) => {
    options.router.push(afterPasswordChangePath);
  });
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install})
}

export default {
  install
}

export {
  ScirisRoutes,
  EventBus,
  events
}
