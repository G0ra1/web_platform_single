
// 组件
export default {
  key: 'PApp',
  label: '列表组件',
  code: `<template>
  <n-card class="portal-panel" :bordered="false" size="small">
    <template #header>
      {{title}}
    </template>
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" :key="item.id" >
        <a @click="handle(item)" class="portal-panel-list-title">{{item.name}}</a>
        <div class="portal-panel-list-date">{{item.date}}</div>
      </n-list-item>
    </n-list>
  </n-card>
  </template>
  <script>
  export default {
  props: {
    title: {
      type: String,
      default: '新闻'
    },
    number: {
      type: Number,
      default: 8
    },
    request: {
      type: Object,
      default: () => ({
        url: '/portal/portalPart/list',
        method: 'post',
        data: {
          page: {
            size: 8
          }
        }
      })
    },
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records
      })
    }
  },
  setup (props) {
    const router = $VueRouter.useRouter()
    const result = $Vue.ref([])
    $Request(props.request).then(res => {
      result.value = props.response.dataMethod(res)
    })
    return {
      result,
      title: props.title,
      handle (item) {
        router.push(\`/detail?src=\${escape(item.url)}\`)
      }
    }
  }
  }
  </script>
  <style lang="less">
  </style>` // 
}