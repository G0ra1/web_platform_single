import { createApp, defineComponent } from 'vue/dist/vue.esm-bundler.js'
import * as vue from 'vue/dist/vue.esm-bundler.js'
import * as vueRouter from 'vue-router/dist/vue-router.esm-bundler.js'
import { createRouter, createWebHashHistory } from 'vue-router'
import naive from 'naive-ui'
import NwComponents from './plugins/components.js'
import { zhCN, dateZhCN } from 'naive-ui'
import { recursion, parseQuery } from '/@/utils'
import { request } from '@platform/main'
// xml 解析
// import parser from 'xml-parse/resources/parser.js'
import less from 'less/dist/less.min.js'
import PartComponent from '../part/components/content'
import PartStaticComponent from '../part/components/static'
import { Cookies, Db } from '@platform/main'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// import swiperCss from 'swiper/css/bundle';
// import DOM from 'xml-parse/resources/dom.js'
// import stringify from 'xml-parse/resources/stringifier.js'

// console.log('parser===', parser);
// zong
// 获取页面组件元素

// 加入style
// const swiperStyleDom = document.createElement('style')
// swiperStyleDom.innerHTML = swiperCss
// document.head.append(swiperStyleDom)
const getComponent = async ({
  key, code
}) => {
  // 从代码中分别提取 模板、脚本、样式
  // 问题使用 xml-parse 解析 xml 效率极低
  // const st = new Date().getTime()
  // const xmlJSON = parser.parseFromString(code)
  // alert((new Date().getTime() - st) / 1000)
  // const templateXml = xmlJSON.find(d => (d.type === 'element' && d.tagName === 'template')).innerXML
  // const scriptXml = xmlJSON.find(d => (d.type === 'element' && d.tagName === 'script')).innerXML.replace('export default ', '')
  // const styleXml = xmlJSON.find(d => (d.type === 'element' && d.tagName === 'style'))
  // let style = styleXml.innerXML
  // // 这里需要同步翻译style
  // if (styleXml.attributes.lang === 'less') {
  //   await less.render(styleXml.innerXML).then(r => {
  //     style = r.css
  //   })
  // }

  // ----改为直接正则进行提取
  // console.log(xml.match(/^<template>([\s\S]*)<\/template>/)[1])
  // console.log(xml.match(/<script>([\s\S]*)<\/script>/)[1])
  // console.log(xml.match(/<style.*?>([\s\S]*)<\/style>/)[1])
  // console.log(xml.match(/<style(.*)>/)[1])
  const templateXml = code.match(/^<template>([\s\S]*)<\/template>/)[1]
  const scriptXml = code.match(/<script>([\s\S]*)<\/script>/)[1].replace('export default ', '')
  const styleXml = code.match(/<style.*?>([\s\S]*)<\/style>/)[1]
  const styleAttr = code.match(/<style(.*)>/)[1]
  let style = styleXml
  if (styleAttr.indexOf('less') >= 0) {
    await less.render(styleXml).then(r => {
      style = r.css
    })
  }
  let component = defineComponent(eval(`(${scriptXml})`))
  component.template = templateXml
  return {
    component,
    style
  }
}
// 路由初始化
const getRoutes = (routes) => {
}

// 初始化
const init = async (event = {}) => {
  const data = event.data || {}
  const pages = data.pages || []
  const theme = event.theme || window.PORTAL_THEME || {}
  const routes = data.routes || []
  const components = PartComponent //data.components || []
  // 清除原有信息
  document.getElementById('app').remove()
  const root = document.createElement('div')
  root.id = 'app'
  document.body.append(root)

  // 删除所有内联style
  let styles = document.body.getElementsByTagName("style");
  [].slice.apply(styles).forEach(d => d.remove())
  // const allName = document.body.getElementsByTagName('style')
  // for (let item in allName) {
  //   console.log('allName[item]===', item, allName[item]);
  //   allName[item].remove()
  // }

  // style 这里的style后期可能需要分离
  let styleBuild = ''

  // 这里初始化组件
  const componentMap = {}
  for (let i in components) {
    const c = components[i]
    // 同步渲染组件
    await getComponent(c).then(({ component, style }) => {
      // console.log('====component=====', component)
      componentMap[c.key] = component
      styleBuild = `${styleBuild}\n${style}`
    })
  }
  const componentInstall = {
    install(app) {
      Object.entries(componentMap).forEach(([k, v]) => {
        app.component(k, v)
      })
    }
  }
  // 解析数据
  // console.log('====init====', data)
  // 初始化页面文件
  const pageMap = {}

  if (pages) {
    for (let i in pages) {
      const p = pages[i]
      // 同步渲染组件
      console.log('1')
      await getComponent(p).then(({ component, style }) => {
        console.log('====component=====', component)
        pageMap[p.key] = component
        styleBuild = `${styleBuild}\n${style}`
      })
    }
    // console.log(styleBuild);
    // pages.forEach(async d => {
    //   // const { component, style } = getComponent(d)
    //   await getComponent(d).then(({ component, style }) => {
    //     pageMap[d.key] = component
    //   })
    // })
  }
  // 加入style
  const styleDom = document.createElement('style')
  styleDom.innerHTML = styleBuild
  document.body.append(styleDom)

  // 初始化路由
  if (routes) {
    recursion(
      routes,
      {
        children: 'children',
        callBack: d => {
          d.component = pageMap[d.component]
          return 1
        }
      }
    )
  }
  routes[0] && routes[0].children.push({
    key: '404',
    label: '404',
    path: ':pathMatch(.*)',
    component: defineComponent({
      template: '404'
    }),
  })
  // 这里创建路由
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  // 初始化style

  try {
    // 这里可以使用路由
    const app = createApp(defineComponent({
      template: `<n-config-provider
      :theme-overrides="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      >
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
      <router-view />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
      </n-config-provider>
      `,
      setup() {
        return {
          zhCN,
          dateZhCN,
          theme
        }
      }
    }))
      .use(naive) // 全局naive组件
      .use(NwComponents) // 注册Nw组件 这里需要加入动态组件
      .use(PartStaticComponent) // PartStaticComponent
      .use(componentInstall) // 注册 栏目基础组件
      .use(VXETable)
      .use(router)
    // 设定全局模式
    window.$Db = Db
    window.$Vue = vue
    window.$VueRouter = vueRouter
    window.$Request = request
    window.$Cookies = Cookies
    app.mount('#app')
    //vueRouter.useRouter().push('/index')
  } catch (error) {
    console.error('渲染页面失败', error);
  }
  return
  // const {
  //   template = `<h1>Test22</h1>`,
  //   script = `{}`,
  //   css
  // } = data
  // let component = {}
  // try {
  //   component = eval(`(${script.replace('export default ', '')})`)
  // } catch (error) {
  //   console.error('js 代码解析失败');
  // }
  // component.template = template
  // component.style = `h1 {color: red}`
  // if (!component.methods) component.methods = {}

  // console.log('========', component)
  // // 外部公共方法调用，主要用于路由跳转
  // component.methods.GetFun = (funType) => {
  //   if (funType === 'router') {
  //       return router
  //   }
  //   return null
  // }
  // // 这里创建路由
  // const router = createRouter({
  //   history: createWebHashHistory(),
  //   routes: [
  //     {
  //       path: '/',
  //       component: defineComponent(component)
  //     }
  //   ]
  // })

  // try {
  //   // 这里可以使用路由
  //   createApp(defineComponent({
  //     template: `<router-view />`
  //   })).use(naive).use(router).mount('#app')
  // } catch (error) {
  //   console.error('渲染页面失败');
  // }

}

window.addEventListener('message', init, false)
// 初始化加载测试用途 这里需要请求
window.onload = () => {
  // init()
  // 这里判断是否
  const urlParams = parseQuery(window.location.search.substr(1))
  console.log('urlParams==', urlParams)
  if (urlParams.portalid) {
    // alert(urlParams.portalid)
    // 这里请求模板code
    request({
      url: '/portal/portalPortal/getEnableData', // 修改为通用 接口返回
      // url: `/portal/portalPortal/findTemplateByPortalId`,
      method: 'get',
      params: {
        portalId: urlParams.portalid,
        terminal: 0
      }
    }).then(res => {
      console.log('====res=====', res, JSON.parse(res.themeData))
      // 加载init
      init({
        data: JSON.parse(res.templateData),
        theme: JSON.parse(res.themeData) // res.themeData
      })
    })
  } else if (urlParams.templateId) {
    request({
      url: `/portal/portaltemplate/${urlParams.templateId}`,
      method: 'get',
      data: {}
    }).then(res => {
      //

      request({
        url: '/portal/portalTheme/getDefaultTheme', // 修改为通用 接口返回
        method: 'get',
        // params: {
        //   portalId: urlParams.portalid,
        //   terminal: 0
        // }
      }).then(({ themeData }) => {
        init({
          data: JSON.parse(res.templateData),
          theme: JSON.parse(themeData)
        })
      })
      // 加载init
      // request({
      //   url: '/portal/portalPortal/getEnableData', // 修改为通用 接口返回
      //   // url: `/portal/portalPortal/findTemplateByPortalId`,
      //   method: 'get',
      //   // params: {
      //   //   portalId: urlParams.portalid,
      //   //   terminal: 0
      //   // }
      // }).then(({ themeData }) => {
      //   init({
      //     data: JSON.parse(res.templateData),
      //     theme: JSON.parse(themeData)
      //   })
      // })
    })
  } else if (urlParams.debug) {
    // 这里加载一次默认主题

    console.log(window.opener.PROTAL_TEMPATE_CODE_CACHE)
    request({
      url: '/portal/portalPortal/getEnableData', // 修改为通用 接口返回
      // url: `/portal/portalPortal/findTemplateByPortalId`,
      method: 'get',
      // params: {
      //   portalId: urlParams.portalid,
      //   terminal: 0
      // }
    }).then(({ themeData }) => {
      window.PORTAL_THEME = JSON.parse(themeData)
      init({
        data: window.opener.PROTAL_TEMPATE_CODE_CACHE,
        theme: window.PORTAL_THEME
      })
    })
    window.onunload = () => {
      window.opener.PROTAL_TEMPATE_WIN = null
      window.opener.PROTAL_TEMPATE_CODE_CACHE = null
    }
  }
}
// // 测试动态渲染
// const dc = `{
//   setup () {
//     return {
//       xx: 12343
//     }
//   }
// }`
// const dcx = eval(`(${dc})`)
// console.log(dcx)
// dcx.template = `<n-button>{{xx}}</n-button><p-panel></p-panel>`
// // 这里需要全局注册组件

// // 考虑这里加入router
// const app = createApp(defineComponent(dcx))
// app.component('PPanel', PPanel)
// app.use(naive).mount('#app')
