
// 组件
export default {
  key: 'PTile',
  tagName: 'p-tile',
  label: '系统集成',
  code: `<template>
  <n-card class="portal-panel" :bordered="false" size="small" v-if="mode !== 'carousel'">
      <template #header>
        {{title}}
      </template>
      <n-grid style="padding: 10px 0; " :x-gap="30" :y-gap="18" :cols="6" >
        <n-gi  v-for="item in result" :key="item.id" style="width: 80px;" >
          <nw-tile
            :badge-count="item.__Count"
            :showzero="!!item.countUrl"
            :icon="item.icon"
            :image-src="item.imgSrc"
            :size="size"
            :label="item.name"
            :is-hover-shadow="true"
            @click="handle(item)"
          />
        </n-gi>
      </n-grid>
    </n-card>


    <n-card class="portal-panel portal-panel-ptitle" :bordered="false" size="small" v-if="mode === 'carousel'">
      <n-carousel show-arrow>
        <n-grid style="padding: 10px 0; " v-for="item1 in result" :x-gap="18" :y-gap="18" :cols="3" >
          <n-gi style="padding: 5px 0; "  v-for="item in item1" :key="item.id" >
            <nw-tile
              :badge-count="item.__Count"
              :showzero="!!item.countUrl"
              :icon="item.icon"
              :image-src="item.imgSrc"
              :size="size"
              :label="item.name"
              :is-hover-shadow="true"
              style="color:#fff"
              @click="handle(item)"
            />
          </n-gi>
        </n-grid>
      </n-carousel>
    </n-card>
  </template>
  <script>
  export default {
  props: {
    title: {
      type: String,
      default: '应用入口'
    },
    size: {
      type: Number,
      default: 36
    },
    mode:{
      type:String,
      default:''
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
    const loadCount = (url, id) => {
      if(!url) return
      const token = $Cookies.get("token");
      const tokenType = $Cookies.get("tokenType");
      fetch(
        url,
        {
          method: 'get',
          headers: new Headers({
            Authorization: \`\${tokenType} \${token}\`
          }),
        }
      ).then(function (response) {
        return response.json()
      }).then(res => {
        result.value[id]['__Count'] = res.data.taskCount
      })
    }
    const router = $VueRouter.useRouter()
    const result = $Vue.ref([])
    const arrTransfer = (baseArray)=>{
      let len = baseArray.length
      let n = 9
      let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
      let res = []
      for (let i = 0; i < lineNum; i++) {
        let temp = baseArray.slice(i*n, i*n+n)
        res.push(temp)
      }
      return res
    }
    $Request(props.request).then(res => {
      if(props.mode !== 'carousel' ){
        result.value = props.response.dataMethod(res)
        result.value.forEach(d => {
          loadCount(d.countUrl, d.id)
        })
      }else{
        result.value =  arrTransfer(props.response.dataMethod(res))
        props.response.dataMethod(res).forEach(d => {
          loadCount(d.countUrl, d.id)
        })
      }
      
    })
    const timer = $Vue.ref(0);
    timer.value = setInterval(() => {
      if(window.sessionStorage.getItem('isTasksCount')==1){
        $Request(props.request).then(res => {
          if(props.mode !== 'carousel' ){
            result.value = props.response.dataMethod(res)
            result.value.forEach(d => {
              loadCount(d.countUrl, d.id)
            })
          }else{
            result.value =  arrTransfer(props.response.dataMethod(res))
            props.response.dataMethod(res).forEach(d => {
              loadCount(d.countUrl, d.id)
            })
          }
        })
        window.sessionStorage.setItem('isTasksCount', 0);
      }
    }, 1000);
    return {
      timer,
      result,
      title: props.title,
      isDetail: props.isDetail,
      handle (item) {
        const token = $Cookies.get("token");
        const tokenType = $Cookies.get("tokenType");
        const url = item.isHaveToken == 1?\`\${item.url}&token=\${tokenType} \${token}\` : item.url
        window.open(\`\${url}\`)
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
  .portal-layout-content .portal-panel.n-card.portal-panel-ptitle{
      padding:0;
      padding-top:10px;
      background:#665E57;
      .n-carousel.n-carousel--bottom .n-carousel__arrow-group{
        bottom:10px !important;
      }
      .n-carousel.n-carousel--bottom .n-carousel__arrow-group > *:first-child{
        margin-right:146px;
      }
      .n-carousel.n-carousel--show-arrow.n-carousel--bottom .n-carousel__dots{
        width: 100%;
        bottom:10px !important;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
      }
    }
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
      url: '/portal/portalContentSysjoints/listForShow',
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
  return `<p-tile
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.sysName,
      id: i,
      date: d.updateTime,
      url: d.sysUrl,
      imgSrc: d.sysImgUrl,
      icon: d.icon,
      countUrl: d.taskCountUrl,
      isHaveToken:d.isHaveToken
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