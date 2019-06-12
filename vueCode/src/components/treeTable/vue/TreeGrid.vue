<template>
  <div class="filter-container">
    <el-table :data="data" border style="width: 100%" :row-style="showTr">
      <el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" align="center">
        <template slot-scope="scope">
          <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" :key="levelIndex" class="ms-tree-space"></span>
          <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
            <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
          </button>
          <span v-else-if="index===0" class="ms-tree-space"></span>
          {{scope.row[column.dataIndex]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="treeType === 'normal'" width="260" align="center">
        <template slot-scope="scope">
          <el-button type="button" size="small" @click="getEditData(scope.row);dialogEditVisible = true;">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog编辑 -->
    <el-dialog title="编辑组织机构" :visible.sync="dialogEditVisible" width="50%">
      <!-- form表单 -->
      <el-form :model="ruleEditForm" :rules="rules" ref="ruleEditForm" class="demo-ruleEditForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级机构:" prop="parentId">
              <!-- <el-cascader
                                  :options="dataList"
                                  v-model="ruleEditForm.parentId"
                                  :props="props1"
                                  change-on-select style="width:100%;">
                              </el-cascader> -->
              <el-input placeholder="请输入上级机构" v-model="ruleEditForm.parentId">
              </el-input>
            </el-form-item>
            <el-form-item label="机构排序:" prop="sort">
              <el-input placeholder="请输入机构排序" v-model="ruleEditForm.sort">
              </el-input>
            </el-form-item>
            <el-form-item label="状态:">
              <el-select clearable v-model="ruleEditForm.status" placeholder="请选择状态" style="width:100%;">
                <el-option v-for="item in statusList" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区编码:">
              <el-input placeholder="请输入区编码" v-model="ruleEditForm.areaCode">
              </el-input>
            </el-form-item>
            <el-form-item label="联系人:">
              <el-input placeholder="请输入联系人" v-model="ruleEditForm.linkman">
              </el-input>
            </el-form-item>
            <el-form-item label="邮政编码:">
              <el-input placeholder="请输入邮政编码" v-model="ruleEditForm.postCode">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" label-width="100px">
            <el-form-item label="机构名称:" prop="name">
              <el-input v-model="ruleEditForm.name" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item label="机构类型:" prop="type">
              <el-select clearable v-model="ruleEditForm.type" placeholder="请选择机构类型" style="width:100%;">
                <el-option v-for="item in typeList" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮箱:">
              <el-input placeholder="请输入电子邮箱" v-model="ruleEditForm.email">
              </el-input>
            </el-form-item>
            <el-form-item label="办公地址:">
              <el-input placeholder="请输入办公地址" v-model="ruleEditForm.officeAddr">
              </el-input>
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input placeholder="请输入联系电话" v-model="ruleEditForm.linkPhone">
              </el-input>
            </el-form-item>
            <el-form-item label="传真号码:">
              <el-input placeholder="请输入传真号码" v-model="ruleEditForm.fax">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="ruleEditForm.remark">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleEditForm')">提交</el-button>
          <el-button @click="resetForm('ruleEditForm');dialogEditVisible = false;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Utils from '../utils/index.js'
import ajax from '@utils/config';
//  import Vue from 'vue'
export default {
  name: 'tree-grid',
  props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function() {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function() {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      listQuery: { url: 'admin/organization/list', optionParams: {} },
      dialogEditVisible: false,
      typeList: [
        { code: 1, text: '企业' },
        { code: 2, text: '部门' }
      ],
      statusList: [
        { code: 1, text: '可用' },
        { code: 0, text: '不可用' }
      ],
      props1: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      dataList: [],
      // dataSource: [],
      ruleEditForm: {
      },
      rules: {
        parentId: [{ required: true, message: "上级机构不能为空", trigger: "blur" }],
        name: [{ required: true, message: "机构名称不能为空", trigger: "blur" }],
        type: [{ required: true, message: "机构类型不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "机构排序不能为空", trigger: "blur" }]
      }
    }
  },
  created() {
    // this.getApplyList();
  },
  computed: {
    // 格式化数据源
    data() {
      let me = this
      console.log(me.defaultExpandAll);
      if (me.treeStructure) {
        let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
        console.log(data);
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    // 显示行
    showTr(row, index) {
      
      let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
      row._show = show
      console.log(show);
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle(trIndex) {
      let me = this
      let record = me.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this
      if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
        return true
      }
      return false
    },
    //获取编辑数据
    getEditData(val) {
      this.ruleEditForm = {
        areaCode: val.areaCode,
        email: val.email,
        fax: val.fax,
        sort: val.sort,
        linkPhone: val.linkPhone,
        linkman: val.linkman,
        name: val.name,
        officeAddr: val.officeAddr,
        parentId: val.parentId,
        postCode: val.postCode,
        remark: val.remark,
        status: val.status,
        type: val.type
      }
    },
    //获取列表
    getApplyList() {
      ajax({
        url: this.listQuery.url,
        optionParams: this.listQuery.optionParams
      }).post()
        .then(res => {
          if (res.code === 200) {
            this.dataList = res.data;
            this.dataSource = res.data;
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 提交表单  新增/编辑时
    submitForm(formName) {
      // this.ruleEditForm.parentId = [].push(this.ruleEditForm.parentId);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.ruleAddForm.parentId = this.ruleAddForm.parentId[this.ruleAddForm.parentId.length-1];
          ajax({
            url: 'admin/organization/newOrganization',
            optionParams: this.ruleEditForm

          }).post().then(response => {
            if (response.code === 200) {
              this.$message({
                type: 'success',
                message: response.msg
              });
              this.dialogEditVisible = false;  //编辑对话框
              this.getApplyList();
            } else {
              this.$message({
                message: response.msg,
                type: "warning"
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped>
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}

.ms-tree-space::before {
  content: ""
}

table td {
  line-height: 26px;
}
</style>
