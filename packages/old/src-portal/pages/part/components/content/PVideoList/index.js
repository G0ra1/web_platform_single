// 组件
export default {
  key: "PVideoList",
  tagName: "p-video-list",
  label: "视频",
  code: `<template>
  <n-card class="part-video portal-panel-mode-pvlist" :bordered="false" v-if="mode === 'list'" size="small">
      <n-list class="portal-panel-list">
        <n-list-item v-for="item in result" class="portal-panel-pic-list-item" :key="item.id" >
          <div>
            <div
            :key="item.id"
            class="part-video-thumb"
            :style="\`background: url(\${item.imgSrc || ''}) center center no-repeat;background-color: #333\`"
            >
              <p class="">{{item.name}}</p>
              <nw-icon
                name="icon-yunxing"
                :size="60"
                color="#ffffff70"
                style="cursor:pointer"
                @click="handlePlay(item)"
              >播放</nw-icon>
            </div>
          </div>
          <div style="flex: 1;padding-left:20px">
            <div class="portal-panel-list-header">
              <a @click="handlePlay(item)" class="portal-panel-list-title">{{item.name}}</a>
              <div class="portal-panel-list-date">{{timeFormat(item.date)}}</div>
            </div>
            <div class="portal-panel-list-label">
              <span class="portal-panel-list-author">发布人：{{item.author}}</span>
              <span class="portal-panel-list-deptName">发布人部门：{{item.deptName}}</span>
              <span @click="handlePlay(item)" class="look-over">点击查看</span>
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
      <!---->
    </n-card>
    <n-card class="portal-panel part-video" :bordered="false" size="small" v-if="mode !== 'list'">
      <template #header-extra>
        <a href="javascript:void(0)" @click="handleMore" style="font-size:14px;color:#1277d1">查看更多</a>
      </template>
      <template #header>
        {{title}}
      </template>
      <n-list class="portal-panel-list">
        <n-list-item v-for="item in result" class="portal-panel-pic-list-item" :key="item.id" >
          <div>
            <div
            :key="item.id"
            class="part-video-thumb"
            :style="\`background: url(\${item.imgSrc || ''}) center center no-repeat;background-color: #333\`"
            >
              <p class="">{{item.name}}</p>
              <nw-icon
                name="icon-yunxing"
                :size="60"
                color="#ffffff70"
                style="cursor:pointer"
                @click="handlePlay(item)"
              >播放</nw-icon>
            </div>
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
      <!---->
    </n-card>
    <n-modal v-model:show="isShowVideo">
        <video :src="playUrl" autoplay controls="controls" style="width: 80%;height: 600px" >
    </video>
    </n-modal>
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
            size: 5
          }
        }
      })
    },
    response: {
      type: Object,
      default: () => ({
        dataMethod: res => res.records
      })
    },
    mode:{
      type:String,
      default:''
    },
  },
  setup (props) {
    const playUrl = $Vue.ref('')
    const isShowVideo = $Vue.ref(false)
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
          path: '/shipinxinwen',
        })
      },
      result,
      page,
      pageSize,
      total,
      title: props.title,
      playUrl,
      page,
      isShowVideo,
      mode:props.mode,
      handlePlay (item) {
        playUrl.value = item.url
        isShowVideo.value = true
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
    margin-top:12px;
  }
  .part-video {
    &-thumb {
      position: relative;
      display: flex;
      width: 140px;
      height: 70px;
      background: red;
      justify-content: center;
      align-items: center;
      > p {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        background: #00000080;
        margin: 0;
        color: #fff;
        text-indent: 10px;
      }
    }
  }
  .portal-panel-mode-pvlist{
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
        .part-video-thumb{
          width:168px;
          height:84px;
        }
      }
    }
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
    console.log("==portalPartDsDto==", d.portalPartDsDto);
    // req.url = d.portalPartDsDto.dsUrl
    // req.method = d.portalPartDsDto.dsReq ? 'post' : 'get'
    // req[req.method === 'get' ? 'params' : 'data'] = JSON.parse(d.portalPartDsDto.dsParamsVal)
    // 使用数据源
    req = `{
      url: '${d.portalPartDsDto.dsUrl}',
      method: '${d.portalPartDsDto.dsReq ? "post" : "get"}',
      ${d.portalPartDsDto.dsReq ? "data" : "params"}: ${
      d.portalPartDsDto.dsParamsVal
    }
    }`;
  } else {
    // 默认数据源

    req = `{
      url: '/portal/portalContentVideos/listForShow',
      method: 'post',
      data: {
        portalId: '${d.portalId}',
        partCode: '${d.partCode}',
        page: {
          size: 5
        }
      }
    }`;
  }
  return `<p-video-list
  title="${d.partName}"
  :request="${req}"
  :response="{
    dataMethod: res => res.records.map((d, i) => ({
      name: d.title,
      id: i,
      date: d.createTime,
      url: d.contentUrl,
      imgSrc: d.imgUrl,
      author: d.createUserName,
      deptName:d.createUserParentDeptName
    }))
  }"
/>`;
};
