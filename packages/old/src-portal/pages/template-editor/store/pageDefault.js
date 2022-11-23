// 门户框架代码
export const layout = `<template>
<n-layout class='portal-layout'>
  <div class='portal-layout-header-menu' v-if="menuActive!='index' && menuActive.indexOf('detail')==-1">
    <div class='portal-layout-header-menu-nav'>
      <div v-for='item in menuList' :key='item.key' :class="{
          'portal-layout-header-menu-nav-item': true,
          'active': menuActive === item.key
      }" @click='handleMenu(item.key)'>
        {{item.label}}
      </div>
    </div>
  </div>
  <n-layout-content :class="{'portal-layout-content':true,'portal-layout-content-noIndex':menuActive!='index'}">
    <router-view></router-view>
  </n-layout-content>
  <n-layout-footer class='portal-layout-footer'>
  </n-layout-footer>
</n-layout>
</template>
<script>
export default {
setup () {
const router = $VueRouter.useRouter()
const route = $VueRouter.useRoute()
const [ , menuKey = 'index'] = route.fullPath.split('/')
console.log('route===', route.fullPath.split('/'))
const menuActive = $Vue.ref(menuKey)
$Vue.watch(route, () => {
menuActive.value = route.fullPath.split('/')[1]
})
return {
menuList: [
  {
      label: '返回首页',
      key: 'index',   
  },
  {
      label: '通知公告',
      key: 'tongzhigonggao',   
  },
  // {
  //     label: '重要新闻',
  //     key: 'zhongyaoxinwen',   
  // },
  {
      label: '图片新闻',
      key: 'tupianxinwen',   
  },
  {
      label: '视频新闻1',
      key: 'shipinxinwen',   
  },
  // {
  //     label: '今日新闻',
  //     key: 'jinrixinwen',   
  // },
  // {
  //     label: '公司新闻',
  //     key: 'gongsixinwen',   
  // },
  // {
  //     label: '综合资讯',
  //     key: 'zonghezixun',   
  // },
  // {
  //     label: '基层新闻',
  //     key: 'jicengxinwen',   
  // },
  // {
  //     label: '热点新闻',
  //     key: 'redianxinwen',   
  // },
  // {
  //     label: 'OA新闻',
  //     key: 'oaxinwen',   
  // },
],
menuActive,
handleMenu (key) {
  menuActive.value = key
  router.push(key)
}
}
}
}
</script>
<style lang="less">
.portal-layout {
  &-header {

    // /assets/image/banner.png
    &-banner {}

    .n-tab-pane {
      display: none;
    }

    &-menu {
      background: #f7f7f4;
      border-bottom: 1px solid #ccc;
      position: fixed;
      top: 96px;
      left: 243px;
      z-index: 999;

      &-nav {
        position: relative;
        bottom: -5px;
        margin: 0 auto;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        padding-bottom: 20px;
        background: #FFFFFF;
        border-top: 20px solid #fff;

        &-item {
          width: 169px;
          line-height: 48px;
          height: 48px;
          padding: 4px 0;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          position: relative;
          text-align: center;

          &:first-child {
            position: fixed;
            top: 24px;
            left: 243px;
            z-index: 999;
            border-radius: 6px;
            background: #FFFFFF;
          }

          &:hover {
            color: rgba(48, 75, 255, 1);
          }

          &.active {
            color: rgba(48, 75, 255, 1);
            background: rgba(61, 106, 255, 0.2);
          }

          &:hover:before,
          &.active:before {
            content: '';
            height: 14px;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto 0;
            border-left: 2px solid #304BFF;
          }

          &:last-child:before {}
        }
      }
    }
  }

  &-content {
    background: #f8f8f8;
    height: calc(~'100vh');
    min-width: 1000px;
  
    // 栏目样式
    .hover-shadow {
      transition: all 0.5s;

    }

    .hover-shadow:hover {
      box-shadow: 10px 10px 20px rgba(153, 153, 153, 0.5);
    }

    .portal-panel {
      height: 100%;

      &.n-card {
        background: #fff;
        border-radius: 6px;
        padding: 20px;

        >.n-card-header {
          border-bottom: 1px solid #e8e5db;
          background: #fff;

          >.n-card-header__main {
            border-left: 4px solid var(--title-text-color);
            padding-left: 8px;
            font-weight: 400;
          }
        }

        >.n-card__content {
          >.n-list {
            margin: 0;
            background:#fff;
            >.n-list-item {
              padding: 2px;
              margin-top: 10px;
              background: #fff;
            }
          }
        }
      }

      &-list {
        .n-list-item:not(:last-child) {
          // border-bottom: 1px solid #f1f0eb
        }

        .n-list-item {
          background: #fbfbfa;

          .n-list-item__main {}
        }

        &-header {
          display: flex;
          justify-content: space-between;
        }

        &-title {
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: calc(~"100% - 100px");
        }

        &-date {
          color: #666;
          font-size: 10px;
        }

        &-author {
          color: #999;
          font-size: 10px;
        }

        &-deptName {
          color: #999;
          font-size: 10px;
          margin-left: 20px
        }
      }
    }

    // 轮播
    .carousel-img {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      object-fit: cover;
    }
  }
  &-content-noIndex{
    height: calc(~'100vh - 2px');
  }

  &-footer {
    color: red
  }
}
</style>
`;
// 门户首页代码
export const index = `<template>
<n-grid x-gap="12" :cols="24">
  <n-gi span="24" :style="{
    height: 'auto'
  }">
    <!-- 栏目可粘贴到这里 -->
  </n-gi>
</n-grid>
</template>
<script>
export default {
setup () {
  /*--begin---*/
  
  /*--end--*/ 
  return {
  }
}
}
</script>
<style lang="less">
h1 {}
</style>`;

// 内容详情页
export const detailPage = `<template>
<div style="width:1200px;margin:0 auto">
  <h2 style="text-align: center; margin: 0">{{title}}</h2>
  <p style="text-align: right; margin: 0; padding: 0 30px">作者: {{author}} 发布时间：{{date}}</p>
  <iframe ref="iframe" :src="src" class="portal-detail-frame"></iframe>
</div>
</template>
<script>
export default {
setup () {
const src = $Vue.ref('')
const iframe = $Vue.ref(null)
const route = $VueRouter.useRoute()
const initIframeHeight = () => {
  
  let realHeight = document.documentElement.clientHeight-113;
  iframe.value.style.height = \`\${realHeight}px\`;
  const userAgent = navigator.userAgent;
  console.log('iframe.value===', iframe.value.contentWindow)
  const subdoc = iframe.value.contentDocument || iframe.value.contentWindow.document;
  const subbody = subdoc.body;
  console.log('===frameframe==subdoc=', subdoc)
  if(userAgent.indexOf("Chrome") > -1){
    realHeight = subdoc.documentElement.scrollHeight;
  } else{
    realHeight = subbody.scrollHeight;
  }
  iframe.value.style.height = \`\${realHeight}px\`;
}
$Vue.nextTick().then(() => {
  console.log('===frameframe===', iframe)
  // initIframeHeight()
  iframe.value.onload = () => {
    initIframeHeight()
  }
})
const params = JSON.parse(unescape(route.query.params))
return {
  src: unescape(route.query.src),
  title: params.title,
  date: params.date,
  author: params.author,
  iframe,
  initIframeHeight
}
}
}
</script>
<style lang="less">
.portal-detail-frame {
  border: none;
  width: 100%;
  height: 100%;
}
</style>`;

// 列表页
export const listPage = `<template>
  <n-layout class="portal-layout" >
    <n-layout-header class="portal-layout-header">
      <h2 style="margin: 10px 20px 0 20px">{{title}}</h2>
    </n-layout-header>
    <n-layout-content class="portal-layout-content">
      <n-list bordered style="margin: 0">
        <n-list-item v-for="item in result" :key="item.id" >
          <a @click="handleRow(item)" >{{item.name}}</a>
        </n-list-item>
      </n-list>
    </n-layout-content>
    <n-layout-footer class="portal-layout-footer">
      <n-pagination
        v-model:page="page.current"
        v-model:page-size="page.size"
        :item-count="total"
        show-size-picker
        :page-sizes="[10, 20, 30, 40]"
        @update:page="handlePage"
        @update:page-size="handlePageSize"
      />
    </n-layout-footer>
  </n-layout>
</template>
<script>
export default {
setup (props) {
  const route = $VueRouter.useRoute()
  const router = $VueRouter.useRouter()
  const result = $Vue.ref([])
  const total = $Vue.ref(0)
  const page = $Vue.reactive({
    current: 1,
    size: 10
  })
  const title = route.query.title
  const url = route.query.url
  const params = JSON.parse(unescape(route.query.params))
  const datamethod = eval(unescape(route.query.datamethod))
  const query = () => {
    $Request({
      url,
      method: 'post',
      data: {
        ...params,
        page
      }
    }).then(res => {
      result.value = datamethod(res)
      total.value = res.total
    })
  }
  query();
  return {
    title,
    result,
    query,
    page,
    total,
    handlePage () {
      query()
    },
    handlePageSize (pz) {
      page.size = pz
      query()
    },
    handleRow (item) {
      router.push({
        path: '/detail',
        query: {
          src: escape(item.url),
          params: escape(JSON.stringify({
            title: item.name,
            author: item.author,
            date: item.date
          }))
        }
      })
    }
  }
}
}
</script>
<style lang="less">
.portal-detail-frame {
  border: none;
  width: 100%;
  height: 100%;
}
</style>`;

// 新建页面
export const newpage = `<template>
<!-- 页面代码 -->
</template>
<script>
export default {
setup () {
  return {

  }
}
}
</script>
<style lang="less">
h1 {}
</style>`;

// 组件
export const componentTest = `<template>
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
</style>`;
