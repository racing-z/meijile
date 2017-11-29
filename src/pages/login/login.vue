<template>
<div class="demo-grid">
  <mu-row gutter>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
    <mu-col width="100" tablet="100" desktop="33">
        <div class="loginCon">
            <div class="loginHead">One Step建站</div>
            <mu-text-field  label="手机" labelFloat fullWidth v-model="mobile" :errorText="mobileErrorText"/><br/>
            <mu-text-field  type="password"  label="密码" labelFloat fullWidth v-model="password" :errorText="passwordErrorText"/><br/>
            <mu-raised-button @click="login()" label="登录" labelClass="loginBtn" class="demo-raised-button" primary fullWidth/>
            <router-link :to="{ path: 'register', query: { plan: 'private' }}" class="logToggle">
              <mu-flat-button label="注册" class="demo-flat-button" secondary/>
              <mu-flat-button label="找回密码" class="demo-flat-button" secondary/>
            </router-link>
        </div>
        <div></div>
    </mu-col>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
  </mu-row>
</div>
</template>
<script>
import './login.sass'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  computed: mapGetters({
    isLogin: 'isLogin',
    userToken: 'userToken',
    passwordErrorText: 'passwordErrorText',
    mobileErrorText: 'mobileErrorText'
  }),
  methods: {
    login: function () {
      var _this = this
      _this.$store.dispatch('tologin', {
        mobile: _this.mobile,
        password: _this.password
      })
    }
  }
}
</script>
