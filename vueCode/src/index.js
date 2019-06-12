import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filters from './filters/index.js'  
  
Object.keys(filters).forEach(key => {  
    Vue.filter(key, filters[key])  
})
import store from '@src/store';
import App from './index.vue';
// 水波纹指令
import vueWaves from '@src/directive/waves';
// import main from './main.vue';
import login from '@views/login/login.vue';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import guyuan from '@views/guyuan';
import kehu from '@views/kehu';
import file from '@views/file';
import main from '@views/index';
import sign from '@views/sign';
import meeting from '@views/meeting';
import system from '@views/system';
import gonggao from '@views/gonggao';
import Cookies from 'js-cookie';
import ajax from '@utils/config';
import handleRouter from '@src/utils/handleRouter';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(vueWaves);

const defaultRoute = { 
  path: '/',
  component: App,
  meta: {
    id: '100000',
  },
  children:[
    gonggao,guyuan,kehu,file,sign,meeting,system,main
  ]
};
const routes = [
  {
    path: '/login',
    name: '登录',
    hidden: true,
    component: login
  },
  {
    path: '/', redirect: '/login'
  },
  defaultRoute,
];

export default routes;
Vue.filter('statusFilter',function(value){  
  var statusInfo = '';
  if(value=='0') statusInfo = '成功';
  if(value=='1') statusInfo = '失败';
  if(value=='2') statusInfo = '未审核'; 
  return statusInfo;
})
Vue.filter('statusColorFilter',function(value){  
  var statusInfo = '';
  if(value=='0') statusInfo = 'w-btnGreen';
  if(value=='1') statusInfo = 'w-btnWarning';
  if(value=='2') statusInfo = 'w-btnGray'; 
  return statusInfo;
})
 

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

let toHome = false;
//全局钩子作用于所有路由，里面的参数to表示即将要进入的路由对象，from表示即将要离开的路由对象 路由进入之前
router.beforeEach((to, from, next) => {
    // 开启Progress
    NProgress.start();
    //重定向到login时
    if (from.path === '/' && to.path === '/login') {
        if (store.getters.token && !store.getters.user) {
            toHome = true;
        }

    }
    //登录且有用户信息
    if (store.getters.token) {
        if (!to.name) {
            // 404
            console.log(11112);
        }
        if (to.path === '/login') {
            console.log(11111);
            next({path: store.getters.headerRouter[0].resourceUrl});
            
        } else {
            // headerSelected(to, vm);
            // detailLink(to);
            console.log(11113);
            next();
        }
    } else if (!store.getters.token&&Cookies.get('token')) {
        // 登录且没有用户信息
        // store.dispatch('MenuList').then(response => {
        //   store.dispatch('ALLROUTER', { allRouter: response});
        //   handleRouter(Cookies.get('submenuIndex'),true);
        // })
        console.log(11114);
        next();
    } else if (to.path === '/login') {
        console.log(11115);
        // 未登录
        next();
    } else {
        next('/login');
        console.log(11116);
    }
    NProgress.done();
});
//路由进入之后
router.afterEach((to, from) => {
    NProgress.done(); // 结束Progress
});
new Vue({
  el: '#app',
  store,
  router,
  template: '<App />',
  components: { App },
  mounted() {
  	
  }
});
