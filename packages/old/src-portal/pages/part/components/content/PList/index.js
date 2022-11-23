// 组件
export default {
  key: "PList",
  tagName: "p-list",
  label: "列表",
  code: `<template>
  <n-card class="portal-panel-mode-list" :bordered="false" size="small" v-if="mode === 'list'">
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" :key="item.id" >
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
  <n-card class="portal-panel list-panel" :bordered="false" size="small" v-if="mode !== 'list'">
    <template #header-extra>
      <a href="javascript:void(0)" @click="handleMore" style="font-size:14px;color:#1277d1">
        <div style="width: 14px;height: 14px;border: 1px solid #01458E;border-radius: 50%;display: flex;justify-content: space-between;align-items: center;">
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
        </div>
      </a>
    </template>
    <template #header>
      {{title}}
    </template>
    <n-list class="portal-panel-list">
      <n-list-item v-for="item in result" :key="item.id" >
        <div class="portal-panel-list-header">
          <a @click="handle(item)" style="font-size:12px" class="portal-panel-list-title">{{item.name}}</a>
          <div class="portal-panel-list-date">{{timeFormat(item.date)}}</div>
        </div>
        <div class="portal-panel-list-content" v-if="isDetail">
        <img v-if="item.imgSrc" :src="item.imgSrc" style="float:left" width="100" height="60" />{{item.detail}}
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
    
    const listPageUrl = $Vue.ref('#/listPage')
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
      listPageUrl,
      page,
      pageSize,
      total,
      handleMore () {
        const path = props.request.data.partCode
        router.push({
          path
        })
      },
      result,
      title: props.title,
      mode:props.mode,
      isDetail: props.isDetail,
      handle (item) {
        window.open(item.url,'newwindow');
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
  .portal-layout-content .portal-panel.n-card.list-panel{
      height:302px;
      a{
        text-decoration: none
      }
    }
    .portal-layout-content .portal-panel.n-card > .n-card-header{
    }
    .portal-panel-mode-list{
      margin-left:416px;
      width: 1130px;
      height:100%;
      padding-bottom:50px;
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
          top:10px;
          color: #304BFF;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .n-list {
        .n-list-item{
          padding:20px;
          margin-bottom:12px;
          font-size:14px;
          height:86px;
          border-radius: 6px;
        }
      }
      
    }
    .portal-layout-content .portal-panel.n-card.list-panel > .n-card-header > .n-card-header__main{
      height: 14px;
      font-size: 14px;
      color: #01458E;
      border-left: 2px solid #01458e !important;
      line-height: 14px;
      
    }
    .n-list-item__main{
      width:100%;
    }
    .portal-layout-content .portal-panel.n-card > .n-card__content > .n-list > .n-list-item{
      margin-top: 3px !important;
    }
  </style>` //
};
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
export const instance = (d = { partName: "标题" }) => {
  let req;
  if (d.isDs) {
    // 使用数据源
    // req.url = d.portalPartDsDto.dsUrl
    // req.method = d.portalPartDsDto.dsReq ? 'post' : 'get'
    // req[req.method === 'get' ? 'params' : 'data'] = JSON.parse(d.portalPartDsDto.dsParamsVal)
    // 使用数据源
    req = `{
      url: '${d.portalPartDsDto.dsUrl}',
      method: '${d.portalPartDsDto.dsReq ? "post" : "get"}',
      ${d.portalPartDsDto.dsReq ? "data" : "params"}: ${d.portalPartDsDto.dsParamsVal
      }
    }`;
  } else {
    // 默认数据源

    req = `{
      url: '/portal/portalContentNews/list',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 5
        }
      }
    }`;
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
  return `<p-list
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.title,
      id: i,
      date: d.updateTime,
      url: d.contentUrl,
      author: d.createUserName,
      deptName:d.createUserParentDeptName
    }))
  }"
/>`;
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
};
