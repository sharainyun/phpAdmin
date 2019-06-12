<template>
 
  <div>
   <div class="contentBody">
    <left-nav></left-nav>
    <div class="mainContent">
      <header-nav></header-nav>
      <div class="w-main">
        <top-nav></top-nav>
        <router-view></router-view>
      </div>
    </div>
   </div>
  </div>
</template>
<script>
import headerNav from './header.vue';
import leftNav from './leftNav.vue';
import topNav from './topNav.vue';
import { mapGetters } from 'vuex';
  export default {
  components: {
    headerNav,
    leftNav,
    topNav
  },
  computed: {
  },
  data(){
    return{
    }
  },
  created() {
  },
  methods: {
  }
}
</script>