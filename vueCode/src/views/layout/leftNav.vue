﻿<template>
  <div class='leftNav'>
    <!-- <div class="leftNav-img"></div> -->
    <div class="left_login">
      <div class="left_logo ">
        
      </div>
    </div>
    <ul class='listBox'>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#2d3a4b" router :unique-opened="true"  @select="handleSelect" style="border-right:none;">
        <template v-for="(item,index) in addRouter" >
          <el-submenu :index="index+''" :key="index" @mouseover.native="menter(index)" @mouseout.native="mleave(index)">
            <template slot="title">
              <span slot="title"  @click="goFirstRouter(item)" style="color:#fff;text-align:center;">{{item.label}}</span>
              <i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
            </template>
            <el-menu-item-group :key="index" v-for="(children,index) in item.children">
              <span slot="title"></span>
              <el-menu-item :index="children.path" @click="$router.push(children.path)">
                <span style="font-size:12px;margin-left:13px;color:#fff;">{{children.label}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </ul>
  </div>
</template>

<script>
import _ from "underscore";
import { mapGetters } from 'vuex';
import store from '@src/store';
import handleRouter from '@src/utils/handleRouter';
import ajax from '@utils/config';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      addRouter:[],
      // collapseUrl: require("@res/img/icon-liebiao.png"),
      arrow: require("@res/img/arrow.png"),
      arrowTop: require("@res/img/arrow2.png"),
      loginUrl: require("@res/img/logo.jpg")
    };
  },
  computed: {
    // ...mapGetters([
    //   'submenuIndex', 'addRouter'
    // ]),
    activeIndex() {
      console.log(Cookies.get('submenuIndex'));
      return Cookies.get('submenuIndex');
    }
  },
  created() {
    if(Cookies.get('userType')==='1'){
      this.addRouter = [
        {path:'/file/infoManage',label:'首页',children:[{path:'/file/infoManage',label:'首页'}]},
        {path:'/guyuan/manage',label:'雇员信息管理',children:[{path:'/guyuan/manage',label:'雇员信息管理'}]},
        {path:'/kehu/infoManage',label:'客户信息管理',children:[{path:'/kehu/infoManage',label:'客户信息管理'}]},
        {path:'/sign/manage',label:'审批管理',children:[{path:'/sign/manage',label:'审批管理'},{path:'/sign/myApproval',label:'我的审批'}]},
        {path:'/meeting/manage',label:'会议管理',children:[{path:'/meeting/manage',label:'会议管理'}]},
        {path:'/system/manage',label:'系统管理',children:[{path:'/system/manage',label:'系统管理'}]},
        {path:'/gonggao/gonggao',label:'公告管理',children:[{path:'/gonggao/gonggao',label:'公告管理'}]},
      ]
    }
    if(Cookies.get('userType')==='2'){
      this.addRouter = [
      {path:'/file/infoManage',label:'首页',children:[{path:'/file/infoManage',label:'首页'}]},
      {path:'/sign/manage',label:'审批管理',children:[{path:'/sign/myApproval',label:'我的审批'}]},
      {path:'/meeting/manage',label:'会议管理',children:[{path:'/meeting/manage',label:'会议管理'}]},
      {path:'/gonggao/gonggao',label:'公告管理',children:[{path:'/gonggao/gonggao',label:'公告管理'}]},
      
    ]
    }
    if(Cookies.get('userType')==='3'){
      this.addRouter = [
      {path:'/file/infoManage',label:'首页',children:[{path:'/file/infoManage',label:'首页'}]},
        {path:'/guyuan/manage',label:'雇员信息管理',children:[{path:'/guyuan/manage',label:'雇员信息管理'}]},
        {path:'/kehu/infoManage',label:'客户信息管理',children:[{path:'/kehu/infoManage',label:'客户信息管理'}]},
        {path:'/sign/manage',label:'审批管理',children:[{path:'/sign/manage',label:'审批管理'}]},
        {path:'/meeting/manage',label:'会议管理',children:[{path:'/meeting/manage',label:'会议管理'}]},
        {path:'/system/manage',label:'系统管理',children:[{path:'/system/manage',label:'系统管理'}]},
        {path:'/gonggao/gonggao',label:'公告管理',children:[{path:'/gonggao/gonggao',label:'公告管理'}]},
    ]
    }
    
  },
  mounted() {
    //this.handleRouter(this.$store.getters.router);
    // this.getRouter();
    // this.listInfo.map((item, index) => {
    //   if (window.location.href.indexOf(item.hash) != -1) {
    //     item.status = true; 
    //   }
    // })
  },
  methods: {
    statusFlag: function(item, addRouter) {
      let status = !item.status;
      for (let list in addRouter) {
        addRouter[list].status = false;
      }
      item.status = status;
    },
    // setActiveIndex (index) {
    //     this.activeIndex = index + '';
    // },
    getAddRouter() {
      this.listInfo = this.$store.getters.allRouter[Cookies.get('submenuIndex')].children;
    },
    //鼠标移入
    menter(index) {
      // this.listInfo[index].img = this.listInfo[index].imgHover;
    },
    //
    goFirstRouter(item) {
      if (item.children.length === 0) {
        this.$router.push(item.path);
      }
    },
    //鼠标滑出
    mleave(index) {
      // this.listInfo[index].img = this.listInfo[index].img1;
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    Collapse() {
    },
    go_url(children) {
      if (children.children.length == 0) {
        this.$router.push(children.path);
      }
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .el-menu-vertical-demo {
    background:#2d3a4b !important;
    color: #fff;
  }
</style>

