import Template from '@src/views/layout/template';
import infoManage from './infoManage';
module.exports = {
  path: '/file',
  component: Template,
  meta: {
    title: '首页'
  },
  children: [
    {
      path: 'infoManage',
      name: 'file_infoManage',
      component: infoManage,
      meta: {
        title: '首页',
        id: 1000011
      },
    },
    
  ]
}
