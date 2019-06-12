
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import '@res/css/wstyle.less';
import '@res/css/shy.less';
export default {
  components: {
  },
  data(){
    return{
      isLoading: false,
    }
  },
  created() {
    this.listen();
  },
  methods: {
    //监听事件
    listen () {
      // EventVue.$on('loading', (loading) => {
      //   this.isLoading = loading;
      // })
    },
  }
}
</script>

