/*!
 * sciris-uikit v0.1.0
 * (c) 2018-present Optima Consortium <info@ocds.co>
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var sciris = _interopDefault(require('sciris-js'));
var Simplert = _interopDefault(require('vue2-simplert-plugin'));
require('vue-clickaway');
var _$1 = _interopDefault(require('lodash'));

const EVENT_LOGIN_SUCCESS = 'sciris:login:success';
const EVENT_LOGIN_FAIL = 'sciris:login:fail';
const EVENT_PASSWORD_CHANGE_SUCCESS = 'sciris:passwordchange:success';
const EVENT_PASSWORD_CHANGE_FAIL = 'sciris:passwordchange:fail';
const EVENT_REGISTER_SUCCESS = 'sciris:register:success';
const EVENT_REGISTER_FAIL = 'sciris:register:fail';
const EVENT_INFO_CHANGE_SUCCESS$1 = 'sciris:infochange:success';
const EVENT_INFO_CHANGE_FAIL$1 = 'sciris:infochange:fail';
const EVENT_LOGOUT_SUCCESS = 'sciris:logout:success';
const events = {
  EVENT_LOGIN_FAIL,
  EVENT_LOGIN_SUCCESS,
  EVENT_REGISTER_SUCCESS,
  EVENT_REGISTER_FAIL,
  EVENT_PASSWORD_CHANGE_SUCCESS,
  EVENT_PASSWORD_CHANGE_FAIL,
  EVENT_INFO_CHANGE_SUCCESS: EVENT_INFO_CHANGE_SUCCESS$1,
  EVENT_INFO_CHANGE_FAIL: EVENT_INFO_CHANGE_FAIL$1,
  EVENT_LOGOUT_SUCCESS
};
const EventBus = new Vue();

//
var script = {
  name: 'LoginPage',
  props: {
    homepage: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    verboseToolName: {
      type: String,
      default: ""
    },
    authBackgroundColour: {
      type: String,
      default: "#0c2544"
    },
    favicon: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      loginUserName: '',
      loginPassword: '',
      loginResult: '',
      version: '',
      date: ''
    };
  },

  computed: {
    getVersionInfo() {
      sciris.rpc('get_version_info').then(response => {
        this.version = response.data['version'];
        this.date = response.data['date'];
      });
    }

  },
  methods: {
    tryLogin() {
      sciris.loginCall(this.loginUserName, this.loginPassword).then(response => {
        if (response.data === 'success') {
          // Set a success result to show.
          this.loginResult = 'Logging in...'; // Read in the full current user information.

          sciris.getCurrentUserInfo().then(response2 => {
            // Set the username to what the server indicates.
            let user = response2.data.user;
            this.$store.commit('newUser', user); // Navigate automatically to the home page.

            EventBus.$emit(events.EVENT_LOGIN_SUCCESS, user);
          }).catch(error => {
            // Set the username to {}.  An error probably means the
            // user is not logged in.
            this.$store.commit('newUser', {});
          });
        } else {
          // Set a failure result to show.
          this.loginResult = response.data;
        }
      }).catch(error => {
        EventBus.$emit(events.EVENT_LOGIN_FAIL, error);
        console.log('Login failed', error);
        this.loginResult = "We're sorry, it seems we're having trouble communicating with the server.  Please contact support or try again later.";
      });
    }

  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "";
styleInject(css);

/* script */
            const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage",staticStyle:{"background-color":"#f8f8f4","position":"fixed","min-height":"100%","min-width":"100%","padding":"0 0 0 0"},model:{value:(_vm.getVersionInfo),callback:function ($$v) {_vm.getVersionInfo=$$v;},expression:"getVersionInfo"}},[_c('div',{staticStyle:{"background-color":"#0c2544","position":"absolute","height":"100%","width":"260px"}},[_c('div',{staticClass:"logo"},[_c('div',{staticClass:"simple-text",staticStyle:{"font-size":"20px","color":"#fff","font-weight":"bold","padding":"20px"}},[(_vm.favicon)?_c('div',{staticClass:"logo-img",staticStyle:{"height":"40px","width":"40px","line-height":"40px","border-radius":"40px","background-color":"#fff","text-align":"center","display":"inline-block"}},[_c('img',{attrs:{"src":_vm.favicon,"width":"21px","vertical-align":"middle","alt":""}})]):_vm._e(),_vm._v(" "),_c('span',{staticStyle:{"padding-left":"10px"}},[(_vm.homepage)?_c('a',{attrs:{"href":_vm.homepage,"target":"_blank"}},[_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})]):_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})]),_vm._v(" "),_c('br'),_c('br'),_vm._v(" "),(_vm.version)?_c('div',{staticStyle:{"font-size":"14px","font-weight":"normal"}},[(_vm.verboseToolName)?_c('div',[_vm._v("\n            "+_vm._s(_vm.verboseToolName)+" \n          ")]):_vm._e(),_vm._v("\n          Version "+_vm._s(_vm.version)+" ("+_vm._s(_vm.date)+")\n        ")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticStyle:{"margin-right":"-260px"}},[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 auto"},attrs:{"name":"LogInForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryLogin($event)}}},[_c('div',{staticClass:"modal-body"},[_c('h2',[_vm._v("Login")]),_vm._v(" "),(_vm.loginResult != '')?_c('div',{staticClass:"section"},[_vm._v(_vm._s(_vm.loginResult))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.loginUserName),expression:"loginUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"username","placeholder":"User name","required":"required"},domProps:{"value":(_vm.loginUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.loginUserName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.loginPassword),expression:"loginPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Password","required":"required"},domProps:{"value":(_vm.loginPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.loginPassword=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Login")]),_vm._v(" "),_c('div',{staticClass:"section"},[_vm._v("\n          New user?\n          "),_c('router-link',{attrs:{"to":"/register"}},[_vm._v("\n            Register here\n          ")])],1)])])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-da0f2330";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "LoginPage.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var LoginPage = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'ChangePasswordPage',

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      changeResult: ''
    };
  },

  methods: {
    tryChangePassword() {
      sciris.changeUserPassword(this.oldPassword, this.newPassword).then(response => {
        if (response.data === 'success') {
          sciris.succeed(this, 'Password updated'); // Read in the full current user information.

          sciris.getCurrentUserInfo().then(response2 => {
            // Set the username to what the server indicates.
            let user = response2.data.user;
            this.$store.commit('newUser', user); // Navigate automatically to the home page.

            EventBus.$emit(events.EVENT_PASSWORD_CHANGE_SUCCESS, user);
          }).catch(error => {
            // Set the username to {}.  An error probably means the
            // user is not logged in.
            this.$store.commit('newUser', {});
          });
        } else {
          this.changeResult = response.data;
        }
      }).catch(error => {
        sciris.fail(this, 'Password updated failed', error);
        EventBus.$emit(events.EVENT_PASSWORD_CHANGE_FAIL, error);
      });
    }

  }
};

var css$1 = "\n.password-change-form[data-v-ef593f68]{max-width:300px;min-width:100px;margin:0\n}";
styleInject(css$1);

/* script */
            const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.changeResult != '')?_c('p',[_vm._v(_vm._s(_vm.changeResult))]):_vm._e(),_vm._v(" "),_c('form',{staticClass:"password-change-form",attrs:{"name":"ChangePasswordForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryChangePassword($event)}}},[_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.oldPassword),expression:"oldPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"oldpassword","placeholder":"Reenter old password","required":"required"},domProps:{"value":(_vm.oldPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.oldPassword=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newPassword),expression:"newPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Enter new password","required":"required"},domProps:{"value":(_vm.newPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newPassword=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Update")]),_vm._v(" "),_c('br')])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = "data-v-ef593f68";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ChangePasswordPage.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ChangePasswordPage = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
var script$2 = {
  name: 'MainAdminPage',

  data() {
    return {
      usersList: [],
      adminResult: ''
    };
  },

  created() {
    this.getUsersInfo();
  },

  methods: {
    getUsersInfo() {
      sciris.getAllUsersInfo().then(response => {
        this.usersList = response.data;
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Could not load users from server.';
      });
    },

    activateAccount(username) {
      sciris.activateUserAccount(username).then(response => {
        // If the response was successful...
        if (response.data == 'success') // Give result message.
          this.adminResult = 'User account activated.'; // Otherwise (failure)
        else // Give result message.
          this.adminResult = 'Account activation not successful.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Account activation not successful.';
      });
    },

    deactivateAccount(username) {
      sciris.deactivateUserAccount(username).then(response => {
        // If the response was successful...
        if (response.data == 'success') // Give result message.
          this.adminResult = 'User account deactivated.'; // Otherwise (failure)
        else // Give result message.
          this.adminResult = 'Account deactivation not successful.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Account deactivation not successful.';
      });
    },

    grantAdmin(username) {
      sciris.grantUserAdminRights(username).then(response => {
        // If the response was successful...
        if (response.data == 'success') // Give result message.
          this.adminResult = 'Admin access granted.'; // Otherwise (failure)
        else // Give result message.
          this.adminResult = 'Admin granting not successful.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Admin granting not successful.';
      });
    },

    revokeAdmin(username) {
      sciris.revokeUserAdminRights(username).then(response => {
        // If the response was successful...
        if (response.data == 'success') // Give result message.
          this.adminResult = 'Admin access revoked.'; // Otherwise (failure)
        else // Give result message.
          this.adminResult = 'Admin revocation not successful.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Admin revocation not successful.';
      });
    },

    resetPassword(username) {
      sciris.resetUserPassword(username).then(response => {
        // If the response was successful...
        if (response.data == 'success') // Give result message.
          this.adminResult = 'Password reset.'; // Otherwise (failure)
        else // Give result message.
          this.adminResult = 'Password reset not successful.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Password reset not successful.';
      });
    },

    deleteUser(username) {
      sciris.deleteUser(username).then(response => {
        // Give result message.
        this.adminResult = 'User deleted.'; // Get the users info again.

        this.getUsersInfo();
      }).catch(error => {
        // Give result message.
        this.adminResult = 'Deletion not successful.';
      });
    }

  }
};

var css$2 = "";
styleInject(css$2);

/* script */
            const __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage"},[_c('h2',[_vm._v("Users")]),_vm._v(" "),(_vm.usersList[0] != undefined)?_c('table',[_vm._m(0),_vm._v(" "),_vm._l((_vm.usersList),function(userobj){return _c('tr',[_c('td',[_vm._v(_vm._s(userobj.user.username))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.displayname))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.email))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.accountactive))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.admin))]),_vm._v(" "),_c('td',[_c('button',{on:{"click":function($event){_vm.activateAccount(userobj.user.username);}}},[_vm._v("Activate Account")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.deactivateAccount(userobj.user.username);}}},[_vm._v("Deactivate Account")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.grantAdmin(userobj.user.username);}}},[_vm._v("Grant Admin")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.revokeAdmin(userobj.user.username);}}},[_vm._v("Revoke Admin")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.resetPassword(userobj.user.username);}}},[_vm._v("Reset Password")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.deleteUser(userobj.user.username);}}},[_vm._v("Delete Account")])])])})],2):_vm._e(),_vm._v(" "),(_vm.adminResult != '')?_c('p',[_vm._v(_vm._s(_vm.adminResult))]):_vm._e()])};
var __vue_staticRenderFns__$2 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Username")]),_vm._v(" "),_c('th',[_vm._v("Display name")]),_vm._v(" "),_c('th',[_vm._v("Email")]),_vm._v(" "),_c('th',[_vm._v("Account active?")]),_vm._v(" "),_c('th',[_vm._v("Admin?")]),_vm._v(" "),_c('th',[_vm._v("Actions")])])}];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = "data-v-7333a836";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "MainAdminPage.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var MainAdminPage = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
var script$3 = {
  name: 'RegisterPage',
  props: {
    homepage: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    favicon: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      registerUserName: '',
      registerPassword: '',
      registerDisplayName: '',
      registerEmail: '',
      registerResult: '',
      version: '',
      date: ''
    };
  },

  computed: {
    getVersionInfo() {
      sciris.rpc('get_version_info').then(response => {
        this.version = response.data['version'];
        this.date = response.data['date'];
      });
    }

  },
  methods: {
    tryRegister() {
      sciris.registerUser(this.registerUserName, this.registerPassword, this.registerDisplayName, this.registerEmail).then(response => {
        if (response.data === 'success') {
          // Set a success result to show.
          this.registerResult = 'Success! Please wait while you are redirected...';
          EventBus.$emit(events.EVENT_REGISTER_SUCCESS);
        } else {
          // Set a failure result to show.
          this.registerResult = response.data;
        }
      }).catch(error => {
        EventBus.$emit(events.EVENT_REGISTER_FAIL, error);
        console.log('Register failed', error);
        this.registerResult = "We're sorry, it seems we're having trouble communicating with the server.  Please contact support or try again later.";
      });
    }

  }
};

var css$3 = "";
styleInject(css$3);

/* script */
            const __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage",staticStyle:{"background-color":"#f8f8f4","position":"fixed","min-height":"100%","min-width":"100%","padding":"0 0 0 0"},model:{value:(_vm.getVersionInfo),callback:function ($$v) {_vm.getVersionInfo=$$v;},expression:"getVersionInfo"}},[_c('div',{staticStyle:{"background-color":"#0c2544","position":"absolute","height":"100%","width":"260px"}},[_c('div',{staticClass:"logo"},[_c('div',{staticClass:"simple-text",staticStyle:{"font-size":"20px","color":"#fff","font-weight":"bold","padding":"20px"}},[(_vm.favicon)?_c('div',{staticClass:"logo-img",staticStyle:{"height":"40px","width":"40px","line-height":"40px","border-radius":"40px","background-color":"#fff","text-align":"center","display":"inline-block"}},[_c('img',{attrs:{"src":_vm.favicon,"width":"21px","vertical-align":"middle","alt":""}})]):_vm._e(),_vm._v(" "),_c('span',{staticStyle:{"padding-left":"10px"}},[(_vm.homepage)?_c('a',{attrs:{"href":_vm.homepage,"target":"_blank"}},[_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})]):_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})]),_vm._v(" "),_c('br'),_c('br'),_vm._v(" "),_c('div',{staticStyle:{"font-size":"14px","font-weight":"normal"}},[_vm._v("\n          Version "+_vm._s(_vm.version)+" ("+_vm._s(_vm.date)+")\n        ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"margin-right":"-260px"}},[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 auto"},attrs:{"name":"RegisterForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryRegister($event)}}},[_c('div',{staticClass:"modal-body"},[_c('h2',[_vm._v("Register")]),_vm._v(" "),(_vm.registerResult != '')?_c('div',{staticClass:"section"},[_vm._v(_vm._s(_vm.registerResult))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerUserName),expression:"registerUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"username","placeholder":"User name","required":"required"},domProps:{"value":(_vm.registerUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerUserName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerPassword),expression:"registerPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Password","required":"required"},domProps:{"value":(_vm.registerPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerPassword=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerDisplayName),expression:"registerDisplayName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"displayname","placeholder":"Display name (optional)"},domProps:{"value":(_vm.registerDisplayName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerDisplayName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerEmail),expression:"registerEmail"}],staticClass:"txbox __l",attrs:{"type":"text","name":"email","placeholder":"Email (optional)"},domProps:{"value":(_vm.registerEmail)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerEmail=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Register")]),_vm._v(" "),_c('div',{staticClass:"section"},[_vm._v("\n          Already registered?\n          "),_c('router-link',{attrs:{"to":"/login"}},[_vm._v("\n            Login\n          ")])],1)])])])])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = "data-v-62629de9";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "RegisterPage.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var RegisterPage = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
var script$4 = {
  name: 'UserChangeInfoPage',

  data() {
    return {
      changeUserName: this.$store.state.currentUser.username,
      changeDisplayName: this.$store.state.currentUser.displayname,
      changeEmail: this.$store.state.currentUser.email,
      changePassword: '',
      changeResult: ''
    };
  },

  methods: {
    tryChangeInfo() {
      sciris.changeUserInfo(this.changeUserName, this.changePassword, this.changeDisplayName, this.changeEmail).then(response => {
        if (response.data === 'success') {
          sciris.succeed(this, 'User info updated'); // Set a success result to show.

          sciris.getCurrentUserInfo() // Read in the full current user information.
          .then(response2 => {
            let user = response2.data.user;
            this.$store.commit('newUser', user); // Set the username to what the server indicates.

            EventBus.$emit(EVENT_INFO_CHANGE_SUCCESS, user);
            /**
            router.push('/') // Navigate automatically to the home page.
            **/
          }).catch(error => {
            this.$store.commit('newUser', {}); // Set the username to {}.  An error probably means the user is not logged in.
          });
        } else {
          this.changeResult = response.data;
        }
      }).catch(error => {
        sciris.fail(this, 'Failed to update user info, please check password and try again', error);
        EventBus.$emit(EVENT_INFO_CHANGE_FAIL, error);
      });
    }

  }
};

var css$4 = "";
styleInject(css$4);

/* script */
            const __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 0"},attrs:{"name":"ChangeUserInfo"},on:{"submit":function($event){$event.preventDefault();return _vm.tryChangeInfo($event)}}},[_c('div',{staticClass:"divTable"},[_c('div',{staticClass:"divTableBody"},[_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Username ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeUserName),expression:"changeUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changeusername","required":"required"},domProps:{"value":(_vm.changeUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeUserName=$event.target.value;}}})])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Display name ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeDisplayName),expression:"changeDisplayName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changedisplayname"},domProps:{"value":(_vm.changeDisplayName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeDisplayName=$event.target.value;}}})])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Email ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeEmail),expression:"changeEmail"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changedemail"},domProps:{"value":(_vm.changeEmail)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeEmail=$event.target.value;}}})])])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Enter password")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changePassword),expression:"changePassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"changepassword","required":"required"},domProps:{"value":(_vm.changePassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changePassword=$event.target.value;}}})])])]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Update")]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.changeResult != '')?_c('p',[_vm._v(_vm._s(_vm.changeResult))]):_vm._e()])])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = "data-v-1187d274";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "UserChangeInfoPage.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var UserChangeInfoPage = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
//
//
//
var script$5 = {
  props: {
    moveY: {
      type: Number,
      default: 0
    }
  },
  computed: {
    /**
     * Styles to animate the arrow
     * @returns {{transform: string}}
     */
    arrowStyle() {
      return {
        transform: `translate3d(0px, ${this.moveY}px, 0px)`
      };
    }

  }
};

var css$5 = "\n.moving-arrow[data-v-056facd8]{border-right:17px solid #f4f3ef;border-top:17px solid transparent;border-bottom:17px solid transparent;display:inline-block;position:absolute;left:243px;top:82px;transition:all .5s cubic-bezier(.29,1.42,.79,1)\n}";
styleInject(css$5);

/* script */
            const __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"moving-arrow",style:(_vm.arrowStyle)})};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = "data-v-056facd8";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "MovingArrow.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var MovingArrow = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
var script$6 = {
  name: "Sidebar",
  props: {
    type: {
      type: String,
      default: 'sidebar',
      validator: value => {
        let acceptedValues = ['sidebar', 'navbar'];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    backgroundColor: {
      type: String,
      default: 'darkblue',
      validator: value => {
        let acceptedValues = ['white', 'black', 'darkblue'];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: value => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    favicon: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    logoWidth: {
      type: String,
      default: "160px"
    },
    links: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MovingArrow
  },
  computed: {
    sidebarClasses() {
      if (this.type === 'sidebar') {
        return 'sidebar';
      } else {
        return 'collapse navbar-collapse off-canvas-sidebar';
      }
    },

    navClasses() {
      if (this.type === 'sidebar') {
        return 'nav';
      } else {
        return 'nav navbar-nav';
      }
    },

    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    }

  },

  data() {
    return {
      linkHeight: 50,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false
    };
  },

  methods: {
    findActiveLink() {
      this.links.find((element, index) => {
        let found = element.path === this.$route.path;

        if (found) {
          this.activeLinkIndex = index;
        }

        return found;
      });
    }

  },

  mounted() {
    this.findActiveLink();
  },

  watch: {
    $route: function (newRoute, oldRoute) {
      this.findActiveLink();
    }
  }
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.sidebarClasses,attrs:{"data-background-color":_vm.backgroundColor,"data-active-color":_vm.activeColor}},[_c('div',{staticClass:"sidebar-wrapper",attrs:{"id":"style-3"}},[_c('div',{staticClass:"sidebar-content"},[(_vm.favicon)?_c('div',{staticClass:"logo"},[_c('a',{staticClass:"simple-text",attrs:{"href":"#"}},[_c('div',{staticClass:"logo-img"},[_c('img',{attrs:{"src":_vm.favicon,"alt":""}})]),_vm._v(" "),_c('img',{staticClass:"logotype",attrs:{"src":_vm.logo,"width":_vm.logoWidth,"vertical-align":"middle","alt":""}})])]):_c('div',{staticClass:"logo"},[_c('a',{staticClass:"simple-text",attrs:{"href":"#"}},[_c('img',{attrs:{"src":_vm.logo,"width":_vm.logoWidth,"vertical-align":"middle","alt":""}})])]),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('ul',{class:_vm.navClasses},_vm._l((_vm.links),function(link,index){return _c('router-link',{key:link.name + index,ref:link.name,refInFor:true,staticClass:"nav-item",attrs:{"tag":"li","to":link.path}},[_c('a',[_c('i',{class:link.icon}),_vm._v(" "),_c('p',[_vm._v(_vm._s(link.name)+"\n              ")])])])})),_vm._v(" "),_c('moving-arrow',{attrs:{"move-y":_vm.arrowMovePx}})],2)])])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Sidebar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Sidebar = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//
var script$7 = {
  name: 'Navbar',
  props: {
    links: {
      type: Array,
      default: () => []
    },
    homepage: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    },
    showRouteName: {
      type: String,
      default: "hide"
    }
  },

  // Health prior function
  data() {
    return {
      activePage: 'manage projects'
    };
  },

  computed: {
    // Health prior function
    hideRouteName() {
      if (this.showRouteName == "hide") {
        return true;
      } else {
        return false;
      }
    },

    currentUser() {
      return this.$store.state.currentUser;
    },

    activeProjectName() {
      console.log(this.links);

      if (this.$store.state.activeProject.project === undefined) {
        return 'none';
      } else {
        return this.$store.state.activeProject.project.name;
      }
    },

    activeUserName() {
      // Get the active user name -- the display name if defined; else the user name
      var username = this.$store.state.currentUser.username;
      var dispname = this.$store.state.currentUser.displayname;
      var userlabel = '';

      if (dispname === undefined || dispname === '') {
        userlabel = username;
      } else {
        userlabel = dispname;
      }

      return 'User: ' + userlabel;
    },

    // Theme function
    routeName() {
      const route_name = this.$route.name;
      return this.capitalizeFirstLetter(route_name);
    }

  },

  // Health prior function
  created() {
    sciris.getUserInfo(this.$store);
  },

  // Theme function
  data() {
    return {
      activeNotifications: false
    };
  },

  methods: {
    // Health prior functions
    checkLoggedIn() {
      sciris.checkLoggedIn;
    },

    checkAdminLoggedIn() {
      sciris.checkAdminLoggedIn;
    },

    logOut() {
      sciris.logoutCall().then(response => {
        // Update the user info.
        sciris.getUserInfo(this.$store); // Clear out the active project.

        this.$store.commit('newActiveProject', {}); // Navigate to the login page automatically.

        EventBus.$emit(events.EVENT_LOGOUT_SUCCESS);
      });
    },

    // Theme functions
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },

    closeDropDown() {
      this.activeNotifications = false;
    },

    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }

  }
};

var css$6 = "\n.dropdown-icon{position:absolute;top:50%;margin-top:-8px;left:5px\n}";
styleInject(css$6);

/* script */
            const __vue_script__$7 = script$7;
/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"navbar navbar-light navbar-default"},[(_vm.logo)?_c('a',{staticClass:"navbar-brand",attrs:{"target":"_blank","href":_vm.homepage}},[_c('img',{attrs:{"height":"50px","vertical-align":"middle","src":_vm.logo}})]):_vm._e(),_vm._v(" "),(!_vm.hideRouteName)?_c('span',{staticClass:"navabar-route-name"},[_vm._v(_vm._s(_vm.routeName))]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"navbar-toggle",class:{toggled: _vm.$sidebar.showSidebar},attrs:{"type":"button"},on:{"click":_vm.toggleSidebar}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle navigation")]),_vm._v(" "),_c('span',{staticClass:"icon-bar bar1"}),_vm._v(" "),_c('span',{staticClass:"icon-bar bar2"}),_vm._v(" "),_c('span',{staticClass:"icon-bar bar3"})]),_vm._v(" "),_c('ul',{staticClass:"navbar-nav ml-auto collapse show"},_vm._l((_vm.links),function(link){return _c('li',{staticClass:"nav-item"},[_c('router-link',{staticClass:"nav-link",attrs:{"to":link.path}},[_c('span',[_vm._v(_vm._s(link.name))])])],1)})),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav ml-auto collapse show"},[_c('li',{staticClass:"nav-item nav-item-static"},[_c('div',{staticClass:"nav-link"},[_c('i',{staticClass:"ti-view-grid"}),_vm._v(" "),_c('span',[_vm._v("Project: "+_vm._s(_vm.activeProjectName))])])]),_vm._v(" "),_c('li',{staticClass:"nav-item nav-item-static"},[_c('dropdown',{attrs:{"title":_vm.activeUserName,"icon":"ti-user dropdown-icon"}},[_c('li',[_c('a',{attrs:{"href":"#/changeinfo"}},[_c('i',{staticClass:"ti-pencil"}),_vm._v("  Edit account")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/changepassword"}},[_c('i',{staticClass:"ti-key"}),_vm._v("  Change password")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/help"}},[_c('i',{staticClass:"ti-help"}),_vm._v("  Help")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/about"}},[_c('i',{staticClass:"ti-shine"}),_vm._v("  About")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){_vm.logOut();}}},[_c('i',{staticClass:"ti-car"}),_vm._v("  Log out")])])])],1)])])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Navbar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Navbar = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

const SidebarStore = {
  showSidebar: false,

  displaySidebar(value) {
    this.showSidebar = value;
  }

};
const NavigationPlugin = {
  install(Vue$$1, options) {
    Vue$$1.mixin({
      data() {
        return {
          sidebarStore: SidebarStore
        };
      }

    });
    Object.defineProperty(Vue$$1.prototype, '$sidebar', {
      get() {
        return this.$root.sidebarStore;
      }

    });
    Vue$$1.component('sidebar', Sidebar);
    Vue$$1.component('navbar', Navbar);
  }

};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$8 = {
  name: 'help',
  props: {
    reflink: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      baseURL: this.$store.state.helpLinks.baseURL,
      linkMap: this.$store.state.helpLinks.linkMap
    };
  },

  methods: {
    openLink(linkKey) {
      // Build the full link from the base URL and the specific link info.
      let fullLink = this.baseURL + this.linkMap[linkKey]; // Set the parameters for a new browser window.

      let scrh = screen.height;
      let scrw = screen.width;
      let h = scrh * 0.8; // Height of window

      let w = scrw * 0.6; // Width of window

      let t = scrh * 0.1; // Position from top of screen -- centered

      let l = scrw * 0.37; // Position from left of screen -- almost all the way right
      // Open a new browser window.        

      let newWindow = window.open(fullLink, 'Reference manual', 'width=' + w + ', height=' + h + ', top=' + t + ',left=' + l); // If the main browser window is in focus, cause the new window to come into focus.

      if (window.focus) {
        newWindow.focus();
      }
    }

  }
};

var css$7 = "\n.small-button[data-v-26b3b065]{padding:4px 4px 2px 2px;margin-bottom:5px\n}\n.helplink-label[data-v-26b3b065]{display:inline-block;font-size:1.4em;margin:0 5px 10px 0\n}";
styleInject(css$7);

/* script */
            const __vue_script__$8 = script$8;
/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[(_vm.label!=='')?_c('div',{staticClass:"helplink-label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn __blue small-button",attrs:{"data-tooltip":"Help"},on:{"click":function($event){_vm.openLink(_vm.reflink);}}},[_c('i',{staticClass:"ti-help"})])])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = "data-v-26b3b065";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "HelpLink.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var HelpLink = __vue_normalize__$8(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

var CalibrationMixin = {
  data() {
    return {
      // Parameter and program set information
      activeParset: -1,
      activeProgset: -1,
      parsetOptions: [],
      progsetOptions: [],
      // Plotting data
      showPlotControls: false,
      hasGraphs: false,
      table: null,
      // Not actually used on this page
      startYear: 0,
      endYear: 2018,
      // TEMP FOR DEMO
      activePop: "All",
      popOptions: [],
      plotOptions: [],
      yearOptions: [],
      serverDatastoreId: '',
      openDialogs: [],
      showGraphDivs: [],
      // These don't actually do anything, but they're here for future use
      showLegendDivs: [],
      mousex: -1,
      mousey: -1,
      figscale: 1.0,
      // Page-specific data
      parlist: [],
      poplabels: [],
      origParsetName: [],
      showParameters: false,
      calibTime: '30 seconds',
      calibTimes: ['30 seconds', 'Unlimited'],
      filterPlaceholder: 'Type here to filter parameters',
      // Placeholder text for second table filter box
      filterText: '' // Text in the first table filter box

    };
  },

  computed: {
    projectID() {
      return sciris.projectID(this);
    },

    hasData() {
      return sciris.hasData(this);
    },

    hasPrograms() {
      return sciris.hasPrograms(this);
    },

    simStart() {
      return sciris.simStart(this);
    },

    simEnd() {
      return sciris.simEnd(this);
    },

    simYears() {
      return sciris.simYears(this);
    },

    activePops() {
      return sciris.activePops(this);
    },

    placeholders() {
      return sciris.placeholders(this, 1);
    },

    filteredParlist() {
      return this.applyParametersFilter(this.parlist);
    }

  },

  created() {
    sciris.addListener(this);
    sciris.createDialogs(this);

    if (this.$store.state.activeProject.project !== undefined && this.$store.state.activeProject.project.hasData) {
      console.log('created() called');
      this.startYear = this.simStart;
      this.endYear = this.simEnd; // CK: Uncomment to set the end year to 2035 instead of 2018

      this.popOptions = this.activePops;
      this.serverDatastoreId = this.$store.state.activeProject.project.id + ':calibration';
      this.getPlotOptions(this.$store.state.activeProject.project.id).then(response => {
        this.updateSets().then(response2 => {
          this.loadParTable().then(response3 => {
            this.reloadGraphs(false);
          });
        });
      });
    }
  },

  watch: {//      activeParset() {
    //        this.loadParTable()
    //      }
  },
  methods: {
    validateYears() {
      return sciris.validateYears(this);
    },

    updateSets() {
      return sciris.updateSets(this);
    },

    exportGraphs() {
      return sciris.exportGraphs(this);
    },

    exportResults(datastoreID) {
      return sciris.exportResults(this, datastoreID);
    },

    scaleFigs(frac) {
      return sciris.scaleFigs(this, frac);
    },

    clearGraphs() {
      return sciris.clearGraphs(this);
    },

    togglePlotControls() {
      return sciris.togglePlotControls(this);
    },

    getPlotOptions(project_id) {
      return sciris.getPlotOptions(this, project_id);
    },

    makeGraphs(graphdata) {
      return sciris.makeGraphs(this, graphdata, '/calibration');
    },

    reloadGraphs(showErr) {
      // Set to calibration=true
      return sciris.reloadGraphs(this, this.projectID, this.serverDatastoreId, showErr, true);
    },

    maximize(legend_id) {
      return sciris.maximize(this, legend_id);
    },

    minimize(legend_id) {
      return sciris.minimize(this, legend_id);
    },

    toggleParams() {
      this.showParameters = !this.showParameters;
    },

    loadParTable() {
      return new Promise((resolve, reject) => {
        console.log('loadParTable() called for ' + this.activeParset); // TODO: Get spinners working right for this leg of initialization.

        sciris.rpc('get_y_factors', [this.projectID, this.activeParset, this.toolName()]).then(response => {
          this.parlist = response.data.parlist; // Get the parameter values

          var tmpParset = _.cloneDeep(this.activeParset);

          this.activeParset = null;
          sciris.sleep(500).then(response => {
            this.activeParset = tmpParset;
          });
          this.parlist.push('Update Vue DOM');
          this.parlist.pop();
          this.poplabels = response.data.poplabels;
          console.log(response);
          console.log(this.poplabels);
          console.log(this.parlist);
          resolve(response);
        }).catch(error => {
          sciris.fail(this, 'Could not load parameters', error);
          reject(error);
        });
      });
    },

    saveParTable() {
      return new Promise((resolve, reject) => {
        sciris.rpc('set_y_factors', [this.projectID, this.activeParset, this.parlist, this.toolName()]).then(response => {
          this.loadParTable().then(response2 => {
            sciris.succeed(this, 'Parameters updated');
            this.manualCalibration(this.projectID);
            resolve(response2);
          });
          resolve(response);
        }).catch(error => {
          sciris.fail(this, 'Could not save parameters', error);
          reject(error);
        });
      });
    },

    applyParametersFilter(parlist) {
      return parlist.filter(par => par.parcategory.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 || par.parlabel.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1);
    },

    renameParsetModal() {
      console.log('renameParsetModal() called');
      this.origParsetName = this.activeParset; // Store this before it gets overwritten

      this.$modal.show('rename-parset');
    },

    renameParset() {
      console.log('renameParset() called for ' + this.activeParset);
      this.$modal.hide('rename-parset');
      sciris.start(this);
      sciris.rpc('rename_parset', [this.projectID, this.origParsetName, this.activeParset]) // Have the server copy the project, giving it a new name.
      .then(response => {
        this.updateSets(); // Update the project summaries so the copied program shows up on the list.
        // TODO: look into whether the above line is necessary

        sciris.succeed(this, 'Parameter set "' + this.activeParset + '" renamed'); // Indicate success.
      }).catch(error => {
        sciris.fail(this, 'Could not rename parameter set', error);
      });
    },

    copyParset() {
      console.log('copyParset() called for ' + this.activeParset);
      sciris.start(this);
      sciris.rpc('copy_parset', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
      .then(response => {
        this.updateSets(); // Update the project summaries so the copied program shows up on the list.
        // TODO: look into whether the above line is necessary

        this.activeParset = response.data;
        sciris.succeed(this, 'Parameter set "' + this.activeParset + '" copied'); // Indicate success.
      }).catch(error => {
        sciris.fail(this, 'Could not copy parameter set', error);
      });
    },

    deleteParset() {
      console.log('deleteParset() called for ' + this.activeParset);
      sciris.start(this);
      sciris.rpc('delete_parset', [this.projectID, this.activeParset]) // Have the server delete the parset.
      .then(response => {
        this.updateSets() // Update the project summaries so the deleted parset shows up on the list.
        .then(response2 => {
          this.loadParTable(); // Reload the parameters.

          sciris.succeed(this, 'Parameter set "' + this.activeParset + '" deleted'); // Indicate success.
        });
      }).catch(error => {
        sciris.fail(this, 'Cannot delete last parameter set: ensure there are at least 2 parameter sets before deleting one', error);
      });
    },

    downloadParset() {
      console.log('downloadParset() called for ' + this.activeParset);
      sciris.start(this);
      sciris.download('download_parset', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
      .then(response => {
        // Indicate success.
        sciris.succeed(this, ''); // No green popup message.
      }).catch(error => {
        sciris.fail(this, 'Could not download parameter set', error);
      });
    },

    uploadParset() {
      console.log('uploadParset() called');
      sciris.upload('upload_parset', [this.projectID], {}, '.par') // Have the server copy the project, giving it a new name.
      .then(response => {
        sciris.start(this);
        this.updateSets() // Update the project summaries so the copied program shows up on the list.
        .then(response2 => {
          this.activeParset = response.data;
          this.loadParTable(); // Reload the parameters.

          sciris.succeed(this, 'Parameter set "' + this.activeParset + '" uploaded'); // Indicate success.
        });
      }).catch(error => {
        sciris.fail(this, 'Could not upload parameter set', error);
      });
    },

    manualCalibration(project_id) {
      console.log('manualCalibration() called');
      this.validateYears(); // Make sure the start end years are in the right range.

      sciris.start(this);
      sciris.rpc('manual_calibration', [project_id, this.serverDatastoreId], {
        'parsetname': this.activeParset,
        'plot_options': this.plotOptions,
        'plotyear': this.endYear,
        'pops': this.activePop,
        'tool': this.toolName(),
        'cascade': null
      }) // Go to the server to get the results
      .then(response => {
        this.makeGraphs(response.data);
        this.table = response.data.table;
        sciris.succeed(this, 'Simulation run, graphs now rendering...');
      }).catch(error => {
        console.log(error.message);
        sciris.fail(this, 'Could not run manual calibration', error);
      });
    },

    autoCalibrate(project_id) {
      console.log('autoCalibrate() called');
      this.validateYears(); // Make sure the start end years are in the right range.

      sciris.start(this);

      if (this.calibTime === '30 seconds') {
        var maxtime = 30;
      } else {
        var maxtime = 9999;
      }

      sciris.rpc('automatic_calibration', [project_id, this.serverDatastoreId], {
        'parsetname': this.activeParset,
        'max_time': maxtime,
        'plot_options': this.plotOptions,
        'plotyear': this.endYear,
        'pops': this.activePop,
        'tool': this.toolName(),
        'cascade': null
      }) // Go to the server to get the results from the package set.
      .then(response => {
        this.table = response.data.table;
        this.makeGraphs(response.data.graphs);
        sciris.succeed(this, 'Simulation run, graphs now rendering...');
      }).catch(error => {
        console.log(error.message);
        sciris.fail(this, 'Could not run automatic calibration', error);
      });
    },

    reconcile() {
      console.log('reconcile() called for ' + this.activeParset);
      sciris.start(this);
      sciris.download('reconcile', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
      .then(response => {
        // Indicate success.
        sciris.succeed(this, ''); // No green popup message.
      }).catch(error => {
        sciris.fail(this, 'Could not reconcile program set', error);
      });
    }

  }
};

var HelpMixin = {
  data() {
    return {
      username: '',
      useragent: '',
      version: '',
      date: '',
      gitbranch: '',
      githash: '',
      server: '',
      cpu: '',
      timestamp: '',
      adv_showConsole: false,
      adv_authentication: '',
      adv_query: '',
      adv_response: 'No response'
    };
  },

  computed: {
    getVersionInfo() {
      sciris.rpc('get_version_info').then(response => {
        this.username = this.$store.state.currentUser.username;
        this.useragent = window.navigator.userAgent;
        this.timestamp = Date(Date.now()).toLocaleString();
        this.version = response.data['version'];
        this.date = response.data['date'];
        this.gitbranch = response.data['gitbranch'];
        this.githash = response.data['githash'];
        this.server = response.data['server'];
        this.cpu = response.data['cpu'];
      });
    }

  },
  methods: {
    adv_consoleModal() {
      if (!this.adv_showConsole) {
        var obj = {
          // Alert object data
          message: 'WARNING: This option is for authorized developers only. Unless you have received prior written authorization to use this feature, exit now. If you click "Yes", your details will be logged, and any misuse will result in immediate account suspension.',
          useConfirmBtn: true,
          customConfirmBtnText: 'Yes, I will take the risk',
          customCloseBtnText: 'Oops, get me out of here',
          customConfirmBtnClass: 'btn __red',
          customCloseBtnClass: 'btn',
          onConfirm: this.adv_toggleConsole
        };
        this.$Simplert.open(obj);
      } else {
        this.adv_showConsole = false;
      }
    },

    adv_toggleConsole() {
      this.adv_showConsole = !this.adv_showConsole;
    },

    adv_submit() {
      console.log('adv_submit() called');
      sciris.rpc('run_query', [this.adv_authentication, this.adv_query]) // Have the server copy the project, giving it a new name.
      .then(response => {
        console.log(response.data);
        this.adv_response = response.data.replace(/\n/g, '<br>');
        sciris.succeed(this, 'Query run'); // Indicate success.
      }).catch(error => {
        sciris.fail(this, 'Could not run query', error);
      });
    }

  }
};

var ScenarioMixin = {
  data() {
    return {
      // Parameter and program set information
      activeParset: -1,
      activeProgset: -1,
      parsetOptions: [],
      progsetOptions: [],
      // Plotting data
      showPlotControls: false,
      hasGraphs: false,
      table: null,
      startYear: 0,
      endYear: 2018,
      // TEMP FOR DEMO
      activePop: "All",
      popOptions: [],
      plotOptions: [],
      yearOptions: [],
      serverDatastoreId: '',
      openDialogs: [],
      showGraphDivs: [],
      // These don't actually do anything, but they're here for future use
      showLegendDivs: [],
      mousex: -1,
      mousey: -1,
      figscale: 1.0,
      // Page-specific data
      scenSummaries: [],
      defaultBudgetScen: {},
      scenariosLoaded: false,
      addEditModal: {
        scenSummary: {},
        origName: '',
        mode: 'add'
      }
    };
  },

  computed: {
    projectID() {
      return sciris.projectID(this);
    },

    hasData() {
      return sciris.hasData(this);
    },

    hasPrograms() {
      return sciris.hasPrograms(this);
    },

    simStart() {
      return sciris.dataEnd(this);
    },

    simEnd() {
      return sciris.simEnd(this);
    },

    projectionYears() {
      return sciris.projectionYears(this);
    },

    activePops() {
      return sciris.activePops(this);
    },

    placeholders() {
      return sciris.placeholders(this, 1);
    }

  },

  created() {
    sciris.addListener(this);
    sciris.createDialogs(this);

    if (this.$store.state.activeProject.project !== undefined && this.$store.state.activeProject.project.hasData && this.$store.state.activeProject.project.hasPrograms) {
      console.log('created() called');
      this.startYear = this.simStart;
      this.endYear = this.simEnd;
      this.popOptions = this.activePops;
      this.serverDatastoreId = this.$store.state.activeProject.project.id + ':scenario';
      this.getPlotOptions(this.$store.state.activeProject.project.id).then(response => {
        this.updateSets().then(response2 => {
          // The order of execution / completion of these doesn't matter.
          this.getScenSummaries();
          this.getDefaultBudgetScen();
          this.reloadGraphs(false);
        });
      });
    }
  },

  methods: {
    validateYears() {
      return sciris.validateYears(this);
    },

    updateSets() {
      return sciris.updateSets(this);
    },

    exportGraphs() {
      return sciris.exportGraphs(this);
    },

    exportResults(datastoreID) {
      return sciris.exportResults(this, datastoreID);
    },

    scaleFigs(frac) {
      return sciris.scaleFigs(this, frac);
    },

    clearGraphs() {
      return sciris.clearGraphs(this);
    },

    togglePlotControls() {
      return sciris.togglePlotControls(this);
    },

    getPlotOptions(project_id) {
      return sciris.getPlotOptions(this, project_id);
    },

    makeGraphs(graphdata) {
      return sciris.makeGraphs(this, graphdata, '/scenarios');
    },

    reloadGraphs(showErr) {
      return sciris.reloadGraphs(this, this.projectID, this.serverDatastoreId, showErr, false, true);
    },

    // Set to calibration=false, plotbudget=true
    maximize(legend_id) {
      return sciris.maximize(this, legend_id);
    },

    minimize(legend_id) {
      return sciris.minimize(this, legend_id);
    },

    getDefaultBudgetScen() {
      console.log('getDefaultBudgetScen() called');
      sciris.rpc('get_default_budget_scen', [this.projectID]).then(response => {
        this.defaultBudgetScen = response.data; // Set the scenario to what we received.

        console.log('This is the default:');
        console.log(this.defaultBudgetScen);
      }).catch(error => {
        sciris.fail(this, 'Could not get default budget scenario', error);
      });
    },

    getScenSummaries() {
      console.log('getScenSummaries() called');
      sciris.start(this);
      sciris.rpc('get_scen_info', [this.projectID]).then(response => {
        this.scenSummaries = response.data; // Set the scenarios to what we received.

        console.log('Scenario summaries:');
        console.log(this.scenSummaries);
        this.scenariosLoaded = true;
        sciris.succeed(this, 'Scenarios loaded');
      }).catch(error => {
        sciris.fail(this, 'Could not get scenarios', error);
      });
    },

    setScenSummaries() {
      console.log('setScenSummaries() called');
      sciris.start(this);
      sciris.rpc('set_scen_info', [this.projectID, this.scenSummaries]).then(response => {
        sciris.succeed(this, 'Scenarios saved');
      }).catch(error => {
        sciris.fail(this, 'Could not save scenarios', error);
      });
    },

    addBudgetScenModal() {
      // Open a model dialog for creating a new project
      console.log('addBudgetScenModal() called');
      sciris.rpc('get_default_budget_scen', [this.projectID]).then(response => {
        this.defaultBudgetScen = response.data; // Set the scenario to what we received.

        this.addEditModal.scenSummary = _.cloneDeep(this.defaultBudgetScen);
        this.addEditModal.origName = this.addEditModal.scenSummary.name;
        this.addEditModal.mode = 'add';
        this.$modal.show('add-budget-scen');
        console.log(this.defaultBudgetScen);
      }).catch(error => {
        sciris.fail(this, 'Could not open add scenario modal', error);
      });
    },

    addBudgetScen() {
      console.log('addBudgetScen() called');
      this.$modal.hide('add-budget-scen');
      sciris.start(this);

      let newScen = _.cloneDeep(this.addEditModal.scenSummary); // Get the new scenario summary from the modal.


      let scenNames = []; // Get the list of all of the current scenario names.

      this.scenSummaries.forEach(scenSum => {
        scenNames.push(scenSum.name);
      });

      if (this.addEditModal.mode == 'edit') {
        // If we are editing an existing scenario...
        let index = scenNames.indexOf(this.addEditModal.origName); // Get the index of the original (pre-edited) name

        if (index > -1) {
          this.scenSummaries[index].name = newScen.name; // hack to make sure Vue table updated

          this.scenSummaries[index] = newScen;
        } else {
          console.log('Error: a mismatch in editing keys');
        }
      } else {
        // Else (we are adding a new scenario)...
        newScen.name = sciris.getUniqueName(newScen.name, scenNames);
        this.scenSummaries.push(newScen);
      }

      console.log(newScen);
      console.log(this.scenSummaries);
      sciris.rpc('set_scen_info', [this.projectID, this.scenSummaries]).then(response => {
        sciris.succeed(this, 'Scenario added');
      }).catch(error => {
        sciris.fail(this, 'Could not add scenario', error);
      });
    },

    editScen(scenSummary) {
      // Open a model dialog for creating a new project
      console.log('editScen() called');
      this.defaultBudgetScen = scenSummary;
      console.log('defaultBudgetScen');
      console.log(this.defaultBudgetScen);
      this.addEditModal.scenSummary = _.cloneDeep(this.defaultBudgetScen);
      this.addEditModal.origName = this.addEditModal.scenSummary.name;
      this.addEditModal.mode = 'edit';
      this.$modal.show('add-budget-scen');
    },

    copyScen(scenSummary) {
      console.log('copyScen() called');
      sciris.start(this);

      var newScen = _.cloneDeep(scenSummary);

      var otherNames = [];
      this.scenSummaries.forEach(scenSum => {
        otherNames.push(scenSum.name);
      });
      newScen.name = sciris.getUniqueName(newScen.name, otherNames);
      this.scenSummaries.push(newScen);
      sciris.rpc('set_scen_info', [this.projectID, this.scenSummaries]).then(response => {
        sciris.succeed(this, 'Scenario copied');
      }).catch(error => {
        sciris.fail(this, 'Could not copy scenario', error);
      });
    },

    deleteScen(scenSummary) {
      console.log('deleteScen() called');
      sciris.start(this);

      for (var i = 0; i < this.scenSummaries.length; i++) {
        if (this.scenSummaries[i].name === scenSummary.name) {
          this.scenSummaries.splice(i, 1);
        }
      }

      sciris.rpc('set_scen_info', [this.projectID, this.scenSummaries]).then(response => {
        sciris.succeed(this, 'Scenario deleted');
      }).catch(error => {
        sciris.fail(this, 'Could not delete scenario', error);
      });
    },

    runScens() {
      console.log('runScens() called');
      this.validateYears(); // Make sure the start end years are in the right range.

      sciris.start(this);
      sciris.rpc('set_scen_info', [this.projectID, this.scenSummaries]) // Make sure they're saved first
      .then(response => {
        // Go to the server to get the results from the package set.
        sciris.rpc('run_scenarios', [this.projectID, this.serverDatastoreId, this.plotOptions], {
          saveresults: false,
          tool: this.toolName(),
          plotyear: this.endYear,
          pops: this.activePop
        }).then(response => {
          this.table = response.data.table;
          this.makeGraphs(response.data);
          sciris.succeed(this, ''); // Success message in graphs function
        }).catch(error => {
          sciris.fail(this, 'Could not run scenarios', error);
        });
      }).catch(error => {
        sciris.fail(this, 'Could not set scenarios', error);
      });
    }

  }
};

var ProjectMixin = {
  data() {
    return {
      filterPlaceholder: 'Type here to filter projects',
      // Placeholder text for table filter box
      filterText: '',
      // Text in the table filter box
      allSelected: false,
      // Are all of the projects selected?
      projectToRename: null,
      // What project is being renamed?
      sortColumn: 'name',
      // Column of table used for sorting the projects: name, country, creationTime, updatedTime, dataUploadTime
      sortReverse: false,
      // Sort in reverse order?
      projectSummaries: [],
      // List of summary objects for projects the user has
      proj_name: 'New project',
      // For creating a new project: number of populations
      num_pops: 5,
      // For creating a new project: number of populations
      num_progs: 5,
      // For creating a new project: number of populations
      activeuid: [],
      // WARNING, kludgy to get create progbook working
      frameworkSummaries: [],
      currentFramework: '',
      demoOptions: [],
      demoOption: '',
      defaultPrograms: [],
      progStartYear: [],
      progEndYear: []
    };
  },

  computed: {
    projectID() {
      return sciris.projectID(this);
    },

    userName() {
      return this.$store.state.currentUser.username;
    },

    simYears() {
      return sciris.simYears(this);
    },

    sortedFilteredProjectSummaries() {
      return this.applyNameFilter(this.applySorting(this.projectSummaries));
    }

  },
  methods: {
    updateSorting() {
      return sciris.updateSorting(this);
    },

    projectLoaded(uid) {
      console.log('projectLoaded called');

      if (this.$store.state.activeProject.project !== undefined) {
        if (this.$store.state.activeProject.project.id === uid) {
          console.log('Project ' + uid + ' is loaded');
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    getDemoOptions() {
      console.log('getDemoOptions() called');
      sciris.rpc('get_demo_project_options') // Get the current user's framework summaries from the server.
      .then(response => {
        this.demoOptions = response.data; // Set the frameworks to what we received.

        this.demoOption = this.demoOptions[0];
        console.log('Loaded demo options:');
        console.log(this.demoOptions);
        console.log(this.demoOption);
      }).catch(error => {
        sciris.fail(this, 'Could not load demo project options', error);
      });
    },

    getDefaultPrograms() {
      console.log('getDefaultPrograms() called');
      sciris.rpc('get_default_programs') // Get the current user's framework summaries from the server.
      .then(response => {
        this.defaultPrograms = response.data; // Set the frameworks to what we received.

        console.log('Loaded default programs:');
        console.log(this.defaultPrograms);
      }).catch(error => {
        sciris.fail(this, 'Could not load default programs', error);
      });
    },

    updateFrameworkSummaries() {
      console.log('updateFrameworkSummaries() called'); // Get the current user's framework summaries from the server.

      sciris.rpc('jsonify_frameworks', [this.userName]).then(response => {
        // Set the frameworks to what we received.
        this.frameworkSummaries = response.data.frameworks;

        if (this.frameworkSummaries.length) {
          console.log('Framework summaries found');
          console.log(this.frameworkSummaries);
          this.currentFramework = this.frameworkSummaries[0].framework.name;
          console.log('Current framework: ' + this.currentFramework);
        } else {
          console.log('No framework summaries found');
        }
      }).catch(error => {
        sciris.fail(this, 'Could not load frameworks', error);
      });
    },

    updateProjectSummaries(setActiveID) {
      console.log('updateProjectSummaries() called');
      sciris.start(this);
      sciris.rpc('jsonify_projects', [this.userName]) // Get the current user's project summaries from the server.
      .then(response => {
        let lastCreationTime = null;
        let lastCreatedID = null;
        this.projectSummaries = response.data.projects; // Set the projects to what we received.

        if (this.projectSummaries.length > 0) {
          // Initialize the last creation time stuff if we have a non-empty list.
          lastCreationTime = new Date(this.projectSummaries[0].project.creationTime);
          lastCreatedID = this.projectSummaries[0].project.id;
        }

        this.projectToRename = null; // Unset the link to a project being renamed.

        this.projectSummaries.forEach(theProj => {
          // Preprocess all projects.
          theProj.selected = false; // Set to not selected.

          theProj.renaming = ''; // Set to not being renamed.

          if (theProj.project.creationTime >= lastCreationTime) {
            // Update the last creation time and ID if what se see is later.
            lastCreationTime = theProj.project.creationTime;
            lastCreatedID = theProj.project.id;
          }
        });

        if (this.projectSummaries.length > 0) {
          // If we have a project on the list...
          if (setActiveID === null) {
            // If no ID is passed in, set the active project to the last-created project.
            this.openProject(lastCreatedID);
          } else {
            // Otherwise, set the active project to the one passed in.
            this.openProject(setActiveID);
          }
        }

        sciris.succeed(this, ''); // No green popup.
      }).catch(error => {
        sciris.fail(this, 'Could not load projects', error);
      });
    },

    addDemoProject() {
      console.log('addDemoProject() called');
      this.$modal.hide('demo-project');
      sciris.start(this);
      var demoOption = 'default'; // Have the server create a new project.

      sciris.rpc('add_demo_project', [this.userName, demoOption, this.toolName()]).then(response => {
        // Update the project summaries so the new project shows up on the list.
        this.updateProjectSummaries(response.data.projectID); // Already have notification from project

        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not add demo project', error);
      });
    },

    addDemoProjectModal() {
      // Open a model dialog for creating a new project
      console.log('addDemoProjectModal() called');
      this.$modal.show('demo-project');
    },

    createNewProjectModal() {
      console.log('createNewProjectModal() called');
      this.$modal.show('create-project');
    },

    // Open a model dialog for creating a progbook
    createProgbookModal(uid) {
      this.activeuid = uid; // Find the project that matches the UID passed in.

      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid);
      console.log('createProgbookModal() called for ' + matchProject.project.name);
      this.$modal.show('create-progbook');
    },

    createNewProject() {
      console.log('createNewProject() called');
      this.$modal.hide('create-project');
      sciris.start(this);
      var frameworkID = this.getFrameworkID();
      sciris.download('create_new_project', // Have the server create a new project.
      [this.userName, frameworkID, this.proj_name, this.num_pops, this.num_progs, this.data_start, this.data_end], {
        tool: this.toolName()
      }).then(response => {
        // Update the project summaries so the new project shows up on the list. 
        // Note: There's no easy way to get the new project UID to tell the 
        // project update to choose the new project because the RPC cannot pass it back.
        this.updateProjectSummaries(null);
        sciris.succeed(this, 'New project "' + this.proj_name + '" created');
      }).catch(error => {
        sciris.fail(this, 'Could not add new project:' + error.message);
      });
    },

    uploadProjectFromFile() {
      console.log('uploadProjectFromFile() called');
      sciris.upload('upload_project', [this.userName], {}, '.prj') // Have the server upload the project.
      .then(response => {
        // This line needs to be here to avoid the spinner being up during the user modal.
        sciris.start(this); // Update the project summaries so the new project shows up on the list.

        this.updateProjectSummaries(response.data.projectID);
        sciris.succeed(this, 'New project uploaded');
      }).catch(error => {
        sciris.fail(this, 'Could not upload file', error);
      });
    },

    projectIsActive(uid) {
      // If the project is undefined, it is not active.
      if (this.$store.state.activeProject.project === undefined) {
        return false;
      } else {
        // Otherwise, the project is active if the UIDs match.
        return this.$store.state.activeProject.project.id === uid;
      }
    },

    selectAll() {
      console.log('selectAll() called'); // For each of the projects, set the selection of the project to the
      // _opposite_ of the state of the all-select checkbox's state.
      // NOTE: This function depends on it getting called before the
      // v-model state is updated.  If there are some cases of Vue
      // implementation where these happen in the opposite order, then
      // this will not give the desired result.

      this.projectSummaries.forEach(theProject => theProject.selected = !this.allSelected);
    },

    uncheckSelectAll() {
      this.allSelected = false;
    },

    applyNameFilter(projects) {
      return projects.filter(theProject => theProject.project.name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1);
    },

    applySorting(projects) {
      return projects.slice(0).sort((proj1, proj2) => {
        let sortDir = this.sortReverse ? -1 : 1;

        if (this.sortColumn === 'name') {
          return proj1.project.name.toLowerCase() > proj2.project.name.toLowerCase() ? sortDir : -sortDir;
        } else if (this.sortColumn === 'creationTime') {
          return proj1.project.creationTime > proj2.project.creationTime ? sortDir : -sortDir;
        } else if (this.sortColumn === 'updatedTime') {
          return proj1.project.updatedTime > proj2.project.updatedTime ? sortDir : -sortDir;
        }
      });
    },

    openProject(uid) {
      // Find the project that matches the UID passed in.
      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid);
      console.log('openProject() called for ' + matchProject.project.name);
      this.$store.commit('newActiveProject', matchProject); // Set the active project to the matched project.

      sciris.succeed(this, 'Project "' + matchProject.project.name + '" loaded'); // Success popup.
    },

    copyProject(uid) {
      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid); // Find the project that matches the UID passed in.

      console.log('copyProject() called for ' + matchProject.project.name);
      sciris.start(this);
      sciris.rpc('copy_project', [uid]) // Have the server copy the project, giving it a new name.
      .then(response => {
        // Update the project summaries so the copied program shows up on the list.
        this.updateProjectSummaries(response.data.projectID); // Indicate success.

        sciris.succeed(this, 'Project "' + matchProject.project.name + '" copied');
      }).catch(error => {
        sciris.fail(this, 'Could not copy project', error);
      });
    },

    finishRename(event) {
      // Grab the element of the open textbox for the project name to be renamed.
      let renameboxElem = document.querySelector('.renamebox'); // If the click is outside the textbox, rename the remembered project.

      if (!renameboxElem.contains(event.target)) {
        this.renameProject(this.projectToRename);
      }
    },

    renameProject(projectSummary) {
      console.log('renameProject() called for ' + projectSummary.project.name);

      if (projectSummary.renaming === '') {
        // If the project is not in a mode to be renamed, make it so.
        projectSummary.renaming = projectSummary.project.name; // Add a click listener to run the rename when outside the input box is click, and remember
        // which project needs to be renamed.

        window.addEventListener('click', this.finishRename);
        this.projectToRename = projectSummary;
      } else {
        // Otherwise (it is to be renamed)...
        // Remove the listener for reading the clicks outside the input box, and null out the project
        // to be renamed.
        window.removeEventListener('click', this.finishRename);
        this.projectToRename = null; // Make a deep copy of the projectSummary object by 
        // JSON-stringifying the old object, and then parsing 
        // the result back into a new object.

        let newProjectSummary = _.cloneDeep(projectSummary); // Rename the project name in the client list from what's in the textbox.


        newProjectSummary.project.name = projectSummary.renaming;
        sciris.start(this); // Have the server change the name of the project by passing in the new copy of the summary.

        sciris.rpc('rename_project', [newProjectSummary]).then(response => {
          // Update the project summaries so the rename shows up on the list.
          this.updateProjectSummaries(newProjectSummary.project.id); // Turn off the renaming mode.

          projectSummary.renaming = '';
          sciris.succeed(this, '');
        }).catch(error => {
          sciris.fail(this, 'Could not rename project', error);
        });
      } // This silly hack is done to make sure that the Vue component gets updated by this function call.
      // Something about resetting the project name informs the Vue component it needs to
      // update, whereas the renaming attribute fails to update it.
      // We should find a better way to do this.


      let theName = projectSummary.project.name;
      projectSummary.project.name = 'newname';
      projectSummary.project.name = theName;
    },

    downloadProjectFile(uid) {
      // Find the project that matches the UID passed in.
      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid);
      console.log('downloadProjectFile() called for ' + matchProject.project.name);
      sciris.start(this); // Make the server call to download the project to a .prj file.

      sciris.download('download_project', [uid]).then(response => {
        // Indicate success.
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not download project', error);
      });
    },

    downloadFramework(uid) {
      // Find the project that matches the UID passed in.
      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid);
      console.log('downloadFramework() called for ' + matchProject.project.name);
      sciris.start(this, 'Downloading framework...');
      sciris.download('download_framework_from_project', [uid]).then(response => {
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not download framework', error);
      });
    },

    downloadDatabook(uid) {
      console.log('downloadDatabook() called');
      sciris.start(this, 'Downloading data book...');
      sciris.download('download_databook', [uid]).then(response => {
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not download databook', error);
      });
    },

    downloadProgbook(uid) {
      // Find the project that matches the UID passed in.
      let matchProject = this.projectSummaries.find(theProj => theProj.project.id === uid);
      console.log('downloadProgbook() called for ' + matchProject.project.name);
      sciris.start(this, 'Downloading program book...');
      sciris.download('download_progbook', [uid]).then(response => {
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not download program book', error);
      });
    },

    createProgbook() {
      // Find the project that matches the UID passed in.
      let uid = this.activeuid;
      console.log('createProgbook() called');
      this.$modal.hide('create-progbook');
      sciris.start(this, 'Creating program book...');
      sciris.download('create_progbook', [uid, this.num_progs, this.progStartYear, this.progEndYear]).then(response => {
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not create program book', error);
      });
    },

    createDefaultProgbook() {
      // Find the project that matches the UID passed in.
      let uid = this.activeuid;
      console.log('createDefaultProgbook() called');
      this.$modal.hide('create-progbook');
      sciris.start(this, 'Creating default program book...');
      sciris.download('create_default_progbook', [uid, this.progStartYear, this.progEndYear, this.defaultPrograms]) // TODO: set years
      .then(response => {
        sciris.succeed(this, '');
      }).catch(error => {
        sciris.fail(this, 'Could not create program book', error);
      });
    },

    uploadDatabook(uid) {
      console.log('uploadDatabook() called');
      sciris.upload('upload_databook', [uid], {}, '.xlsx').then(response => {
        sciris.start(this, 'Uploading databook...'); // Update the project summaries so the copied program shows up on the list.

        this.updateProjectSummaries(uid);
        sciris.succeed(this, 'Data uploaded');
      }).catch(error => {
        sciris.fail(this, 'Could not upload databook', error);
      });
    },

    uploadProgbook(uid) {
      // Find the project that matches the UID passed in.
      console.log('uploadProgbook() called');
      sciris.upload('upload_progbook', [uid], {}, '.xlsx').then(response => {
        sciris.start(this); // Update the project summaries so the copied program shows up on the list.

        this.updateProjectSummaries(uid);
        sciris.succeed(this, 'Programs uploaded'); // Indicate success.
      }).catch(error => {
        sciris.fail(this, 'Could not upload program book', error);
      });
    },

    // Confirmation alert
    deleteModal() {
      // Pull out the names of the projects that are selected.
      let selectProjectsUIDs = this.projectSummaries.filter(theProj => theProj.selected).map(theProj => theProj.project.id);

      if (selectProjectsUIDs.length > 0) {
        // Only if something is selected...
        var obj = {
          // Alert object data
          message: 'Are you sure you want to delete the selected projects?',
          useConfirmBtn: true,
          customConfirmBtnClass: 'btn __red',
          customCloseBtnClass: 'btn',
          onConfirm: this.deleteSelectedProjects
        };
        this.$Simplert.open(obj);
      }
    },

    deleteSelectedProjects() {
      // Pull out the names of the projects that are selected.
      let selectProjectsUIDs = this.projectSummaries.filter(theProj => theProj.selected).map(theProj => theProj.project.id);
      console.log('deleteSelectedProjects() called for ', selectProjectsUIDs); // Have the server delete the selected projects.

      if (selectProjectsUIDs.length > 0) {
        sciris.start(this);
        sciris.rpc('delete_projects', [selectProjectsUIDs, this.userName]).then(response => {
          // Get the active project ID.
          let activeProjectId = this.$store.state.activeProject.project.id;

          if (activeProjectId === undefined) {
            activeProjectId = null;
          } // If the active project ID is one of the ones deleted...


          if (selectProjectsUIDs.find(theId => theId === activeProjectId)) {
            // Set the active project to an empty project.
            this.$store.commit('newActiveProject', {}); // Null out the project.

            activeProjectId = null;
          } // Update the project summaries so the deletions show up on the list.
          // Make sure it tries to set the project that was active (if any).


          this.updateProjectSummaries(activeProjectId);
          sciris.succeed(this, '');
        }).catch(error => {
          sciris.fail(this, 'Could not delete project/s', error);
        });
      }
    },

    downloadSelectedProjects() {
      // Pull out the names of the projects that are selected.
      let selectProjectsUIDs = this.projectSummaries.filter(theProj => theProj.selected).map(theProj => theProj.project.id);
      console.log('downloadSelectedProjects() called for ', selectProjectsUIDs); // Have the server download the selected projects.

      if (selectProjectsUIDs.length > 0) {
        sciris.start(this);
        sciris.download('download_projects', [selectProjectsUIDs, this.userName]).then(response => {
          sciris.succeed(this, '');
        }).catch(error => {
          sciris.fail(this, 'Could not download project/s', error);
        });
      }
    }

  }
};

var OptimizationMixin = {
  data() {
    return {
      // Parameter and program set information
      activeParset: -1,
      activeProgset: -1,
      parsetOptions: [],
      progsetOptions: [],
      // Plotting data
      showPlotControls: false,
      hasGraphs: false,
      table: null,
      startYear: 0,
      endYear: 2018,
      // TEMP FOR DEMO
      activePop: "All",
      popOptions: [],
      plotOptions: [],
      yearOptions: [],
      serverDatastoreId: '',
      openDialogs: [],
      showGraphDivs: [],
      // These don't actually do anything, but they're here for future use
      showLegendDivs: [],
      mousex: -1,
      mousey: -1,
      figscale: 1.0,
      // Page-specific data
      optimSummaries: [],
      optimsLoaded: false,
      pollingTasks: false,
      defaultOptim: {},
      modalOptim: {},
      objectiveOptions: [],
      displayResultName: '',
      displayResultDatastoreId: '',
      addEditDialogMode: 'add',
      // or 'edit'
      addEditDialogOldName: ''
    };
  },

  computed: {
    projectID() {
      return sciris.projectID(this);
    },

    hasData() {
      return sciris.hasData(this);
    },

    hasPrograms() {
      return sciris.hasPrograms(this);
    },

    simStart() {
      return sciris.simStart(this);
    },

    simEnd() {
      return sciris.simEnd(this);
    },

    projectionYears() {
      return sciris.projectionYears(this);
    },

    activePops() {
      return sciris.activePops(this);
    },

    placeholders() {
      return sciris.placeholders(this, 1);
    }

  },

  created() {
    sciris.addListener(this);
    sciris.createDialogs(this);

    if (this.$store.state.activeProject.project !== undefined && this.$store.state.activeProject.project.hasData && this.$store.state.activeProject.project.hasPrograms) {
      console.log('created() called');
      this.startYear = this.simStart;
      this.endYear = this.simEnd;
      this.popOptions = this.activePops;
      this.getPlotOptions(this.$store.state.activeProject.project.id).then(response => {
        this.updateSets().then(response2 => {
          this.getOptimSummaries();
        });
      });
    }
  },

  methods: {
    validateYears() {
      return sciris.validateYears(this);
    },

    updateSets() {
      return sciris.updateSets(this);
    },

    exportGraphs() {
      return sciris.exportGraphs(this);
    },

    exportResults(datastoreID) {
      return sciris.exportResults(this, datastoreID);
    },

    scaleFigs(frac) {
      return sciris.scaleFigs(this, frac);
    },

    clearGraphs() {
      return sciris.clearGraphs(this);
    },

    togglePlotControls() {
      return sciris.togglePlotControls(this);
    },

    getPlotOptions(project_id) {
      return sciris.getPlotOptions(this, project_id);
    },

    makeGraphs(graphdata) {
      return sciris.makeGraphs(this, graphdata, '/optimizations');
    },

    reloadGraphs(cache_id, showErr) {
      return sciris.reloadGraphs(this, this.projectID, cache_id, showErr, false, true);
    },

    // Set to calibration=false, plotbudget=True
    maximize(legend_id) {
      return sciris.maximize(this, legend_id);
    },

    minimize(legend_id) {
      return sciris.minimize(this, legend_id);
    },

    statusFormatStr(optimSummary) {
      if (optimSummary.status === 'not started') {
        return '';
      } else if (optimSummary.status === 'queued') {
        return 'Initializing... ';
      } // + this.timeFormatStr(optimSummary.pendingTime)
      else if (optimSummary.status === 'started') {
          return 'Running for ';
        } // + this.timeFormatStr(optimSummary.executionTime)
        else if (optimSummary.status === 'completed') {
            return 'Completed after ';
          } // + this.timeFormatStr(optimSummary.executionTime)
          else if (optimSummary.status === 'error') {
              return 'Error after ';
            } // + this.timeFormatStr(optimSummary.executionTime)
            else {
                return '';
              }
    },

    timeFormatStr(optimSummary) {
      let rawValue = '';
      let is_queued = optimSummary.status === 'queued';
      let is_executing = optimSummary.status === 'started' || optimSummary.status === 'completed' || optimSummary.status === 'error';

      if (is_queued) {
        rawValue = optimSummary.pendingTime;
      } else if (is_executing) {
        rawValue = optimSummary.executionTime;
      } else {
        return '';
      }

      if (rawValue === '--') {
        return '--';
      } else {
        let numSecs = Number(rawValue).toFixed();
        let numHours = Math.floor(numSecs / 3600);
        numSecs -= numHours * 3600;
        let numMins = Math.floor(numSecs / 60);
        numSecs -= numMins * 60;

        let output = _.padStart(numHours.toString(), 2, '0') + ':' + _.padStart(numMins.toString(), 2, '0') + ':' + _.padStart(numSecs.toString(), 2, '0');

        return output;
      }
    },

    canRunTask(optimSummary) {
      return optimSummary.status === 'not started';
    },

    canCancelTask(optimSummary) {
      return optimSummary.status !== 'not started';
    },

    canPlotResults(optimSummary) {
      return optimSummary.status === 'completed';
    },

    getOptimTaskState(optimSummary) {
      return new Promise((resolve, reject) => {
        console.log('getOptimTaskState() called for with: ' + optimSummary.status);
        let statusStr = '';
        sciris.rpc('check_task', [optimSummary.serverDatastoreId]) // Check the status of the task.
        .then(result => {
          statusStr = result.data.task.status;
          optimSummary.status = statusStr;
          optimSummary.pendingTime = result.data.pendingTime;
          optimSummary.executionTime = result.data.executionTime;

          if (optimSummary.status == 'error') {
            console.log('Error in task: ', optimSummary.serverDatastoreId);
            console.log(result.data.task.errorText);
          }

          resolve(result);
        }).catch(error => {
          optimSummary.status = 'not started';
          optimSummary.pendingTime = '--';
          optimSummary.executionTime = '--';
          resolve(error); // yes, resolve, not reject, because this means non-started task
        });
      });
    },

    needToPoll() {
      // Check if we're still on the Optimizations page.
      let routePath = this.$route.path === '/optimizations'; // Check if we have a queued or started task.

      let runningState = false;
      this.optimSummaries.forEach(optimSum => {
        if (optimSum.status === 'queued' || optimSum.status === 'started') {
          runningState = true;
        }
      }); // We need to poll if we are in the page and a task is going.

      return routePath && runningState;
    },

    pollAllTaskStates(checkAllTasks) {
      return new Promise((resolve, reject) => {
        console.log('Polling all tasks...'); // Clear the poll states.

        this.optimSummaries.forEach(optimSum => {
          optimSum.polled = false;
        }); // For each of the optimization summaries...

        this.optimSummaries.forEach(optimSum => {
          console.log(optimSum.serverDatastoreId, optimSum.status); // If we are to check all tasks OR there is a valid task running, check it.

          if (checkAllTasks || optimSum.status !== 'not started' && optimSum.status !== 'completed' && optimSum.status !== 'error') {
            this.getOptimTaskState(optimSum).then(response => {
              // Flag as polled.
              optimSum.polled = true; // Resolve the main promise when all of the optimSummaries are polled.

              let done = true;
              this.optimSummaries.forEach(optimSum2 => {
                if (!optimSum2.polled) {
                  done = false;
                }
              });

              if (done) {
                resolve();
              }
            });
          } // Otherwise (no task to check), we are done polling for it.
          else {
              // Flag as polled.
              optimSum.polled = true; // Resolve the main promise when all of the optimSummaries are polled.

              let done = true;
              this.optimSummaries.forEach(optimSum2 => {
                if (!optimSum2.polled) {
                  done = false;
                }
              });

              if (done) {
                resolve();
              }
            }
        });
      });
    },

    doTaskPolling(checkAllTasks) {
      // Flag that we're polling.
      this.pollingTasks = true; // Do the polling of the task states.

      this.pollAllTaskStates(checkAllTasks).then(() => {
        // Hack to get the Vue display of optimSummaries to update
        this.optimSummaries.push(this.optimSummaries[0]);
        this.optimSummaries.pop(); // Only if we need to continue polling...

        if (this.needToPoll()) {
          // Sleep waitingtime seconds.
          let waitingtime = 1;
          sciris.sleep(waitingtime * 1000).then(response => {
            this.doTaskPolling(false); // Call the next polling, in a way that doesn't check_task() for _every_ task.
          });
        } // Otherwise, flag that we're no longer polling.
        else {
            this.pollingTasks = false;
          }
      });
    },

    clearTask(optimSummary) {
      return new Promise((resolve, reject) => {
        let datastoreId = optimSummary.serverDatastoreId; // hack because this gets overwritten soon by caller

        console.log('clearTask() called for ' + this.currentOptim);
        sciris.rpc('del_result', [datastoreId, this.projectID]) // Delete cached result.
        .then(response => {
          sciris.rpc('delete_task', [datastoreId]).then(response => {
            this.getOptimTaskState(optimSummary); // Get the task state for the optimization.

            if (!this.pollingTasks) {
              this.doTaskPolling(true);
            }

            resolve(response);
          }).catch(error => {
            resolve(error); // yes, resolve because at least cache entry deletion succeeded
          });
        }).catch(error => {
          reject(error);
        });
      });
    },

    getOptimSummaries() {
      console.log('getOptimSummaries() called');
      sciris.start(this);
      sciris.rpc('get_optim_info', [this.projectID]) // Get the current project's optimization summaries from the server.
      .then(response => {
        this.optimSummaries = response.data; // Set the optimizations to what we received.

        this.optimSummaries.forEach(optimSum => {
          // For each of the optimization summaries...
          optimSum.serverDatastoreId = this.$store.state.activeProject.project.id + ':opt-' + optimSum.name; // Build a task and results cache ID from the project's hex UID and the optimization name.

          optimSum.status = 'not started'; // Set the status to 'not started' by default, and the pending and execution times to '--'.

          optimSum.pendingTime = '--';
          optimSum.executionTime = '--';
        });
        this.doTaskPolling(true); // start task polling, kicking off with running check_task() for all optimizations

        this.optimsLoaded = true;
        sciris.succeed(this, 'Optimizations loaded');
      }).catch(error => {
        sciris.fail(this, 'Could not load optimizations', error);
      });
    },

    setOptimSummaries() {
      console.log('setOptimSummaries() called');
      sciris.start(this);
      sciris.rpc('set_optim_info', [this.projectID, this.optimSummaries]).then(response => {
        sciris.succeed(this, 'Optimizations saved');
      }).catch(error => {
        sciris.fail(this, 'Could not save optimizations', error);
      });
    },

    addOptimModal(optim_type) {
      // Open a model dialog for creating a new project
      console.log('addOptimModal() called for ' + optim_type);
      sciris.rpc('get_default_optim', [this.projectID, this.toolName(), optim_type]).then(response => {
        this.defaultOptim = response.data; // Set the optimization to what we received.

        this.resetModal(response.data);
        this.addEditDialogMode = 'add';
        this.addEditDialogOldName = this.modalOptim.name;
        this.$modal.show('add-optim');
        console.log(this.defaultOptim);
      });
    },

    saveOptim() {
      console.log('saveOptim() called');
      this.$modal.hide('add-optim');
      sciris.start(this);
      this.endYear = this.modalOptim.end_year;

      let newOptim = _.cloneDeep(this.modalOptim); // Get the new optimization summary from the modal.


      let optimNames = []; // Get the list of all of the current optimization names.

      this.optimSummaries.forEach(optimSum => {
        optimNames.push(optimSum.name);
      });

      if (this.addEditDialogMode === 'edit') {
        // If we are editing an existing optimization...
        let index = optimNames.indexOf(this.addEditDialogOldName); // Get the index of the original (pre-edited) name

        if (index > -1) {
          this.optimSummaries[index].name = newOptim.name; // hack to make sure Vue table updated

          this.optimSummaries[index] = newOptim;

          if (newOptim.name !== this.addEditDialogOldName) {
            // If we've renamed an optimization
            newOptim.serverDatastoreId = this.$store.state.activeProject.project.id + ':opt-' + newOptim.name; // Set a new server DataStore ID.
          }

          if (newOptim.status !== 'not started') {
            // Clear the present task.
            this.clearTask(newOptim); // Clear the task from the server.
          }

          newOptim.serverDatastoreId = this.$store.state.activeProject.project.id + ':opt-' + newOptim.name; // Build a task and results cache ID from the project's hex UID and the optimization name.

          newOptim.status = 'not started'; // Set the status to 'not started' by default, and the pending and execution times to '--'.

          newOptim.pendingTime = '--';
          newOptim.executionTime = '--';
        } else {
          sciris.fail(this, 'Could not find optimization "' + this.addEditDialogOldName + '" to edit');
        }
      } else {
        // Else (we are adding a new optimization)...
        newOptim.name = sciris.getUniqueName(newOptim.name, optimNames);
        newOptim.serverDatastoreId = this.$store.state.activeProject.project.id + ':opt-' + newOptim.name;
        this.optimSummaries.push(newOptim);
        this.getOptimTaskState(newOptim).then(result => {
          // Hack to get the Vue display of optimSummaries to update
          this.optimSummaries.push(this.optimSummaries[0]);
          this.optimSummaries.pop();
        });
      }

      sciris.rpc('set_optim_info', [this.projectID, this.optimSummaries]).then(response => {
        sciris.succeed(this, 'Optimization added');
        this.resetModal(this.defaultOptim);
      }).catch(error => {
        sciris.fail(this, 'Could not add optimization', error);
      });
    },

    cancelOptim() {
      this.$modal.hide('add-optim');
      this.resetModal(this.defaultOptim);
    },

    resetModal(optimData) {
      console.log('resetModal() called');
      this.modalOptim = _.cloneDeep(optimData);
      console.log(this.modalOptim);
    },

    editOptim(optimSummary) {
      // Open a model dialog for creating a new project
      console.log('editOptim() called');
      this.modalOptim = _.cloneDeep(optimSummary);
      console.log('defaultOptim', this.defaultOptim.obj);
      this.addEditDialogMode = 'edit';
      this.addEditDialogOldName = this.modalOptim.name;
      this.$modal.show('add-optim');
    },

    copyOptim(optimSummary) {
      console.log('copyOptim() called');
      sciris.start(this);

      var newOptim = _.cloneDeep(optimSummary);

      var otherNames = [];
      this.optimSummaries.forEach(optimSum => {
        otherNames.push(optimSum.name);
      });
      newOptim.name = sciris.getUniqueName(newOptim.name, otherNames);
      newOptim.serverDatastoreId = this.$store.state.activeProject.project.id + ':opt-' + newOptim.name;
      this.optimSummaries.push(newOptim);
      this.getOptimTaskState(newOptim);
      sciris.rpc('set_optim_info', [this.projectID, this.optimSummaries]).then(response => {
        sciris.succeed(this, 'Optimization copied');
      }).catch(error => {
        sciris.fail(this, 'Could not copy optimization', error);
      });
    },

    deleteOptim(optimSummary) {
      console.log('deleteOptim() called');
      sciris.start(this);

      if (optimSummary.status !== 'not started') {
        this.clearTask(optimSummary); // Clear the task from the server.
      }

      for (var i = 0; i < this.optimSummaries.length; i++) {
        if (this.optimSummaries[i].name === optimSummary.name) {
          this.optimSummaries.splice(i, 1);
        }
      }

      sciris.rpc('set_optim_info', [this.projectID, this.optimSummaries]).then(response => {
        sciris.succeed(this, 'Optimization deleted');
      }).catch(error => {
        sciris.fail(this, 'Could not delete optimization', error);
      });
    },

    runOptim(optimSummary, maxtime) {
      console.log('runOptim() called for ' + this.currentOptim + ' for time: ' + maxtime);
      this.validateYears(); // Make sure the end year is sensibly set.

      sciris.start(this);
      var RPCname = this.getOptimizationRPCName();
      sciris.rpc('set_optim_info', [this.projectID, this.optimSummaries]) // Make sure they're saved first
      .then(response => {
        sciris.rpc('launch_task', [optimSummary.serverDatastoreId, RPCname, [this.projectID, optimSummary.serverDatastoreId, optimSummary.name], {
          'plot_options': this.plotOptions,
          'maxtime': maxtime,
          'tool': this.toolName(),
          'plotyear': this.endYear,
          'pops': this.activePop,
          'cascade': null
        }]) // should this last be null?
        .then(response => {
          this.getOptimTaskState(optimSummary); // Get the task state for the optimization.

          if (!this.pollingTasks) {
            this.doTaskPolling(true);
          }

          sciris.succeed(this, 'Started optimization');
        }).catch(error => {
          sciris.fail(this, 'Could not start optimization', error);
        });
      }).catch(error => {
        sciris.fail(this, 'Could not save optimizations', error);
      });
    },

    plotResults(optimSummary) {
      this.displayResultName = optimSummary.name;
      this.displayResultDatastoreId = optimSummary.serverDatastoreId;
      this.reloadGraphs(optimSummary.serverDatastoreId, true);
    }

  }
};

var index = {
  CalibrationMixin,
  HelpMixin,
  ScenarioMixin,
  ProjectMixin,
  OptimizationMixin
};

require('vue2-simplert-plugin/dist/vue2-simplert-plugin.css');

require("bootstrap");

function install(Vue$$1, options = {}) {
  Object.defineProperty(Vue$$1.prototype, '$_', {
    value: _$1
  });
  Vue$$1.use(Simplert);

  if (!options.navigation) {
    options.navigation = {};
  }

  let navigationOptions = options.navigation.options || {};

  if (!navigationOptions.disabled) {
    Vue$$1.use(NavigationPlugin, navigationOptions);
  }

  Vue$$1.component('help', HelpLink);
  let afterLoginPath = options.afterLoginPath || "/";
  let afterPasswordChangePath = options.afterPasswordChangePath || "/";
  let afterRegistrationPath = options.afterRegistrationPath || "/login";
  let afterLogoutPath = options.afterLogoutPath || "/login";
  EventBus.$on(events.EVENT_LOGIN_SUCCESS, user => {
    options.router.push(afterLoginPath);
  });
  EventBus.$on(events.EVENT_LOGOUT_SUCCESS, user => {
    options.router.push(afterLogoutPath);
  });
  EventBus.$on(events.EVENT_REGISTER_SUCCESS, () => {
    setTimeout(function () {
      options.router.push(afterRegistrationPath);
    }, 1000); // Navigate automatically to the login page after a delay
  });
  EventBus.$on(events.EVENT_PASSWORD_CHANGE_SUCCESS, user => {
    options.router.push(afterPasswordChangePath);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({
    install
  });
}

var index$1 = {
  install
};
const views = {
  LoginPage,
  ChangePasswordPage,
  MainAdminPage,
  RegisterPage,
  UserChangeInfoPage
};

exports.default = index$1;
exports.ScirisRoutes = ScirisRoutes;
exports.EventBus = EventBus;
exports.events = events;
exports.views = views;
exports.mixins = index;
