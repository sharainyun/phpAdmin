<template>
  <div class="app-container calendar-list-container ggg_user">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-form :inline="true" :model="optionParams" class="demo-form-inline" ref="params">
        <el-form-item label="页数" prop="limit" v-show="false">
          <el-input placeholder="请输入" v-model="optionParams.limit"></el-input>
        </el-form-item>
        <el-form-item label="页码" prop="page" v-show="false">
          <el-input placeholder="请输入" v-model="optionParams.page"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="optionParams.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="optionParams.sex" placeholder="请选择用户类型">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="getTable('true')"
          >查询</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-setting"
            @click="resetForm('params')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <el-button-group>
        <el-button
          v-if="userType3"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="rowData = {};dialogVisible = true;title = '添加用户';disabled = false;"
        >添加用户</el-button>
      </el-button-group>
    </div>
    <!-- 列表 -->
    <div class="filter-container">
      <div class="tablelayer">
        <el-table
          :data="dataList"
          v-loading="listLoading"
          @current-change="handleCurrentChange"
          border
          fit
          highlight-current-row
          style="width: 100%"
          stripe
        >
          <el-table-column align="center" label="ID" width="100">
            <template slot-scope="scope">{{scope.row.Id}}</template>
          </el-table-column>
          <el-table-column align="center" label="用户名">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <!-- <el-table-column align="center" label="密码">
            <template slot-scope="scope">{{scope.row.password}}</template>
          </el-table-column> -->
          <el-table-column align="center" label="用户类型">
            <template slot-scope="scope">
              <span v-show="scope.row.userType == 1">管理员</span>
              <span v-show="scope.row.userType == 2">普通用户</span>
              <span v-show="scope.row.userType == 3">超级管理员</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" width="330">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="rowData = scope.row;dialogVisible = true;title = '查看用户';disabled = true;"
              >查看</el-button>
              <el-button
                v-if="userType3"
                type="primary"
                icon="el-icon-edit"
                @click="rowData = scope.row;dialogVisible = true;title = '编辑用户';disabled = false;"
              >编辑</el-button>
              <!-- <el-button type="primary" size="small" icon="el-icon-search" @click="isAlert(scope.row, true)">编辑</el-button> -->
              <el-button v-if="userType3" type="danger" icon="el-icon-delete" @click="deleteRows (scope.row.Id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div v-if="total" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="optionParams.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="optionParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- dialog对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="rowData" :rules="rules" ref="alertForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="rowData.username" placeholder="请输入用户名" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select
            v-model="rowData.userType"
            placeholder="请选择用户类型"
            style="width:100%;"
            :disabled="disabled"
          >
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="rowData.password" placeholder="请输入密码" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="bumen">
          <el-input v-model="rowData.bumen" placeholder="请输入部门" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="time">
          <el-date-picker
            v-model="rowData.time"
            type="date"
            placeholder="选择日期时间"
            align="right"
            style="width：100%;"
            :disabled="disabled"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="rowData.birthday"
            type="date"
            placeholder="选择日期时间"
            align="right"
            style="width：100%;"
            :disabled="disabled"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="!disabled">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="alertSubmit('alertForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ajax from "@utils/config";
import Cookies from 'js-cookie';
import { pickerOptions } from "@constants/index";
import { parseTime } from "@src/filters";
import { Common } from "@src/common/common";
import { downloadExecl } from "@src/components/excel.js";
export default {
  components: {},
  data() {
    return {
      pickerOptions: pickerOptions, //时间
      listLoading: false, //列表加载状态
      optionParams: {
        //查询参数
        limit: 10, //pageSize
        page: 1,
        userType: "",
        username: ""
      },
      total: "",
      dataList: [],
      rowData: {},
      dialogVisible: false,
      title: "",
      disabled: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名姓名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userType: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
        bumen: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
        time: [{ required: true, message: "请选择入职时间", trigger: "blur" }],
        birthday:[{ required: true, message: "请选择生日", trigger: "blur" }],
      },
      userType1:Cookies.get('userType')==='1',
      userType2:Cookies.get('userType')==='2',
      userType3:Cookies.get('userType')==='3',
    };
  },
  computed: {},
  created() {
    this.getTable();
  },
  mounted() {},
  methods: {
    //获取列表
    getTable(isSeach) {
      this.listLoading = true; //列表加载状态
      if (isSeach) {
        this.optionParams.page = 1;
      }
      ajax({
        url: "systemQuery.php",
        optionParams: this.optionParams
      })
        .post()
        .then(response => {
          if (response.code === 200) {
                this.dataList = response.data ? response.data : [];
                this.listLoading = false; //列表加载状态
                this.total = response.total;
            } else {
                this.dataList = [];
                this.total = 0;
                this.listLoading = true; //列表加载状态
            }
        })
        .catch(error => {
          console.log(error);
          this.listLoading = false; //列表加载状态
        });
    },
    //鼠标悬浮当前行
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 改变每一页的条数
    handleSizeChange(val) {
      this.optionParams.limit = val;
      this.optionParams.page = 1; //从第一页开始
      this.getTable();
    },
    // 切换页码
    handleCurrentPageChange(val) {
      this.optionParams.page = val;
      this.getTable();
    },
    //提交
    alertSubmit(formName) {
        
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.rowData.time = parseTime(this.rowData.time, '{y}-{m}-{d}')
            this.rowData.birthday = parseTime(this.rowData.birthday, '{y}-{m}-{d}')
          let url;
          if (this.title === "添加用户") {
            url = "systemAdd.php";
          }
          if (this.title === "编辑用户") {
            url = "systemModify.php";
          }
          ajax({
            url: url,
            optionParams: this.rowData
          })
            .post()
            .then(response => {
              if (response.code === 200) {
                this.$message.success(response.message);
                this.dialogVisible = false;
                this.getTable();
              } else {
                this.$message.error(response.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除用户
    deleteRows(Id) {
      this.$confirm("删除将无法恢复", "确定删除该用户吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ajax({
            url: "systemDel.php",
            optionParams: {
              Id: Id
            }
          })
            .post()
            .then(response => {
              if (response.code === 200) {
                this.$message.success(response.message);
                this.getTable();
              } else {
                this.$message.error(response.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          console.log();
        });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //md5解码
      uncompileStr(code){
        code = unescape(code);        
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
        for(var i=1;i<code.length;i++){        
            c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
        }        
        return c;
        } 
  },
  filters: {
      //md5解码
      uncompileStr(code){
        code = unescape(code);        
        var c=String.fromCharCode(code.charCodeAt(0)-code.length);        
        for(var i=1;i<code.length;i++){        
            c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));        
        }        
        return c;
        } 
  }
}
</script>
<style lang="less" >
.rowClass {
  padding: 0 20px;
  .bg-purple {
    padding: 10px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>