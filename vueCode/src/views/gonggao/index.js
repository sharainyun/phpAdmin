import Template from '@src/views/layout/template';

import gonggao from './gonggao';
module.exports = {
    path: '/gonggao',
    component: Template,
    meta: {
        title: '公告管理'
    },
    children: [
        {
            path: 'gonggao',
            name: 'gonggao',
            component: gonggao,
            meta: {
                title: '公告管理'
            }
        }
    ]

}
