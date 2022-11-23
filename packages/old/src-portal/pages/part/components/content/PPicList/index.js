
// 组件
export default {
  key: 'PPicList',
  tagName: 'p-pic-list',
  label: '图片列表',
  code: `<template>
  <n-card class="portal-panel-mode-pplist " :bordered="false" v-if="mode === 'list'" size="small">
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" class="portal-panel-pic-list-item" :key="item.id" >
        <div>
          <a
            :key="item.id"
            :title="item.name"
            @click="handle(item)"
          >
            <img
            :src="item.imgSrc"
            width="140"
            height="70"
            />
          </a>
        </div>
        <div style="flex: 1;padding-left:20px">
          <div class="portal-panel-list-header">
            <a @click="handle(item)" class="portal-panel-list-title">{{item.name}}</a>
            <div class="portal-panel-list-date">{{timeFormat(item.date)}}</div>
          </div>
          <div class="portal-panel-list-label">
            <span class="portal-panel-list-author">发布人：{{item.author}}</span>
            <span class="portal-panel-list-deptName">发布人部门：{{item.deptName}}</span>
            <span @click="handle(item)" class="look-over">点击查看</span>
          </div>
          <div class="portal-panel-list-content" v-if="isDetail">
          <img v-if="item.imgSrc" :src="item.imgSrc" style="float:left" width="100" height="60" />{{item.detail}}
          </div>
        </div>
      </n-list-item>
    </n-list>
    <n-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :item-count="total"
      show-size-picker
      :page-sizes="[10, 20, 30, 40]"
    />
  </n-card>
  <n-card class="portal-panel" :bordered="false" size="small" v-if="mode !== 'list'">
    <template #header-extra>
      <a href="javascript:void(0)" @click="handleMore" style="font-size:14px;color:#1277d1">查看更多</a>
    </template>
    <template #header>
      {{title}}
    </template>
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" class="portal-panel-pic-list-item" :key="item.id" >
        <div>
          <a
            :key="item.id"
            :title="item.name"
            @click="handle(item)"
          >
            <img
            :src="item.imgSrc"
            width="140"
            height="70"
            />
          </a>
        </div>
        <div style="flex: 1;padding-left:20px">
          <div class="portal-panel-list-header">
            <a @click="handle(item)" class="portal-panel-list-title">{{item.name}}</a>
            <div class="portal-panel-list-date">{{timeFormat(item.date)}}</div>
          </div>
          <div class="portal-panel-list-label">
            <span class="portal-panel-list-author">发布人：{{item.author}}</span>
            <span class="portal-panel-list-deptName">发布人部门：{{item.deptName}}</span>
          </div>
          <div class="portal-panel-list-content" v-if="isDetail">
          <img v-if="item.imgSrc" :src="item.imgSrc" style="float:left" width="100" height="60" />{{item.detail}}
          </div>
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
    isDetail: {
      type: Boolean,
      default: false
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
    const router = $VueRouter.useRouter()
    const result = $Vue.ref([])
    if(props.mode == "list"){
      props.request.data.page.size = 10
    }
    $Request(props.request).then(res => {
      result.value = props.response.dataMethod(res)
      total.value = res.total
      page.value = res.page
    })
    const page = $Vue.ref(1)
    const total = $Vue.ref(10)
    const pageSize = $Vue.ref(10)
    $Vue.watch(page,(v)=>{
      if(!v) return
      props.request.data.page.current = v
      $Request(props.request).then(res => {
        result.value = props.response.dataMethod(res)
        console.log(res)
        total.value = res.total
        page.value = res.page
      })
    })
    $Vue.watch(pageSize,(v)=>{
      if(!v) return
      props.request.data.page.size = v
      $Request(props.request).then(res => {
        result.value = props.response.dataMethod(res)
        console.log(res)
        total.value = res.total
        page.value = res.page
      })
    })
    return {
      handleMore () {
        router.push({
          path: '/tupianxinwen',
        })
        // query: {
        //   title: props.title,
        //   url: props.request.url,
        //   params: escape(JSON.stringify(props.request.data)),
        //   datamethod: escape(props.response.dataMethod.toString()),
        // }
      },
      result,
      page,
      pageSize,
      total,
      mode:props.mode,
      page,
      title: props.title,
      isDetail: props.isDetail,
      handle (item) {
        window.open(item.url,'newwindow');
        // router.push(\`/detail?src=\${escape(item.url)}\`)
        // router.push({
        //   path: '/detail',
        //   query: {
        //     src: escape(item.url),
        //     params: escape(JSON.stringify({
        //       title: item.name,
        //       author: item.author,
        //       date: item.date
        //     }))
        //   }
        // })
      },
      timeFormat (time) {
        const t = new Date(time)
        return \`\${t.getFullYear()}-\${t.getMonth() + 1}-\${t.getDate()}\`
      }
    }
  }
  }
  </script>
  <style lang="less">
    .portal-panel-pic-list-item{
      .n-list-item__main{
        display: flex;
        align-items: center;
      }
    }
    .portal-layout-content .portal-panel.n-card > .n-card__content > .n-list > .n-list-item.portal-panel-pic-list-item{
      margin-top:8px;
    }
    .portal-panel-mode-pplist{
      margin-left:416px;
      width: 1130px;
      height:100%;
      
      box-sizing: border-box;
      padding: 20px;
      background: #FFFFFF;
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      position:relative;
      padding-bottom:50px;
      .n-card__content{
        height: 100%;
        overflow-y: auto;
      }
      .n-pagination{
        position: absolute;
        bottom: 10px;
      }
      .portal-panel-list-label{
        position: relative;
        .look-over{
          position: absolute;
          right:0;
          top:15px;
          color: #304BFF;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .n-list {
        .n-list-item{
          padding:20px;
          margin-bottom:12px;
          height:132px;
          font-size:14px;
          border-radius: 6px;
          img{
            width:168px;
            height:84px;
          }
        }
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
      url: '/portal/portalContentPicnews/list',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 3
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
  return `<p-pic-list
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.title,
      id: i,
      date: d.updateTime,
      url: d.contentUrl,
      imgSrc: d.imgUrl,
      author: d.createUserName,
      deptName:d.createUserParentDeptName
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