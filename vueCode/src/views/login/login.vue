<template>
  <div class="login-container">
    
    <div class="login-form">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="ruleForm">
        <div class="title">无纸化办公系统</div>
        <el-form-item class="www-form-item" prop="username" label="">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户" >
          </el-input>
        </el-form-item>
        <el-form-item class="www-form-item" prop="password" label="">
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item class="www-form-item" label="">
          <el-radio-group v-model="loginForm.userType">
            <el-radio :label="3">超级管理员</el-radio>
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="2">用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="www-form-item">
          <el-button type="primary" style="width:100%;"   :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import ajax from '@utils/config';
import Cookies from 'js-cookie';
import store from '@src/store';
import baseURL from '$lib/utils/baseURL';
import handleRouter from '@src/utils/handleRouter';
export default {
  name: 'login',
  data() {
    const validateusername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空！'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('图形验证码不能为空！'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位！'));
      } else {
        callback();
      }
    };
    return {
      bgImg: require("@res/img/smallImg.png"),
      loginForm: {
        username: '',
        password: '',
        userType: 1
      },
      imgUrl: '',
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateusername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        code: [
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      loading: false
    }
  },
  mounted() {
  },
  created() {
    this.reLoad();
    Cookies.remove('token');
  },
  computed: {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 登录
    login() {
      // this.$router.push('/guyuan/manage')
      ajax({
        url: 'login.php',
        optionParams: this.loginForm
      }).post()
        .then(res => {
          if (res.code === 200) {
            this.$store.dispatch('SETTOKEN', { token: this.loginForm.username});
            Cookies.set('token',this.loginForm.username);
            Cookies.set('userType',this.loginForm.userType);
            //Cookies.set('username',res.username);
            //this.getMenuList();
            
            this.$message.success(res.message);
            this.$router.push('/file/infoManage');
          } else {
            this.loading = false;
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    },
    //刷新图片
    reLoad() {
      let i = Date.parse(new Date());//目的是使图片不一样 
      this.loginForm.randomStr = i;
      this.imgUrl = baseURL()+'admin/code/' + i;
    },
    // 菜单信息
    getMenuList () {
      this.$store.dispatch('MenuList').then(response => {
        // ;
        
        this.$store.dispatch('ALLROUTER', { allRouter: response});
        handleRouter(0,true).then(res =>{
          this.$router.push({path: this.$store.getters.headerRouter[0].resourceUrl});
        });
      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%; // background-image: 
  // input:-webkit-autofill {
  //   -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
  //   -webkit-text-fill-color: #fff !important;
  // }
  // input {
  //   background: transparent;
  //   border: 0px;
  //   -webkit-appearance: none;
  //   border-radius: 0px;
  //   padding: 12px 5px 12px 15px;
  //   color: #eeeeee;
  //   height: 47px;
  // }
  // .el-input {
  //   display: inline-block;
  // }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    margin: 55px auto 20px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 395px;
    width: 395px;
    margin: auto;
    border: 1px solid #fff;
    border-radius:5px;
  }
  .login-form .ruleForm {
    width: 395px;
    height: 100%;
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .www-form-item {
    padding: 0 50px;
  }
}
</style>

