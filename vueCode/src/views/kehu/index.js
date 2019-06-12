import Template from '@src/views/layout/template';

import infoManage from './infoManage';

module.exports = {
    path: '/kehu',
    component: Template,
    meta: {
        title: '客户管理'
    },
    children: [
        {
            path: 'infoManage',
            name: 'kehu_infoManage',
            component: infoManage,
            meta: {
                title: '客户信息管理'
            }
        }
        
    ]

}
