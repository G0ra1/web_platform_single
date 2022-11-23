
// 组件
export default {
  key: 'PFileList',
  tagName: 'p-file-list',
  label: '文件下载',
  code: `<template>
  <n-card class="portal-panel" :bordered="false" size="small">
    <template #header>
      {{title}}
    </template>
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" :key="item.id" >
        <div class="portal-panel-list-header">
          <a :href="item.url" :download="item.name" class="portal-panel-list-title">{{item.name}}</a>
          <div class="portal-panel-list-date">{{timeFormat(item.date)}}</div>
        </div>
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
      isDetail: props.isDetail,
      handle (item) {
        router.push(\`/detail?src=\${escape(item.url)}\`)
      },
      timeFormat (time) {
        const t = new Date(time)
        return \`\${t.getMonth() + 1}-\${t.getDate()}\`
      }
    }
  }
  }
  </script>
  <style lang="less">
  </style>` // 
}
// {
//   partName,
//   url = '/portal/portalContentNews/list',
//   method = 'post',
//   data = `{
//     page: {
//       size: 8
//     }
//   }`,
// }
export const instance = (d = { partName: '标题' }) => {

  let req
  if (d.isDs) {
    // 使用数据源
    // req.url = d.portalPartDsDto.dsUrl
    // req.method = d.portalPartDsDto.dsReq ? 'post' : 'get'
    // req[req.method === 'get' ? 'params' : 'data'] = JSON.parse(d.portalPartDsDto.dsParamsVal)
    // 使用数据源
    req = `{
      url: '${d.portalPartDsDto.dsUrl}',
      method: '${d.portalPartDsDto.dsReq ? 'post' : 'get'}',
      ${d.portalPartDsDto.dsReq ? 'data' : 'params'}: ${d.portalPartDsDto.dsParamsVal}
    }`
  } else {  
    // 默认数据源/portalContentFiles/list
    
    req = `{
      url: '/portal/portalContentFiles/listForShow',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 10
        }
      }
    }`
    // req.url = '/portal/portalContentPictures/list'
    // req.method = 'post'
    // req.data = {
    //   partCode: d.partCode,
    //   page: {
    //     size: 10
    //   }
    // }
  }
  // :request="${JSON.stringify(req).replace(/\"/g, '\'')}"
  return `<p-file-list
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.fileName,
      id: i,
      date: d.updateTime,
      url: d.fileUrl,
    }))
  }"
/>`
// return `<PList
// title="${d.partName}"
// :request="{
//   url: '/portal/portalContentNews/list',
//   method: 'post',
//   data: {
//     partCode: '${d.partCode}',
//     page: {
//       size: 10
//     }
//   }
// }"
// :response="{
//   dataMethod: res => res.records.map((d, i) => ({
//     name: d.title,
//     id: i,
//     date: d.updateTime,
//     url: d.contentUrl,
//   }))
// }"
// />`
}