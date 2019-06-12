import Template from '@src/views/layout/template';
import manage from './manage';
import echart from './echart';
module.exports = {
  path: '/meeting',
  component: Template,
  meta: {
    title: '会议管理'
  },
  children: [
    {
      path: 'manage',
      name: 'meeting_manage',
      component: manage,
      meta: {
        title: '会议信息管理',
        id: 103011
      },
      
    }
  ]
}
