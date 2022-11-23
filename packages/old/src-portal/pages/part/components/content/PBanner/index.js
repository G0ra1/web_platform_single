
// 组件
export default {
  key: 'PBanner',
  tagName: 'p-banner',
  label: 'Banner',
  code: `<template>
    <img
    :src="result.imgSrc"
    @click="handle"
    style="width: 100%;cursor: pointer"
    />
  </template>
  <script>
  export default {
  props: {
    title: {
      type: String,
      default: '新闻'
    },
    request: {
      type: Object,
      default: () => ({
        url: '/portal/portalPart/list',
        method: 'post',
        data: {
          page: {
            size: 1
          }
        }
      })
    },
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records[0]
      })
    }
  },
  setup (props) {
    const router = $VueRouter.useRouter()
    const result = $Vue.ref({})
    $Request(props.request).then(res => {
      result.value = props.response.dataMethod(res)
    })
    return {
      result,
      title: props.title,
      handle () {
        alert(JSON.stringify(result.value))
        router.push(\`/detail?src=\${escape(result.value.url)}\`)
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
    // 默认数据源
    
    req = `{
      url: '/portal/portalContentBanners/list',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 1
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
  return `<p-banner
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: ({
      records
    }) => {
      const p = records[0] || {}
      return {
      imgSrc: p.imgUrl,
      url: p.contentUrl
    }}
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