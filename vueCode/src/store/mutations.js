const mutations = {
    SET_USER: (state, user)=>{
        state.user = user;
    },
    SET_TOKEN: (state, token)=>{
        state.token = token;
    },
    ADD_ROUTER: (state, addRouter) =>{
        state.addRouter = addRouter;
    },
    SET_MENUINDEX: (state, submenuIndex) =>{
        state.submenuIndex = submenuIndex;
    },
    HEADER_ROUTER: (state,headerRouter) =>{
        state.headerRouter = headerRouter;
    },
    Menu_List:(state, menuList) =>{
        state.menuList = menuList;
    },
    ALL_ROUTER: (state, allRouter) =>{
        state.allRouter = allRouter;
    },
}
export default mutations;