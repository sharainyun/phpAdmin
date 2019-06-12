import Template from '@src/views/layout/template';

import manage from './manage';
import myApproval from './myApproval';
module.exports = {
    path: '/sign',
    component: Template,
    meta: {
        title: '审批管理'
    },
    children: [
        {
            path: 'manage',
            name: 'sign_manage',
            component: manage,
            meta: {
                title: '审批管理'
            }
        },
        {
            path: 'myApproval',
            name: 'sign_myApproval',
            component: myApproval,
            meta: {
                title: '我的审批'
            }
        }
    ]

}
