import Template from '@src/views/layout/template';

import index from './index';
module.exports = {
    path: '/index',
    component: Template,
    meta: {
        title: '首页'
    },
    children: [
        {
            path: 'index',
            name: 'index',
            component: index,
            meta: {
                title: ''
            }
        }
    ]

}
