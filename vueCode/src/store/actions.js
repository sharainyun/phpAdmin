import ajax from '@utils/config';
//这个action会被传入一个Object，这个Object里面可能有很多的方法和属性，而你只需要commit方法
const actions = {
    SETUSER({commit}, {user}){
        commit('SET_USER',user);
    },
    SETTOKEN({commit}, {token}){
        commit('SET_TOKEN',token);
    },
    ADDROUTER({commit}, {addRouter}){
        commit('ADD_ROUTER',addRouter);
    },
    SETMENUINDEX({commit}, {submenuIndex}){
        commit('SET_MENUINDEX',submenuIndex);
    },
    HEADERROUTER({commit}, {headerRouter}){
        commit('HEADER_ROUTER', headerRouter);
    },
    ALLROUTER({commit}, {allRouter}){
        commit('ALL_ROUTER',allRouter);
    },
    MenuList ({commit}) {
        return new Promise((resolve, reject) => {
            ajax({url: 'admin/menu/userMenu'}).fetch().then(response => {
                commit('Menu_List', response);
                resolve(response);
            })
        })
    }
}
export default actions;