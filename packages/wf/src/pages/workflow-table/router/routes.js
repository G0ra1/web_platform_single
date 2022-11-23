import Layout from '../layout/index.vue'
const routes = [
  {
    path: '/todo',
    component: () => import('../pages/todo.vue'),
  },
  {
    path: '/draft',
    component: () => import('../pages/draft.vue'),
  },

  {
    path: '/havedone',
    component: () => import('../pages/havedone.vue'),
  },
  // {
  //   path: 'forwarded',
  //   component: () => import('../pages/forwarded.vue'),
  // },
  // {
  //   path: 'delegationTask',
  //   component: () => import('../pages/delegationTask.vue'),
  // },
  {
    path: '/induplicate',
    component: () => import('../pages/induplicate.vue'),
  },
  {
    path: '/outduplicate',
    component: () => import('../pages/outduplicate.vue'),
  },
  {
    path: '/receive-notify',
    component: () => import('../pages/receive-notify.vue'),
  },
  {
    path: '/send-notify',
    component: () => import('../pages/send-notify.vue'),
  }
  // {
  //   path: 'wfmydrafttask',
  //   component: () => import('../pages/wfmydrafttask.vue'),
  // },
]
export default routes