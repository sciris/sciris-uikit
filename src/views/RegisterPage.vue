<!--
User registration page

Last update: 2018-08-26
-->


<template>
  <div class="SitePage" style="background-color:#f8f8f4; position:fixed; min-height:100%; min-width:100%; padding:0 0 0 0" v-model="getVersionInfo"> <!-- Should match _variables.scss:$bg-nude -->
    <div style="background-color:#0c2544; position:absolute; height:100%; width:260px">
      <div class="logo">
        <div class="simple-text" style="font-size:20px; color:#fff; font-weight:bold; padding:20px">
          <div v-if="favicon" class="logo-img" style="height:40px; width:40px; line-height:40px; border-radius:40px; background-color:#fff; text-align:center; display:inline-block">
            <img :src="favicon" width="21px" vertical-align="middle" alt>
          </div>
          <span style="padding-left:10px">
            <a v-if="homepage" :href="homepage" target="_blank">
              <img :src="logo" width="160px" vertical-align="middle" alt>
            </a>
            <img v-else :src="logo" width="160px" vertical-align="middle" alt>
          </span>
          <br/><br/>
          <div style="font-size:14px; font-weight:normal">
            Version {{ version }} ({{ date }})
          </div>
        </div>
      </div>
    </div>
    <div style="margin-right:-260px">
      <form name="RegisterForm" @submit.prevent="tryRegister" style="max-width: 500px; min-width: 100px; margin: 0 auto">

        <div class="modal-body">
          <h2>Register</h2>

          <div class="section" v-if="registerResult != ''">{{ registerResult }}</div>

          <div class="section form-input-validate">
            <input class="txbox __l"
                   type="text"
                   name="username"
                   placeholder="User name"
                   required="required"
                   v-model='registerUserName'/>
          </div>

          <div class="section form-input-validate">
            <input class="txbox __l"
                   type="password"
                   name="password"
                   placeholder="Password"
                   required="required"
                   v-model='registerPassword'/>
          </div>

          <div class="section form-input-validate">
            <input class="txbox __l"
                   type="text"
                   name="displayname"
                   placeholder="Display name (optional)"
                   v-model='registerDisplayName'/>
          </div>

          <div class="section form-input-validate">
            <input class="txbox __l"
                   type="text"
                   name="email"
                   placeholder="Email (optional)"
                   v-model='registerEmail'/>
          </div>

          <button type="submit" class="section btn __l __block">Register</button>

          <div class="section">
            Already registered?
            <router-link to="/login">
              Login
            </router-link>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>


<script>
import EventBus from '../eventbus.js'; 
import { events } from '../eventbus.js'; 

export default {
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
      this.$sciris.rpc('get_version_info')
        .then(response => {
          this.version = response.data['version'];
          this.date = response.data['date'];
        })
    },
  },

  methods: {
    tryRegister () {
      this.$sciris.registerUser(
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
          console.log('Register failed', error)
          this.registerResult = "We're sorry, it seems we're having trouble communicating with the server.  Please contact support or try again later."
      })
    }
  }
}
</script>
