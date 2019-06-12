<template>
  <div>
    <div class="header">

    <div style="float:left;font-size:18px;font-weight:blod;height:45px;margin-left:300px;line-height:45px;">无纸化办公系统</div>
    <div style="float:right;" class='rightBox'>
      <el-menu theme="dark" mode="horizontal" @select="handleSelect">
        <el-submenu index="user" style="float:right;">
          <template class="title" slot="title" v-if="userName">{{userName}}</template>
          <template class="title" slot="title" v-else>用户名</template>
          <el-menu-item index="personalInfo">个人中心</el-menu-item>
          <el-menu-item index="modifyPass">修改密码</el-menu-item>
          <el-menu-item index="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialog">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
        <el-form-item style="padding-right:100px;" label="账号" label-width="120">
          <el-input v-model="ruleForm2.username" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="padding-right:100px;" prop="oldPassword" label="原密码" label-width="120">
                    <el-input v-model="ruleForm2.oldPassword" placeholder="请输入原密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="padding-right:100px;" prop="pass" label="新密码" label-width="120">
          <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入新密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="padding-right:100px;" prop="checkPass" label="新密码" label-width="120">
          <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次输入" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm2')">取 消</el-button>
        <el-button type="primary" @click="commitNewPass('ruleForm2')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 个人中心 -->
    <el-dialog title="个人中心" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="personData"  ref="ruleForm2" label-width="80px">
        <el-form-item label="用户名:">
          {{personData.username}}
        </el-form-item>
        <el-form-item label="部门:">
          {{personData.bumen}}
        </el-form-item>
        <el-form-item label="生日:">
          {{personData.birthday}}
        </el-form-item>
        <el-form-item label="入职时间:">
          {{personData.time}}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "@utils/config";
import { mobile } from "@src/utils/validate.js";
import logout from "@src/utils/loginout";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import handleRouter from "@src/utils/handleRouter";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logoUrl: "", //require('@res/img/logo.png'),
      logotUrl: "", //require('@res/img/logot.png'),
      activeIndex: "1",
      dialogLoading: false,
      mobileDisable: true,
      isEdit: false,
      dialogFormVisible: false,
      userShow: false,
      userName: Cookies.get("token") ? Cookies.get("token") : "",
      lastLoginTime: "",
      sysUserVo: null,
      ruleForm2: {
          username:'',
        pass: "",
        checkPass: "",
        oldPassword: ""
      },
      passwordDialog: false,
      personData:{},
      // data: this.$store.getters.headerRouter
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    // this.userName = Cookies.get('userName')?Cookies.get('userName'):'';
    // this.activeIndex = Cookies.get("submenuIndex");
    this.ruleForm2.username = this.userName;
  },
  computed: {
    ...mapGetters(["headerRouter"])
  },
  mounted() {
    //   window.onresize = function (ev) {
    //       let e = ev || event;
    //       let width = e.target.innerWidth;
    //       if (width <= 1000) {
    //           this.fixedWidth = true;
    //       } else {
    //           this.fixedWidth = false;
    //       }
    //   }
  },
  methods: {
    getUserInfo() {},
    getIndex(val) {
      Cookies.set("submenuIndex", val);
      handleRouter(val, true);
    },
    handleSelect(key) {
      
      if (key == "personalInfo") {
        this.getUserInfo();
        this.dialogFormVisible = true;
      } else if (key == "modifyPass") {
        this.passwordDialog = true;
      } else if (key == "logout") {
          logout();
          this.$router.push('/login');
        
      }
    },
    // 修改密码提交
    commitNewPass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ajax({
            url: "modifyPassword.php",
            optionParams: this.ruleForm2
          })
            .post()
            .then(res => {
              if (res.code === 200) {
                this.passwordDialog = false;
                this.$message.success(res.message);
              } else {
                this.$message.warning(res.message);
              }
            })
            .catch(error => {
              this.loading = false;
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取个人信息
    getUserInfo(){
      ajax({
        url: "systemQuery.php",
        optionParams: {
          username:Cookies.get("token"),
          limit: 10, //pageSize
          page: 1,
          userType: Cookies.get("userType")
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.personData = response.data[0];
                console.log(response.data[0]);
            } else {
                this.personData = {};
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goUrl(value) {
      this.$router.push({ path: value });
    },
    //安全退出
    safeExit() {
      this.$message({
        message: "安全退出成功！",
        type: "success"
      });
      
      logout();
      this.$router.push('/login');
    },
    // 设置头
    setHeader() {
      // this.data = this.$store.getters.headerRouters;
    },
    setActiveIndex(index) {
      this.activeIndex = index + "";
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu-item {
  height: 45px;
}

.is-active {
  width: 96px;
}
.header {
  color: #fff;
  font-weight: blod;
}
</style>

