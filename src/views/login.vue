<template>
  <div class="login">
    <div class="el-login-header">
      <el-image style="width: 50px; height:auto" :src="url" fit="contain"></el-image>
      <div class="header-title">智云易数科调解平台</div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">调解员登录入口</h3>
      <p class="title2">Mediator entry point</p>
      <div class="login-form-cont">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;color:#fff">记住密码</el-checkbox>
      </div>
      <el-form-item style="width:100%;padding-top:30px;margin-top:20px;">
          <el-button
            :loading="loading"
            size="medium"
            type="text"
            style="width:100%;background:#013476;color:#fff;height:50px;font-size:20px;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登  录</span>
            <span v-else>登 录 中...</span>
          </el-button>
      </el-form-item> 
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import url from '../assets/logo/logo.png'
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
      url:url,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    getCookie() {
    
      // const username = Cookies.get("username");
      // const password = Cookies.get("password");
      // const rememberMe = Cookies.get('rememberMe')
      // this.loginForm = {
      //   username: username === undefined ? this.loginForm.username : username,
      //   password: password === undefined ? this.loginForm.password : decrypt(password),
      //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      // };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
           this.loading = true;
           const username=this.loginForm.username;
           this.loginForm.username=username.replace(/(^\s*)|(\s*$)/g, "");
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
             .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
             })
           .catch(() => {
               this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.login {
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width:100%;
  background: url('../assets/image/login-background.jpg') no-repeat;
  background-size: 100%;
}
.el-login-header{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding:10px 20px;
  border-bottom:1px solid  rgba(255,255,255,0.5);
  box-sizing:border-box;
  .header-title{
    font-size: 24px;
    color:#222;
    padding-left:20px;
  }
}


.login-form {
  border-radius: 6px;
  width: 400px;
  padding: 0px 0px 5px 0px;
  background:rgba(0,0,0,0.3);
  position: absolute;
  right:200px;
  top:150px;
  .title {
    text-align: center;
    color: #fff;
    font-size: 26px;
    font-weight: 100;
    padding:30px 0px 0px 0px;
    margin:0 auto;
  }
  .title2{
    font-size: 20px;
    color: #fff;
    text-align: center;
    padding:5px 0px 30px 0px;
    margin:0 auto;
    font-weight: 100;
  }
  .login-form-cont{
    margin:0 30px;
    padding-top: 20px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
        background: transparent;
        border:0;
        border-bottom:1px solid #e0dddd;
        border-radius: 0;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }

  }
  
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-form-item, .el-checkbox{
  padding:0px 25px !important;
}
</style>
