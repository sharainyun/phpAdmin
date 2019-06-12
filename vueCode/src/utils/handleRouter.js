import Cookies from 'js-cookie';
import store from '@src/store';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
export default function handleRouter(index, isLogin) {
    return new Promise(resolve => {
        let allRouter = store.getters.allRouter;
        Cookies.set('submenuIndex', index);
        let headerRouter = [];
        let addRouter = allRouter[index].children;
        // 侧边栏路由
        store.dispatch('ADDROUTER', {
            addRouter
        });
        //头部路由索引
        store.dispatch('SETMENUINDEX', {
            index
        });
        
        
        let obj = [];
        allRouter.forEach((item, index) => {
            let list = {
                resourceUrl: '',
                resourceName: item.label
            }
            if (item.children.length != 0) {
                if(item.children[0].children.length != 0){
                    list.resourceUrl = item.children[0].children[0].path;
                    obj.push(list);
                } else {
                    list.resourceUrl = item.children[0].path;
                    obj.push(list);
                }
            } else {
                list.resourceUrl = item.path;
                obj.push(list);
            }
        })
        headerRouter = obj;
        // 头路由
        store.dispatch('HEADERROUTER', {
            headerRouter
        });


        resolve();
    });
};