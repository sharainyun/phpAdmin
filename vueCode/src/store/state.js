import Cookies from 'js-cookie';
const state = {
    user: null,
    token:'',
    allRouter: [],//所有路由
    addRouter: [],   // 侧边栏路由
    submenuIndex: '',//头部菜单索引
    headerRouter: [], //头部路由
    menuList: null
}
export default state;