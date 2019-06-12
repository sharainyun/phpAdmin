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
        <!-- <el-form-item label="申请人姓名" prop="username">
          <el-input v-model="optionParams.username" placeholder="请输入申请人姓名"></el-input>
        </el-form-item> -->
        <el-form-item label="审批类型" prop="sex">
          <el-select v-model="optionParams.type" placeholder="请选择审批类型">
            <el-option label="出差" value="1"></el-option>
            <el-option label="加班" value="2"></el-option>
            <el-option label="请假" value="3"></el-option>
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
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="rowData = {};dialogVisible = true;title = '发起审批';disabled = false;"
        >发起审批</el-button>
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
          <el-table-column align="center" label="申请人姓名">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==='1'">待审批</span>
              <span v-if="scope.row.status==='2'">拟通过</span>
              <span v-if="scope.row.status==='3'">拒绝</span>
              <span v-if="scope.row.status==='4'">审批通过</span>
            </template>
          </el-table-column>
           <el-table-column align="center" label="审批类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type==='1'">出差</span>
              <span v-if="scope.row.type==='2'">加班</span>
              <span v-if="scope.row.type==='3'">请假</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="审批人">
            <template slot-scope="scope">{{scope.row.oprater}}</template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">{{scope.row.startTime}}至{{scope.row.endTime}}</template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">{{scope.row.remark}}</template>
          </el-table-column>
          <el-table-column align="center" label="审批理由">
            <template slot-scope="scope">{{scope.row.reason}}</template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作" fixed="right" width="230">
            <template slot-scope="scope" v-if="scope.row.status==1">
              <el-button
                type="primary"
                @click="dialogVisible1 = true;shenpiList.status = 2;shenpiList.Id = scope.row.Id;"
              >审批通过</el-button>
              <el-button type="danger" @click="dialogVisible1 = true;shenpiList.status = 3;shenpiList.Id = scope.row.Id;">拒绝</el-button>
            </template>
          </el-table-column> -->
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
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form :model="rowData" :rules="rules" ref="alertForm" label-width="80px">
        <el-form-item label="审批类别" prop="type">
            <el-select v-model="rowData.type" placeholder="请选择审批类别" style="width:100%;" :disabled="disabled">
                <el-option label='出差' :value="1"></el-option>
                <el-option label="加班" :value="2"></el-option>
                <el-option label="请假" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="startTime">
          <el-date-picker
            v-model="rowData.startTime"
            type="datetime"
            placeholder="选择开始日期时间"
            align="right"
            style="width：100%;"
            :disabled="disabled"
            :picker-options="pickerOptions"
          ></el-date-picker>至
          <el-date-picker
            v-model="rowData.endTime"
            type="datetime"
            placeholder="选择结束日期时间"
            align="right"
            style="width：100%;"
            :disabled="disabled"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="rowData.remark" placeholder="请输入备注" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer" v-if="!disabled">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="alertSubmit('alertForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog对话框 -->
    <el-dialog title="审批" :visible.sync="dialogVisible1" width="40%">
      <el-form :model="shenpiList" :rules="rules" ref="shenpiList" label-width="80px">
        <el-form-item label="审批原因" prop="reason">
          <el-input v-model="shenpiList.reason" placeholder="请输入审批原因"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('shenpiList')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ajax from "@utils/config";
import { pickerOptions } from "@constants/index";
import { parseTime } from "@src/filters";
import { Common } from "@src/common/common";
import { upload } from "@src/components/upload/upload.vue";
import Cookies from "js-cookie";
import baseURL from '$lib/utils/baseURL';
export default {
  components: {
      upload
  },
  data() {
    return {
      pickerOptions: pickerOptions, //时间
      listLoading: false, //列表加载状态
      optionParams: {
        //查询参数
        limit: 10, //pageSize
        page: 1,
        type: "",
        status:'',
        username: Cookies.get("token") ? Cookies.get("token") : "",
      },
      total: "",
      dataList: [],
      rowData: {
        username:Cookies.get("token") ? Cookies.get("token") : "",
        startTime:'',
        endTime: '',
        type:'',
        remark:''
      },
      shenpiList:{
        Id:'',
        status:'',
        reason:'',
        oprater:''
      },
      dialogVisible: false,
      dialogVisible1: false,
      uploadUrl:baseURL()+"doupload.php",
      title: "",
      disabled: false,
      rules: {
        type: [
          { required: true, message: "请选择审批类别", trigger: "blur" }
        ],
        startTime: [{ required: true, message: "请选择时间", trigger: "blur" }],
      },
      moniData:[
        {Id:1,username:'zhangsan',status:1,oprater:'叶海云',startTime:'2019-04-01',endTime:'2019-04-10',remark:'这是个啥子哦',reason:'',type:1},
        {Id:3,username:'李四',status:2,oprater:'叶海云',startTime:'2019-04-02',endTime:'2019-04-11',remark:'这是个啥子哦',reason:'无聊中',type:2},
        {Id:8,username:'王五',status:3,oprater:'叶海云',startTime:'2019-04-03',endTime:'2019-04-09',remark:'这是个啥子哦',reason:'同意',type:3},
      ]
    };
  },
  computed: {},
  created() {
    // this.dataList = this.moniData;
    this.getTable();
    this.shenpiList.oprater = Cookies.get("token") ? Cookies.get("token") : "";
    console.log(this.shenpiList.oprater);

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
        url: "shenpiQuery.php",
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
            this.rowData.startTime = parseTime(this.rowData.startTime, '{y}-{m}-{d} {h}:{i}:{s}');
            this.rowData.endTime = parseTime(this.rowData.endTime, '{y}-{m}-{d} {h}:{i}:{s}');
            this.rowData.username = Cookies.get("token") ? Cookies.get("token") : "";
          let url;
          if (this.title === "发起审批") {
            url = "shenpiAdd.php";
          }
          if (this.title === "编辑用户") {
            url = "shenpiModify.php";
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
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.shenpiList);
          ajax({
            url: 'shenpiModify.php',
            optionParams: this.shenpiList
          })
            .post()
            .then(response => {
              if (response.code === 200) {
                this.$message.success(response.message);
                this.dialogVisible1 = false;
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
    //删除审批
    deleteRows(Id) {
      this.$confirm("删除将无法恢复", "确定删除该审批吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ajax({
            url: "shenpiDel.php",
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