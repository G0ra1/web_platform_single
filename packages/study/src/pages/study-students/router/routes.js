import Layout from '../layout/index.vue'
const routes = [
    {
      path: '/',
      name:'homePage',
      component: Layout,
      children: [
        {
          path: '/homePage',
          name:'homePage',
          component: () => import('../pages/homePage.vue'),
        },
        {
          path: '/newsDetail',
          name:'newsDetail',
          component: () => import('../pages/newsDetail.vue'),
        },
        {
          path: '/allNews',
          name:'allNews',
          component: () => import('../pages/allNews.vue'),
        },
        {
          path: '/videoDetail',
          name:'videoDetail',
          component: () => import('../pages/videoDetail.vue'),
        },
        {
          path: '/personalCenter',
          name:'personalCenter',
          component: () => import('../pages/personalCenter.vue'),
        },
        {
          path: '/class',
          name:'class',
          component: () => import('../pages/class.vue'),
        },
        {
          path: '/special',
          name:'special',
          component: () => import('../pages/special.vue'),
        },
        {
          path: '/mySpecial',
          name:'mySpecial',
          component: () => import('../pages/mySpecial.vue'), 
        },
        {
          path: '/specialDetail',
          name:'specialDetail',
          component: () => import('../pages/specialDetail.vue'),
        },
        {
          path: '/specialVideoDetail',
          name:'specialVideoDetail',
          component: () => import('../pages/specialVideoDetail.vue'),
        },
        {
          path: '/examPaper',
          name:'examPaper',
          component: () => import('../pages/examPaper.vue'), 
        },
        {
          path: '/practiceTests',
          name:'practiceTests',
          component: () => import('../pages/practiceTests.vue'), 
        },
        {
          path: '/examPaperDetail',
          name:'examPaperDetail',
          component: () => import('../pages/personalCenterComponent/examPaperDetail.vue'),
        },
      ]
    }
  ]
export default routes