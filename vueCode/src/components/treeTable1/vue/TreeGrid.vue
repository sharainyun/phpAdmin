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
          <span v-if="column.dataIndex!='icon'&&column.dataIndex!='component'">{{scope.row[column.dataIndex]}}</span>
          <span v-if="column.dataIndex==='icon'|| column.dataIndex==='component'"><img :src="scope.row[column.dataIndex]"/></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="treeType === 'normal'" width="260" align="center">
        <template slot-scope="scope">
          <el-button type="button" size="small" @click="getEditData(scope.row);dialogEditVisible = true;">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑菜单 -->
    <el-dialog title="编辑菜单" :visible.sync="dialogEditVisible" width="50%">
      <!-- form表单 -->
      <el-form :model="ruleEditForm" :rules="rules" ref="ruleEditForm" class="demo-ruleEditForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="父级菜单:" prop="parentId">
              <!-- <el-cascader :options="dataList" v-model="ruleEditForm.parentId" :props="props" change-on-select style="width:100%;">
              </el-cascader> -->
              <el-input placeholder="请输入父级菜单id" v-model="ruleEditForm.parentId">
              </el-input>
            </el-form-item>
            <el-form-item label="菜单名称:" prop="name">
              <el-input placeholder="请输入菜单名称" v-model="ruleEditForm.name">
              </el-input>
            </el-form-item>
            <el-form-item label="菜单排序:" prop="sort">
              <el-input placeholder="请输入菜单排序" v-model="ruleEditForm.sort">
              </el-input>
            </el-form-item>
            <el-form-item label="请求方法:" prop="method">
              <el-select clearable v-model="ruleEditForm.method" placeholder="请选择请求方法" style="width:100%;">
                <el-option v-for="item in methodList" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" label-width="100px">
            <el-form-item label="菜单标识:" prop="menuFlag">
              <el-input v-model="ruleEditForm.menuFlag" disabled placeholder="请输入菜单标识"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标:" prop="icon">
              <el-select clearable v-model="ruleEditForm.icon" placeholder="请选择菜单图标" style="width:100%;">
                <el-option v-for="item in iconList" :key="item.id" :label="item.name" :value="item.id">
                  <img :src="item.hover" alt="">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="高亮图标:" prop="component">
              <el-select clearable v-model="ruleEditForm.component" placeholder="请选择高亮菜单图标" style="width:100%;">
                <el-option v-for="item in iconList" :key="item.id" :label="item.name" :value="item.id">
                  <img :src="item.url" alt="">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单类型:" prop="type">
              <el-select clearable v-model="ruleEditForm.type" disabled placeholder="请选择菜单类型" style="width:100%;">
                <el-option v-for="item in typeList" :key="item.code" :label="item.text" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="路由:" prop="url" label-width="100px">
          <el-input placeholder="请输入路由" v-model="ruleEditForm.url">
          </el-input>
        </el-form-item>
        <el-form-item label="菜单描述:" prop="remark" label-width="100px">
          <el-input type="textarea" :rows="3" placeholder="请输入菜单描述" v-model="ruleEditForm.remark">
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
import Utils from '../utils/index.js';
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
      listQuery: { url: 'admin/menu/All', optionParams: {} },
      dialogEditVisible: false,
      typeList:[
          {code: 1,text: '按钮'},
          {code: 0,text: '菜单'}
      ],
      methodList:[
          {code:'POST',text:'POST'},
          {code:'GET',text:'GET'},
          {code:'PUT',text:'PUT'},
          {code:'DELETE',text:'DELETE'}
      ],
      props: {
          value: 'menuId',
          label: 'label',
          children: 'children'
      },
      dataList: [],
      iconList: [],
      ruleEditForm: {
      },
      rules: {
        parentId: [{required: true, message: "上级菜单不能为空", trigger: "blur" }],
        name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
        sort: [{ required: true, message: "菜单排序不能为空", trigger: "blur" }],
        method: [{ required: true,message: "请求方法不能为空", trigger: "blur" }],
        menuFlag: [{ required: true,message: "菜单标识不能为空", trigger: "blur" }],
        icon: [{ required: true,message: "图标不能为空", trigger: "blur" }],
        component: [{ required: true,message: "高亮图标不能为空", trigger: "blur" }],
        type: [{ required: true,message: "菜单类型不能为空", trigger: "blur" }],
        url: [{ required: true,message: "路由不能为空", trigger: "blur" }],
        remark: [{ required: true,message: "菜单描述不能为空", trigger: "blur" }]
      }
    }
  },
  created() {
    this.getApplyList();
    this.getIconList();
  },
  computed: {
    // 格式化数据源
    data: function() {
      let me = this
      if (me.treeStructure) {
        let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    // 显示行
    showTr: function(row, index) {
      let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
      row._show = show
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle: function(trIndex) {
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
    //获取图标
        getIconList() {
            ajax({
                url: 'admin/menu/icons',
                optionParams: {}
            }).fetch()
                .then(res => {
                    if (res.code === 200) {
                        this.iconList = res.data;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
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
            console.log(this.dataList);
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //获取编辑数据
    getEditData(val) {
      this.ruleEditForm = {
        parentId: val.parentId,
        name: val.label,
        sort: val.sort,
        method: val.method,
        menuFlag: val.menuFlag,
        icon: val.icon,
        component: val.component,
        type: val.type,
        url: val.url,
        remark: val.remark
      }
    },
    // 提交表单  新增/编辑时
    submitForm(formName) {
      console.log(this.ruleEditForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.ruleAddForm.parentId = this.ruleAddForm.parentId[this.ruleAddForm.parentId.length-1];
          ajax({
            url: 'admin/menu/saveOrUpdate',
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
