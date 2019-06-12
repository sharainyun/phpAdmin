<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索条件 -->
        <div class="filter-container">
        </div>
        <!-- 列表 -->
        <div class="filter-container">
            
        </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import { pickerOptions } from '@constants/index';
import { praseMoney, parseTime, loanStatusFilter } from '@src/filters';
import {validatPhone} from '@src/utils/validate';
export default {
    data() {
        var validatP = (rule, value, callback) => {
            if(!validatPhone(value))
                callback(new Error('手机格式错误!'))
            callback();
        };
        return {
            listLoading: true, //列表加载状态
            listQuery: { url: 'uacUser/findUserByIntroduction', optionParams: {} },
            total: '',
            dataList: [],
            pickerOptions: pickerOptions,
            platList: []
        }
    },
    computed: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
       
    },
    filters: {
    }
}
</script>
<style lang="less" scoped>

</style>


