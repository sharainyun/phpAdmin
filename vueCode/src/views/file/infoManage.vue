<template>
  <div class="app-container calendar-list-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <!-- form表单 -->
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="class" style="color:#ffffff;">111111111</div>
        </el-col>
        <el-col :span="16">
          <el-carousel
            :interval="3000"
            type="card"
            height="600px"
            :autoplay="true"
            style="width:1000px;"
          >
            <el-carousel-item v-for="item in imgList" :key="item">
              <h3>
                <img :src="item.url" alt>
              </h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <!-- <el-col :span="8">
          <div style="border-bottom:1px solid #000;"><i class="el-icon-loading">公司动态</i></div>
          <el-tabs type="border-card">
            <el-tab-pane label="新闻">用户管理</el-tab-pane>
            <el-tab-pane label="通知">配置管理</el-tab-pane>
            <el-tab-pane label="公告">角色管理</el-tab-pane>
          </el-tabs>
        </el-col>-->
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <div style="border-bottom:1px solid #000;" @click="$router.push('/gonggao/gonggao')">
            <i class="el-icon-loading">公司动态</i>
          </div>
          <el-tabs type="border-card" v-model="tabsName"  @tab-click="handleClick" >
            <el-tab-pane label="新闻" name="first">
              <div class="gonggao" v-for="(item,index) in xinwenList" :key="index">
                <li class="title">{{item.title}}</li>
                <li>{{item.username}}</li>
                <li>{{item.time}}</li>
              </div>
            </el-tab-pane>
            <el-tab-pane label="通知" @click="getGonggaoList1('2')" name="second">
              <h2>{{xinwenList2.title}}</h2>
              <p v-html="xinwenList2.neirong"></p>
            </el-tab-pane>
            <el-tab-pane label="公告" @click="getGonggaoList1('3')" name="third">
              <h2>{{xinwenList2.title}}</h2>
              <p v-html="xinwenList2.neirong"></p>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="8">
          <div style="border-bottom:1px solid #000;" @click="$router.push('/sign/manage')"><i class="el-icon">审批管理</i></div>
          <el-tabs type="border-card">
            <el-tab-pane label="审批">
              <div class="di">
            <div class="left">
              <h2>由我发起的审批</h2>
              <h4 style="text-align:center;">{{shenpiList.me}}</h4>
            </div>
            <div class="left" style="float:left;margin-right:20px;">
              <h2>待审批</h2>
              <h4 style="text-align:center;">{{shenpiList.ing}}</h4>
            </div>
            <div class="left" style="float:left;margin-right:20px;">
              <h2>审批通过</h2>
              <h4 style="text-align:center;">{{shenpiList.ed}}</h4>
            </div>
          </div>
            </el-tab-pane>
          </el-tabs>
          
        </el-col>
        <el-col :span="8">
          <div style="border-bottom:1px solid #000;" @click="$router.push('/system/manage')"><i class="el-icon">系统用户</i></div>
          <el-tabs type="border-card">
            <el-tab-pane label="用户">
              <div class="di">
            <div class="left">
              <h2>超级管理员</h2>
              <h4 style="text-align:center;">{{systemList.chaoji}}</h4>
            </div>
            <div class="left" style="float:left;margin-right:20px;">
              <h2>管理员</h2>
              <h4 style="text-align:center;">{{systemList.admin}}</h4>
            </div>
            <div class="left" style="float:left;margin-right:20px;">
              <h2>普通用户</h2>
              <h4 style="text-align:center;"> {{systemList.putong}}</h4>
            </div>
          </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ajax from "@utils/config";
import Cookies from "js-cookie";
// import { praseMoney, parseTime, loanStatusFilter } from "@src/filters";
// import { validatPhone } from "@src/utils/validate";
// import { url } from 'inspector';
export default {
  data() {
    return {
      tabsName: 'first',
      imgList: [
        { url: require("@res/img/1.png") },
        { url: require("@res/img/2.png") },
        { url: require("@res/img/3.png") },
        {url:require("@res/img/4.png")},
        {url:require("@res/img/5.png")},
        // { url: require("@res/img/6.jpg") }
      ],
      systemList:{
        chaoji:'',
        putong:'',
        admin:''
      },
      shenpiList:{
        me:'',
        ing:'',
        ed:''
      },
      xinwenList:[],
      xinwenList2:{}
    };
  },
  computed: {},
  created() {
    this.getApplyList();
    this.getShenpiList();
    this.getGonggaoList();
  },
  mounted() {},
  methods: {
    handleClick() {
        if (this.tabsName == 'first') {
            this.getGonggaoList();
        }
        if (this.tabsName == 'second') {
          this.getGonggaoList1('2');
        }
        if (this.tabsName == 'third') {
          this.getGonggaoList1('3');
        }
    },
    //获取新闻公告
    getGonggaoList(){
      ajax({
        url: "gonggaoQuery.php",
        optionParams: {
          limit: 4, //pageSize
          page: 1,
          type: '1',
          username: '',
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.xinwenList = response.data;
            } else {
              this.xinwenList = [];
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取公告通知
    getGonggaoList1(val){
      ajax({
        url: "gonggaoQuery.php",
        optionParams: {
          limit: 1, //pageSize
          page: 1,
          type: val,
          username: '',
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.xinwenList2 = response.data[0];
            } else {
              this.xinwenList2 = {};
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取审批信息
    getShenpiList(){
      console.log(111111);
      ajax({
        url: "shenpiQuery.php",
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          type: "",
          status:'',
          username: Cookies.get("token") ? Cookies.get("token") : "",
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.shenpiList.me = response.total;
            } else {
            }
        })
        .catch(error => {
          console.log(error);
        });
        ajax({
        url: "shenpiQuery.php",
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          type: "",
          status:'1',
          username: Cookies.get("token") ? Cookies.get("token") : "",
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.shenpiList.ing = response.total;
            } else {
            }
        })
        .catch(error => {
          console.log(error);
        });
        ajax({
        url: "shenpiQuery.php",
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          type: "",
          status:'2',
          username: Cookies.get("token") ? Cookies.get("token") : "",
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.shenpiList.ed = response.total;
            } else {
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取系统信息
    getApplyList() {
      ajax({
        url: 'systemQuery.php',
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          userType: "1",
          username: ""
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
            this.systemList.admin = response.total;
            console.log(this.systemList);
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
        ajax({
        url: 'systemQuery.php',
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          userType: "2",
          username: ""
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
            this.systemList.putong = response.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
        ajax({
        url: 'systemQuery.php',
        optionParams: {
          limit: 10, //pageSize
          page: 1,
          userType: "3",
          username: ""
        }
      })
        .post()
        .then(response => {
          if (response.code === 200) {
            this.systemList.chaoji = response.total;
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters: {
    //活动状态
    statusFilter(val) {
      if (val === 1) {
        return "正常";
      } else if (val === 2) {
        return "无效";
      } else {
        return val;
      }
    },
    //用户类型
    userTypeFilter(val) {
      if (val === 1) {
        return "普通用户";
      } else if (val === 2) {
        return "渠道用户";
      } else if (val === 3) {
        return "普通用户,渠道用户";
      } else {
        return val;
      }
    },
    //选择类型
    selectTypeFilter(val) {
      if (val === 1) {
        return "全部参加";
      } else if (val === 2) {
        return "部分参加";
      } else if (val === 3) {
        return "部分不参加";
      } else {
        return val;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.di {
  // border: 1px solid #ccc;
  height: 71px;
  width: 100%;
  .left {
    float: left;
    margin: 20px;
  }
}
.el-submenu__title {
  color: #fff !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.gonggao {
  width: 370px;
  height: 20px;
  line-height: 20px;
  & > li {
    float: left;
  }
  .title {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    width: 220px;
    height: 20px;
    margin-right: 20px;
  }
}
</style>


