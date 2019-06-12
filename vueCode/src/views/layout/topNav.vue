 <template>  
  <div class="breadcrumb">  <!--顶部导航栏 -->
    <!-- <i class="el-icon-back" @click="$router.go(-1);">返回</i> -->
    <!-- <el-button class="filter-item" type="text" icon="back" @click="$router.go(-1);">返回</el-button> -->
    <span href="#/" style="font-size:12px;">
    当前位置：
    </span>
    <span :key="item.path" v-for="(item, index) in list" style="font-size:12px;">{{item.title}}
      <span v-if="index !== (list.length - 1)">></span>
    </span>
    <span class="w-btnRefresh w-btnGreen w-right">  
      <i class="icon-refresh"></i> 
    </span>
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in list" :key="item.path">{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb> -->
  </div>
</template>

<script>
export default {
  computed: {
    list() {
      let result = [];
      // console.log(this.$route);
      for (var index = 0; index < this.$route.matched.length; index++) {//根据路由获取
        var item = this.$route.matched[index];
        result.push({
          title: item.meta.title,
          path: item.path,
        });
      }

      return result;
    }
  }
}
</script>
