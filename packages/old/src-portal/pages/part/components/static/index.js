import PTask from './PTask/index.vue'
import PTaskDetail from './PTaskDetail/index.vue'
import PSapp from './PSapp/index.vue'
import PNotice from './PNotice/index.vue'
import PNews from './PNews/index.vue'
import PProcessing from './PProcessing/index.vue'
import PSchedule from './PSchedule/index.vue'
import PWidget from './PWidget/index.vue'
import PLlTodo from './PLlTodo/index.vue'






export default {
  install(app) {
    app.component('PTask', PTask)
    app.component('PTaskDetail', PTaskDetail)
    app.component('PSapp', PSapp)
    app.component('PNotice', PNotice)
    app.component('PNews', PNews)
    app.component('PProcessing', PProcessing)
    app.component('PSchedule', PSchedule)
    app.component('PWidget', PWidget)
    app.component('PLlTodo', PLlTodo)
  }
}

export const useComponents = [
  {
    key: 'PTask',
    label: '任务',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-task moreUrl=\'/taskDetail\' />'
  },
  {
    key: 'PTaskDetail',
    label: '任务详情',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-task-detail />'
  },
  {
    key: 'PSapp',
    label: '系统应用',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-sapp />'
  },
  {
    key: 'PNotice',
    label: '通知公告',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-notice />'
  },
  {
    key: 'PNews',
    label: '新闻列表',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-news />'
  },
  {
    key: 'PProcessing',
    label: '流程中心',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-processing />'
  },
  {
    key: 'PSchedule',
    label: '日程',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-schedule />'
  },
  {
    key: 'PWidget',
    label: '微件',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-widget />',
    getCode: () => `<p-widget code='${new Date().getTime()}' />`
  },
  {
    key: 'PLlTodo',
    label: '蓝凌待办中心',
    icon: 'component-partCodes',
    color: '#ffeb3b',
    code: '<p-ll-todo />',
    getCode: () => `<p-ll-todo />`
  }

]