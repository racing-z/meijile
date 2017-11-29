<template>
<div class="demo-grid">
  <mu-row gutter>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
    <mu-col width="100" tablet="100" desktop="33">
        <div class="loginCon">
            <div class="loginHead">One Step建站</div>
            <mu-text-field  label="用户名" labelFloat fullWidth v-model="userName" /><br/>
            <mu-text-field  label="手机" labelFloat fullWidth v-model="mobile" /><br/>
            <mu-text-field type="password" label="密码" labelFloat fullWidth v-model="password" /><br/>
            <input class="smsCode" v-model="smsCodeInp">
            <mu-raised-button :label="smsLabel" class="demo-raised-button smsCodeBtn" @click="getSmsCode()" :disabled="disabled" primary/>
            <mu-raised-button @click="register()" label="注册" labelClass="loginBtn" class="demo-raised-button" fullWidth primary/>
            <router-link :to="{ path: 'login'}" class="logToggle">
              <mu-flat-button label="登录" class="demo-flat-button" secondary/>
            </router-link>
        </div>
    </mu-col>
    <mu-col width="0" tablet="0" desktop="33"></mu-col>
  </mu-row>
</div>
</template>
<script>
import './register.sass'
import { mapGetters } from 'vuex'
const querystring = require('querystring')
export default {
  data () {
    return {
      mobile: '',
      password: '',
      disabled: false,   // 默认获取验证码按钮是可点击的
      smsLabel: '获取验证码',
      smsCodeInp: '', // 用户输入的验证码
      userName: ''
    }
  },
  computed: mapGetters({
    smsCode: 'smsCode'
  }),
  methods: {
    register: function () {
      let _this = this
      let mobileReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (this.smsCodeInp !== '' && this.smsCodeInp === this.smsCode) { // 验证码校验成功
        if (!mobileReg.test(this.mobile)) {
          window.tip('手机号码输入有误')
        } else {
          this.$store.dispatch('register', querystring.stringify({
            mobile: _this.mobile,
            password: _this.password,
            username: _this.userName
          }))
        }
      } else {
        window.tip('验证码有误')
      }
    },
    getSmsCode: function () {
      let _this = this
      let mobileReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (mobileReg.test(_this.mobile)) {
        this.$store.dispatch('getSmsCode', _this.mobile).then((res) => {
          if (res.success) { // 获取验证码成功
            window.tip(res.msg)
            this.disabled = true   // 获取验证码按钮不可点击
            this.doloop(60) // 倒计时
          } else {
            window.tip(res.msg)
          }
        })
      } else {
        window.tip('请输入正确的手机号')
      }
    },
    doloop: function (num) {
      let _this = this
      function loop () {
        if (num === 0) {
          clearInterval(clock)
          _this.disabled = false   // 可点击
          _this.smsLabel = '获取验证码'
        } else if (num > 0) {
          _this.smsLabel = num + '秒后再试'
        }
        num--
      }
      loop()
      let clock = setInterval(loop, 1000)
    }
  },
  created: function () {
    // this.$store.dispatch('getSmsCode', {mobile: 17660416793})
  }
}
</script>
