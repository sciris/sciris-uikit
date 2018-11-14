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
var _ = _interopDefault(require('lodash'));

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

var css = "\n";
styleInject(css);

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

var LoginPage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage",staticStyle:{"background-color":"#f8f8f4","position":"fixed","min-height":"100%","min-width":"100%","padding":"0 0 0 0"},model:{value:(_vm.getVersionInfo),callback:function ($$v) {_vm.getVersionInfo=$$v;},expression:"getVersionInfo"}},[_c('div',{staticStyle:{"background-color":"#0c2544","position":"absolute","height":"100%","width":"260px"}},[_c('div',{staticClass:"logo"},[_c('div',{staticClass:"simple-text",staticStyle:{"font-size":"20px","color":"#fff","font-weight":"bold","padding":"20px"}},[_c('span',{staticStyle:{"padding-left":"10px"}},[_c('a',{attrs:{"href":_vm.homepage,"target":"_blank"}},[_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})])]),_vm._v(" "),_c('br'),_c('br'),_vm._v(" "),(_vm.version)?_c('div',{staticStyle:{"font-size":"14px","font-weight":"normal"}},[_vm._v(" Version "+_vm._s(_vm.version)+" ("+_vm._s(_vm.date)+") ")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticStyle:{"margin-right":"-260px"}},[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 auto"},attrs:{"name":"LogInForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryLogin($event)}}},[_c('div',{staticClass:"modal-body"},[_c('h2',[_vm._v("Login")]),_vm._v(" "),(_vm.loginResult != '')?_c('div',{staticClass:"section"},[_vm._v(_vm._s(_vm.loginResult))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.loginUserName),expression:"loginUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"username","placeholder":"User name","required":"required"},domProps:{"value":(_vm.loginUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.loginUserName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.loginPassword),expression:"loginPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Password","required":"required"},domProps:{"value":(_vm.loginPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.loginPassword=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Login")]),_vm._v(" "),_c('div',{staticClass:"section"},[_vm._v(" New user? "),_c('router-link',{attrs:{"to":"/register"}},[_vm._v(" Register here ")])],1)])])])])},staticRenderFns: [],_scopeId: 'data-v-485424ce',
  name: 'LoginPage',

  props: {
    homepage: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    }
  },

  data () {
    return {
      loginUserName: '',
      loginPassword: '',
      loginResult: '',
      version: '',
      date: '',
    }
  },

  computed: {
    getVersionInfo() {
      sciris.rpc('get_version_info')
      .then(response => {
        this.version = response.data['version'];
        this.date = response.data['date'];
      });
    },
  },

  methods: {
    tryLogin () {
      sciris.loginCall(this.loginUserName, this.loginPassword)
      .then(response => {
        if (response.data === 'success') {
          // Set a success result to show.
          this.loginResult = 'Logging in...';

          // Read in the full current user information.
          sciris.getCurrentUserInfo()
          .then(response2 => {
            // Set the username to what the server indicates.
            let user = response2.data.user;
            this.$store.commit('newUser', user);

            // Navigate automatically to the home page.
            EventBus.$emit(events.EVENT_LOGIN_SUCCESS, user); 
          })
          .catch(error => {
            // Set the username to {}.  An error probably means the
            // user is not logged in.
            this.$store.commit('newUser', {});
          });
        } else {
          // Set a failure result to show.
          this.loginResult = response.data;
        }
      })
      .catch(error => {
        EventBus.$emit(events.EVENT_LOGIN_FAIL, error); 
        console.log('Login failed', error);
        this.loginResult = "We're sorry, it seems we're having trouble communicating with the server.  Please contact support or try again later.";
      });
    }
  }
}

var css$1 = ".password-change-form {\n  max-width: 300px;\n  min-width: 100px;\n  margin: 0; }\n";
styleInject(css$1);

var ChangePasswordPage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.changeResult != '')?_c('p',[_vm._v(_vm._s(_vm.changeResult))]):_vm._e(),_vm._v(" "),_c('form',{staticClass:"password-change-form",attrs:{"name":"ChangePasswordForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryChangePassword($event)}}},[_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.oldPassword),expression:"oldPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"oldpassword","placeholder":"Reenter old password","required":"required"},domProps:{"value":(_vm.oldPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.oldPassword=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.newPassword),expression:"newPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Enter new password","required":"required"},domProps:{"value":(_vm.newPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.newPassword=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Update")]),_vm._v(" "),_c('br')])])},staticRenderFns: [],_scopeId: 'data-v-2032be54',

  name: 'ChangePasswordPage',

  data () {
    return {
      oldPassword: '',
      newPassword: '',
      changeResult: ''
    }
  },

  methods: {
    tryChangePassword () {
      sciris.changeUserPassword(this.oldPassword, this.newPassword)
        .then(response => {
          if (response.data === 'success') {
            sciris.succeed(this, 'Password updated');
            // Read in the full current user information.
            sciris.getCurrentUserInfo()
              .then(response2 => {
                // Set the username to what the server indicates.
                let user = response2.data.user;
                this.$store.commit('newUser', user);

                // Navigate automatically to the home page.
                EventBus.$emit(events.EVENT_PASSWORD_CHANGE_SUCCESS, user); 
              })
              .catch(error => {
                // Set the username to {}.  An error probably means the
                // user is not logged in.
                this.$store.commit('newUser', {});
              });
          } else {
            this.changeResult = response.data;
          }
        })
        .catch(error => {
          sciris.fail(this, 'Password updated failed', error);
          EventBus.$emit(events.EVENT_PASSWORD_CHANGE_FAIL, error); 
        });
    }
  }
}

var css$2 = "\n";
styleInject(css$2);

var MainAdminPage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage"},[_c('h2',[_vm._v("Users")]),_vm._v(" "),(_vm.usersList[0] != undefined)?_c('table',[_vm._m(0),_vm._v(" "),_vm._l((_vm.usersList),function(userobj){return _c('tr',[_c('td',[_vm._v(_vm._s(userobj.user.username))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.displayname))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.email))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.accountactive))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(userobj.user.admin))]),_vm._v(" "),_c('td',[_c('button',{on:{"click":function($event){_vm.activateAccount(userobj.user.username);}}},[_vm._v("Activate Account")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.deactivateAccount(userobj.user.username);}}},[_vm._v("Deactivate Account")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.grantAdmin(userobj.user.username);}}},[_vm._v("Grant Admin")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.revokeAdmin(userobj.user.username);}}},[_vm._v("Revoke Admin")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.resetPassword(userobj.user.username);}}},[_vm._v("Reset Password")]),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.deleteUser(userobj.user.username);}}},[_vm._v("Delete Account")])])])})],2):_vm._e(),_vm._v(" "),(_vm.adminResult != '')?_c('p',[_vm._v(_vm._s(_vm.adminResult))]):_vm._e()])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Username")]),_vm._v(" "),_c('th',[_vm._v("Display name")]),_vm._v(" "),_c('th',[_vm._v("Email")]),_vm._v(" "),_c('th',[_vm._v("Account active?")]),_vm._v(" "),_c('th',[_vm._v("Admin?")]),_vm._v(" "),_c('th',[_vm._v("Actions")])])}],_scopeId: 'data-v-4078727b',

  name: 'MainAdminPage',

  data () {
    return {
      usersList: [],
      adminResult: ''
    }
  },

  created () {
    this.getUsersInfo();
  },

  methods: {
    getUsersInfo () {
      sciris.getAllUsersInfo()
      .then(response => {
        this.usersList = response.data;
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Could not load users from server.';
      });
    },

    activateAccount (username) {
      sciris.activateUserAccount(username)
      .then(response => {
        // If the response was successful...
        if (response.data == 'success')
          // Give result message.
          this.adminResult = 'User account activated.';
        // Otherwise (failure)
        else
          // Give result message.
          this.adminResult = 'Account activation not successful.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Account activation not successful.';
      });
    },

    deactivateAccount (username) {
      sciris.deactivateUserAccount(username)
      .then(response => {
        // If the response was successful...
        if (response.data == 'success')
          // Give result message.
          this.adminResult = 'User account deactivated.';
        // Otherwise (failure)
        else
          // Give result message.
          this.adminResult = 'Account deactivation not successful.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Account deactivation not successful.';
      });
    },

    grantAdmin (username) {
      sciris.grantUserAdminRights(username)
      .then(response => {
        // If the response was successful...
        if (response.data == 'success')
          // Give result message.
          this.adminResult = 'Admin access granted.';
        // Otherwise (failure)
        else
          // Give result message.
          this.adminResult = 'Admin granting not successful.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Admin granting not successful.';
      });
    },

    revokeAdmin (username) {
      sciris.revokeUserAdminRights(username)
      .then(response => {
        // If the response was successful...
        if (response.data == 'success')
          // Give result message.
          this.adminResult = 'Admin access revoked.';
        // Otherwise (failure)
        else
          // Give result message.
          this.adminResult = 'Admin revocation not successful.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Admin revocation not successful.';
      });
    },

    resetPassword (username) {
      sciris.resetUserPassword(username)
      .then(response => {
        // If the response was successful...
        if (response.data == 'success')
          // Give result message.
          this.adminResult = 'Password reset.';
        // Otherwise (failure)
        else
          // Give result message.
          this.adminResult = 'Password reset not successful.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Password reset not successful.';
      });
    },

    deleteUser (username) {
      sciris.deleteUser(username)
      .then(response => {
        // Give result message.
        this.adminResult = 'User deleted.';

        // Get the users info again.
        this.getUsersInfo();
      })
      .catch(error => {
        // Give result message.
        this.adminResult = 'Deletion not successful.';
      });
    }

  }
}

var css$3 = "\n";
styleInject(css$3);

var RegisterPage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"SitePage",staticStyle:{"background-color":"#f8f8f4","position":"fixed","min-height":"100%","min-width":"100%","padding":"0 0 0 0"},model:{value:(_vm.getVersionInfo),callback:function ($$v) {_vm.getVersionInfo=$$v;},expression:"getVersionInfo"}},[_c('div',{staticStyle:{"background-color":"#0c2544","position":"absolute","height":"100%","width":"260px"}},[_c('div',{staticClass:"logo"},[_c('div',{staticClass:"simple-text",staticStyle:{"font-size":"20px","color":"#fff","font-weight":"bold","padding":"20px"}},[_c('span',{staticStyle:{"padding-left":"10px"}},[_c('a',{attrs:{"href":_vm.homepage,"target":"_blank"}},[_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})])]),_vm._v(" "),_c('br'),_c('br'),_vm._v(" "),_c('div',{staticStyle:{"font-size":"14px","font-weight":"normal"}},[_vm._v(" Version "+_vm._s(_vm.version)+" ("+_vm._s(_vm.date)+") ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"margin-right":"-260px"}},[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 auto"},attrs:{"name":"RegisterForm"},on:{"submit":function($event){$event.preventDefault();return _vm.tryRegister($event)}}},[_c('div',{staticClass:"modal-body"},[_c('h2',[_vm._v("Register")]),_vm._v(" "),(_vm.registerResult != '')?_c('div',{staticClass:"section"},[_vm._v(_vm._s(_vm.registerResult))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerUserName),expression:"registerUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"username","placeholder":"User name","required":"required"},domProps:{"value":(_vm.registerUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerUserName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerPassword),expression:"registerPassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"password","placeholder":"Password","required":"required"},domProps:{"value":(_vm.registerPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerPassword=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerDisplayName),expression:"registerDisplayName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"displayname","placeholder":"Display name (optional)"},domProps:{"value":(_vm.registerDisplayName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerDisplayName=$event.target.value;}}})]),_vm._v(" "),_c('div',{staticClass:"section form-input-validate"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.registerEmail),expression:"registerEmail"}],staticClass:"txbox __l",attrs:{"type":"text","name":"email","placeholder":"Email (optional)"},domProps:{"value":(_vm.registerEmail)},on:{"input":function($event){if($event.target.composing){ return; }_vm.registerEmail=$event.target.value;}}})]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Register")]),_vm._v(" "),_c('div',{staticClass:"section"},[_vm._v(" Already registered? "),_c('router-link',{attrs:{"to":"/login"}},[_vm._v(" Login ")])],1)])])])])},staticRenderFns: [],_scopeId: 'data-v-216897e8',
  name: 'RegisterPage',

  props: {
    homepage: {
      type: String,
      default: ""
    },
    logo: {
      type: String,
      default: ""
    }
  },

  data () {
    return {
      registerUserName: '',
      registerPassword: '',
      registerDisplayName: '',
      registerEmail: '',
      registerResult: '',
      version: '',
      date: '',
    }
  },

  computed: {
    getVersionInfo() {
      sciris.rpc('get_version_info')
        .then(response => {
          this.version = response.data['version'];
          this.date = response.data['date'];
        });
    },
  },

  methods: {
    tryRegister () {
      sciris.registerUser(
        this.registerUserName, 
        this.registerPassword,
        this.registerDisplayName, 
        this.registerEmail
      ).then(response => {
        if (response.data === 'success') { // Set a success result to show.
          this.registerResult = 'Success! Please wait while you are redirected...';
          EventBus.$emit(events.EVENT_REGISTER_SUCCESS); 
        } else { // Set a failure result to show.
          this.registerResult = response.data;
        }
      })
      .catch(error => {
          EventBus.$emit(events.EVENT_REGISTER_FAIL, error); 
          console.log('Register failed', error);
          this.registerResult = "We're sorry, it seems we're having trouble communicating with the server.  Please contact support or try again later.";
      });
    }
  }
}

var css$4 = "\n";
styleInject(css$4);

var UserChangeInfoPage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form',{staticStyle:{"max-width":"500px","min-width":"100px","margin":"0 0"},attrs:{"name":"ChangeUserInfo"},on:{"submit":function($event){$event.preventDefault();return _vm.tryChangeInfo($event)}}},[_c('div',{staticClass:"divTable"},[_c('div',{staticClass:"divTableBody"},[_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Username ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeUserName),expression:"changeUserName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changeusername","required":"required"},domProps:{"value":(_vm.changeUserName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeUserName=$event.target.value;}}})])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Display name ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeDisplayName),expression:"changeDisplayName"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changedisplayname"},domProps:{"value":(_vm.changeDisplayName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeDisplayName=$event.target.value;}}})])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Email ")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changeEmail),expression:"changeEmail"}],staticClass:"txbox __l",attrs:{"type":"text","name":"changedemail"},domProps:{"value":(_vm.changeEmail)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changeEmail=$event.target.value;}}})])])]),_vm._v(" "),_c('div',{staticClass:"divTableRow",staticStyle:{"line-height":"40px"}},[_c('div',{staticClass:"divRowLabel"},[_vm._v("Enter password")]),_vm._v(" "),_c('div',{staticClass:"divRowContent section form-input-validate",staticStyle:{"min-width":"100%","vertical-align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.changePassword),expression:"changePassword"}],staticClass:"txbox __l",attrs:{"type":"password","name":"changepassword","required":"required"},domProps:{"value":(_vm.changePassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.changePassword=$event.target.value;}}})])])]),_vm._v(" "),_c('button',{staticClass:"section btn __l __block",attrs:{"type":"submit"}},[_vm._v("Update")]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.changeResult != '')?_c('p',[_vm._v(_vm._s(_vm.changeResult))]):_vm._e()])])},staticRenderFns: [],_scopeId: 'data-v-20ca7892',
  name: 'UserChangeInfoPage',

  data () {
    return {
      changeUserName:    this.$store.state.currentUser.username,
      changeDisplayName: this.$store.state.currentUser.displayname,
      changeEmail:       this.$store.state.currentUser.email,
      changePassword:    '',
      changeResult:      ''
    }
  },

  methods: {
    tryChangeInfo () {
      sciris.changeUserInfo(
        this.changeUserName, 
        this.changePassword,
        this.changeDisplayName, 
        this.changeEmail
      ).then(response => {
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
              })
              .catch(error => {
                this.$store.commit('newUser', {}); // Set the username to {}.  An error probably means the user is not logged in.
              });
          } else {
            this.changeResult = response.data;
          }
        })
        .catch(error => {
          sciris.fail(this, 'Failed to update user info, please check password and try again', error);
          EventBus.$emit(EVENT_INFO_CHANGE_FAIL, error);
        });
    }
  }
}

var css$5 = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
styleInject(css$5);

var css$6 = ".moving-arrow {\n  border-right: 17px solid #f4f3ef;\n  border-top: 17px solid transparent;\n  border-bottom: 17px solid transparent;\n  display: inline-block;\n  position: absolute;\n  left: 243px;\n  top: 107px;\n  transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1); }\n";
styleInject(css$6);

var MovingArrow = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"moving-arrow",style:(_vm.arrowStyle)})},staticRenderFns: [],_scopeId: 'data-v-e7a3f2b0',
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
    arrowStyle () {
      return {
        transform: `translate3d(0px, ${this.moveY}px, 0px)`
      }
    }
  }
}

var Sidebar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.sidebarClasses,attrs:{"data-background-color":_vm.backgroundColor,"data-active-color":_vm.activeColor}},[_c('div',{staticClass:"sidebar-wrapper",attrs:{"id":"style-3"}},[_c('div',{staticClass:"logo"},[_c('a',{staticClass:"simple-text",attrs:{"href":"#"}},[_c('img',{attrs:{"src":_vm.logo,"width":"160px","vertical-align":"middle","alt":""}})])]),_vm._v(" "),_vm._t("default"),_vm._v(" "),_c('ul',{class:_vm.navClasses},_vm._l((_vm.links),function(link,index){return _c('router-link',{key:link.name + index,ref:link.name,refInFor:true,attrs:{"tag":"li","to":link.path}},[_c('a',[_c('i',{class:link.icon}),_vm._v(" "),_c('p',[_vm._v(_vm._s(link.name)+" ")])])])})),_vm._v(" "),_c('moving-arrow',{attrs:{"move-y":_vm.arrowMovePx}})],2)])},staticRenderFns: [],
  name: "Sidebar",
  props: {
    type: {
      type: String,
      default: 'sidebar',
      validator: (value) => {
        let acceptedValues = ['sidebar', 'navbar'];
        return acceptedValues.indexOf(value) !== -1
      }
    },
    backgroundColor: {
      type: String,
      default: 'darkblue',
      validator: (value) => {
        let acceptedValues = ['white', 'black', 'darkblue'];
        return acceptedValues.indexOf(value) !== -1
      }
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
        return acceptedValues.indexOf(value) !== -1
      }
    },
    logo: {
      type: String,
      default: ""
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
    sidebarClasses () {
      if (this.type === 'sidebar') {
        return 'sidebar'
      } else {
        return 'collapse navbar-collapse off-canvas-sidebar'
      }
    },
    navClasses () {
      if (this.type === 'sidebar') {
        return 'nav'
      } else {
        return 'nav navbar-nav'
      }
    },
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx () {
      return this.linkHeight * this.activeLinkIndex
    }
  },
  data () {
    return {
      linkHeight: 60,
      activeLinkIndex: 0,

      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false
    }
  },
  methods: {
    findActiveLink () {
      this.links.find((element, index) => {
        let found = element.path === this.$route.path;
        if (found) {
          this.activeLinkIndex = index;
        }
        return found
      });
    }
  },
  mounted () {
    this.findActiveLink();
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      this.findActiveLink();
    }
  }
}

var css$7 = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.dropdown-icon {\n  position: absolute;\n  top: 50%;\n  margin-top: -8px;\n  left: 5px;\n}\n";
styleInject(css$7);

var Navbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"navbar navbar-light navbar-default"},[_c('a',{staticClass:"navbar-brand",attrs:{"target":"_blank","href":_vm.homepage}},[_c('img',{attrs:{"height":"50px","vertical-align":"middle","src":_vm.logo}})]),_vm._v(" "),_c('button',{staticClass:"navbar-toggle",class:{toggled: _vm.$sidebar.showSidebar},attrs:{"type":"button"},on:{"click":_vm.toggleSidebar}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle navigation")]),_vm._v(" "),_c('span',{staticClass:"icon-bar bar1"}),_vm._v(" "),_c('span',{staticClass:"icon-bar bar2"}),_vm._v(" "),_c('span',{staticClass:"icon-bar bar3"})]),_vm._v(" "),_c('ul',{staticClass:"navbar-nav ml-auto collapse show"},_vm._l((_vm.links),function(link){return _c('li',{staticClass:"nav-item"},[_c('router-link',{staticClass:"nav-link",attrs:{"to":link.path}},[_c('span',[_vm._v(_vm._s(link.name))])])],1)})),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav ml-auto collapse show"},[_c('li',{staticClass:"nav-item nav-item-static"},[_c('div',{staticClass:"nav-link"},[_c('i',{staticClass:"ti-view-grid"}),_vm._v(" "),_c('span',[_vm._v("Project: "+_vm._s(_vm.activeProjectName))])])]),_vm._v(" "),_c('li',{staticClass:"nav-item nav-item-static"},[_c('dropdown',{attrs:{"title":_vm.activeUserName,"icon":"ti-user dropdown-icon"}},[_c('li',[_c('a',{attrs:{"href":"#/changeinfo"}},[_c('i',{staticClass:"ti-pencil"}),_vm._v("  Edit account")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/changepassword"}},[_c('i',{staticClass:"ti-key"}),_vm._v("  Change password")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/help"}},[_c('i',{staticClass:"ti-help"}),_vm._v("  Help")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#/about"}},[_c('i',{staticClass:"ti-shine"}),_vm._v("  About")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){_vm.logOut();}}},[_c('i',{staticClass:"ti-car"}),_vm._v("  Log out")])])])],1)])])},staticRenderFns: [],
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
  },

  // Health prior function
  data() {
    return {
      activePage: 'manage projects'
    }
  },

  computed: {
    // Health prior function
    currentUser(){
      return this.$store.state.currentUser
    },

    activeProjectName() {
      console.log(this.links);
      if (this.$store.state.activeProject.project === undefined) {
        return 'none'
      } else {
        return this.$store.state.activeProject.project.name
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
      return 'User: '+userlabel
    },

    // Theme function
    routeName () {
      const route_name = this.$route.name;
      return this.capitalizeFirstLetter(route_name)
    },
  },

  // Health prior function
  created() {
    sciris.getUserInfo(this.$store);
  },

  // Theme function
  data () {
    return {
      activeNotifications: false
    }
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
      sciris.logoutCall()
      .then(response => {
        // Update the user info.
        sciris.getUserInfo(this.$store);

        // Clear out the active project.
        this.$store.commit('newActiveProject', {});

        // Navigate to the login page automatically.
        EventBus.$emit(events.EVENT_LOGOUT_SUCCESS); 
      });
    },

    // Theme functions
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications;
    },

    closeDropDown () {
      this.activeNotifications = false;
    },

    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },

    hideSidebar () {
      this.$sidebar.displaySidebar(false);
    }
  }
}

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

var css$8 = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.small-button {\n  padding: 4px 4px 2px 2px;\n  margin-bottom: 5px;\n}\n.helplink-label {\n  display:inline-block; \n  font-size:1.4em; \n  margin: 0px 5px 10px 0px;\n}\n";
styleInject(css$8);

var HelpLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[(_vm.label!=='')?_c('div',{staticClass:"helplink-label"},[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn __blue small-button",attrs:{"data-tooltip":"Help"},on:{"click":function($event){_vm.openLink(_vm.reflink);}}},[_c('i',{staticClass:"ti-help"})])])},staticRenderFns: [],_scopeId: 'data-v-36d4825e',
  name: 'help',
  
  props: {
    reflink: {
      type: String,
      default: ''
    }, 

    label: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      baseURL: this.$store.state.helpLinks.baseURL,
      linkMap: this.$store.state.helpLinks.linkMap,
    }
  },

  methods: {
    openLink(linkKey) {
      // Build the full link from the base URL and the specific link info.
      let fullLink = this.baseURL + this.linkMap[linkKey];
      
      // Set the parameters for a new browser window.
      let scrh = screen.height;
      let scrw = screen.width;
      let h = scrh * 0.8;  // Height of window
      let w = scrw * 0.6;  // Width of window
      let t = scrh * 0.1;  // Position from top of screen -- centered
      let l = scrw * 0.37; // Position from left of screen -- almost all the way right

      // Open a new browser window.        
      let newWindow = window.open(fullLink, 
        'Reference manual', 'width=' + w + ', height=' + h + ', top=' + t + ',left=' + l);
        
      // If the main browser window is in focus, cause the new window to come into focus.
      if (window.focus) {
        newWindow.focus();
      }        
    }
  }
}

require('vue2-simplert-plugin/dist/vue2-simplert-plugin.css');

require("bootstrap");

function install(Vue$$1, options = {}) {
  Object.defineProperty(Vue$$1.prototype, '$_', {
    value: _
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

var index = {
  install
};
const views = {
  LoginPage,
  ChangePasswordPage,
  MainAdminPage,
  RegisterPage,
  UserChangeInfoPage
};

exports.default = index;
exports.ScirisRoutes = ScirisRoutes;
exports.EventBus = EventBus;
exports.events = events;
exports.views = views;
