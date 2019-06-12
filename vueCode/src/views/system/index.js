import Template from '@src/views/layout/template';

import manage from './manage';
module.exports = {
    path: '/system',
    component: Template,
    meta: {
        title: '系统管理'
    },
    children: [
        {
            path: 'manage',
            name: 'system_manage',
            component: manage,
            meta: {
                title: '用户管理'
            }
        }
    ]

}
