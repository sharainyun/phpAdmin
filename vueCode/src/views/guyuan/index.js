import Template from '@src/views/layout/template';

import manage from './manage';
module.exports = {
    path: '/guyuan',
    component: Template,
    meta: {
        title: '雇员管理'
    },
    children: [
        {
            path: 'manage',
            name: 'manage',
            component: manage,
            meta: {
                title: '雇员信息管理'
            }
        }
    ]

}
