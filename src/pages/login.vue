<template>
<div class="demo-grid">
  <mu-row gutter>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
    <mu-col width="100" tablet="100" desktop="33">
        <div class="loginCon">
            <div class="loginHead">One Step建站</div>
            <mu-text-field  label="手机" labelFloat fullWidth v-model="mobile" /><br/>
            <mu-text-field  label="密码" labelFloat fullWidth v-model="password" /><br/>
            <mu-raised-button @click="login()" label="登录" labelClass="loginBtn" class="demo-raised-button" fullWidth/>
        </div>
    </mu-col>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
  </mu-row>
</div>
</template>
<script>
import '../static/css/login.sass'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      mobile: '',
      password: ''
    }
  },
  computed: mapGetters({
    isLogin: 'isLogin'
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
