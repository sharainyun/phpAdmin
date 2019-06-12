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
                <el-form-item label="雇员姓名" prop="username">
                    <el-input v-model="optionParams.username" placeholder="请输入雇员姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="optionParams.sex" placeholder="请选择性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getTable('true')">查询</el-button>
                    <el-button class="filter-item" type="primary" icon="el-icon-setting" @click="resetForm('params')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="filter-container" v-if="userType1||userType3">
            <el-button-group>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="rowData = {};dialogVisible = true;title = '添加雇员';disabled = false;">添加雇员</el-button>
            </el-button-group>
        </div>
        <!-- 列表 -->
        <div class="filter-container">
            <div class="tablelayer">
                <el-table :data="dataList" v-loading="listLoading" @current-change="handleCurrentChange" border fit highlight-current-row style="width: 100%" stripe>
                    <el-table-column align="center" label="ID" width="100">
                        <template slot-scope="scope">
                            {{scope.row.Id}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="用户名">
                        <template slot-scope="scope">
                            {{scope.row.username}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="密码">
                        <template slot-scope="scope">
                            {{scope.row.pwd}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="年龄">
                        <template slot-scope="scope">
                            {{scope.row.age}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="性别">
                        <template slot-scope="scope">
                            <span v-show="scope.row.sex == 1">男</span>
                            <span v-show="scope.row.sex == 2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="部门">
                        <template slot-scope="scope">
                            {{scope.row.bumen}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="薪资">
                        <template slot-scope="scope">
                            {{scope.row.xinzi}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="地址">
                        <template slot-scope="scope">
                            {{scope.row.address }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" fixed="right" width="330">
                        <template slot-scope="scope">
                            <el-button  type="primary" icon="el-icon-search" @click="rowData = scope.row;dialogVisible = true;title = '查看雇员';disabled = true;">查看</el-button>
                            <el-button v-if="userType1||userType3" type="primary" icon="el-icon-edit" @click="rowData = scope.row;dialogVisible = true;title = '编辑雇员';disabled = false;">编辑</el-button>
                            <!-- <el-button type="primary" size="small" icon="el-icon-search" @click="isAlert(scope.row, true)">编辑</el-button> -->
                            <el-button v-if="userType3" type="danger" icon="el-icon-delete" @click="deleteRows (scope.row.Id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分页 -->
        <div v-if="total" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="optionParams.page" :page-sizes="[10,20,30, 50]" :page-size="optionParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- dialog对话框 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <el-form :model="rowData" :rules="rules" ref="alertForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="rowData.username" placeholder="请输入用户名" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="rowData.pwd" placeholder="请输入密码" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="xingming">
                    <el-input v-model="rowData.xingming" placeholder="请输入姓名" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="rowData.sex" placeholder="请选择性别" style="width:100%;" :disabled="disabled">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="rowData.age" placeholder="请输入年龄" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="bumen">
                    <el-input v-model="rowData.bumen" placeholder="请输入部门" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="薪资" prop="xinzi">
                    <el-input v-model.number="rowData.xinzi"  placeholder="请输入薪资" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="rowData.address"  placeholder="请输入地址" :disabled="disabled"></el-input>
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
import ajax from '@utils/config';
import Cookies from 'js-cookie';
import { pickerOptions } from '@constants/index';
import { parseTime } from '@src/filters';
import { Common } from '@src/common/common';
import { downloadExecl } from '@src/components/excel.js';
export default {
    components: {
    },
    data() {
        return {
            pickerOptions: pickerOptions, //时间
            listLoading: false, //列表加载状态
            optionParams: { //查询参数
                limit: 10, //pageSize
                page: 1,
                sex: '',
                username: '',
            },
            total: '',
            dataList: [],
            rowData: {},
            dialogVisible: false,
            title: '',
            disabled: false,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                xingming: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                ],
                bumen: [
                    { required: true, message: '请输入部门', trigger: 'blur' },
                ],
                xinzi: [
                    { required: true, message: '请输入薪资', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
            },
            userType1:Cookies.get('userType')==='1',
            userType2:Cookies.get('userType')==='2',
            userType3:Cookies.get('userType')==='3',
        }
    },
    computed: {

    },
    created() {
        this.getTable();
    },
    mounted() {
    },
    methods: {
        //获取列表
        getTable(isSeach) {
            this.listLoading = true; //列表加载状态
            if (isSeach) {
                this.optionParams.page = 1;
            }
            ajax({
                url: 'guyuanQuery.php',
                optionParams: this.optionParams
            }).post()
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
                })
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url;
                    if(this.title === '添加雇员') {
                        url = 'guyuanAdd.php';
                    }
                    if(this.title ===  '编辑雇员') {
                        url = 'guyuanModify.php';
                    }
                    ajax({
                        url: url,
                        optionParams: this.rowData
                    }).post()
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
        //删除雇员
        deleteRows(Id) {
            this.$confirm('删除将无法恢复', '确定删除吗？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ajax({
                    url: 'guyuanDel.php',
                    optionParams: {
                        Id: Id,
                    }
                }).post()
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
                    })
            }).catch(() => {
                console.log()
            });
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    filters: {
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
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .el-form-item {
            margin-bottom: 0;
        }
    }
}
</style>


