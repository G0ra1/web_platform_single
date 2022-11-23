import { reactive, ref, nextTick, watch } from "vue";
import { parse as HimalayaParse, stringify as HimalayaStringify } from 'himalaya';
// import { cloneDeep } from 'lodash'
import { xmlParse, xmlStringify } from './utils'
window.xmlParse = xmlParse
window.xmlStringify = xmlStringify
import { layout, index, newpage, componentTest, detailPage, listPage } from "./pageDefault"
import { default as PartComponent, partInstance} from '../../part/components/content'
import basicComponent from '../../part/components/container'
import { create, edit, queryById } from '../api'
import { queryAll } from '../../part/api'
import redirectPage from '/@/plugins/redirect-page'
import { useComponents } from '../../part/components/static'
// Object.entries(partInstance)
// .filter(([ k, v ]) => v)
// .map(([ k, v ]) => {
//   return v()
// })

// 侧栏属性
export const attributesSiderCollapsed = ref(true)

// 侧栏属性
export const attributesSiderMod = ref(null)

export const dragDom = ref(null) // 备用拖拽辅助显示
export const viewActive = ref('design')

// 动态box计数
export const boxModCount = ref(0)

// 当前悬停 拖拽框体 当前触发的
export const boxModActive = ref(-1)

// 布局组件
export const containerCodes = basicComponent.map(d => ({
  ...d,
  icon: 'component-box'
}))
// 基础组件
export const basicCodes = reactive([])
// 栏目组件
export const partCodes = reactive([])
// 静态栏目组件
export const staticPartCodes = reactive(useComponents)
// 预设组件
export const presetPartCodes = reactive([])

// 栏目组件遍历
PartComponent.forEach(({
  key,
  label,
  code
}) => {
  const pi = partInstance[key]
  if (pi) {
    partCodes.push({
      key,
      label,
      icon: 'component-partCodes',
      code: pi()
    })
  }
})

// 根据门户获取所有栏目实例
export const requestParts = (portalId) => {
  queryAll({
    portalId
  }).then(res => {
    // 清除原有
    // presetPartCodes.splice(0, presetPartCodes.length)
    console.log('=====requestParts=====', res)
    // 这里对栏目进行分组
    //
    const rootNode = []
    const group = {}
    res.forEach(({
      id,
      partCode,
      frontData,
      partName,
      partTypeCode,
    }) => {
      if (!group[partTypeCode]) {
        group[partTypeCode] = []
      }
      group[partTypeCode].push({
        key: id, // 使用栏目code作为唯一
        label: partName,
        icon: 'pintu',
        code: frontData,
      })
    })
    Object.entries(group).forEach(([ k, v ]) => {
      const node = partCodes.find(d => d.key === k)
      if (node) {
        presetPartCodes.push({
          key: `${node.key}Type`,
          label: node.label,
          icon: 'dakai',
          children: v
        })
      }
    })
    console.log('=====presetPartCodes=====', presetPartCodes)
    // 这里触发事件
    Object.entries(editorEvents['INIT_PARTS']).forEach(([, v]) => {
      v()
    })
  }).catch(error => {

  })
}
// import {
//   useMessage
// } from 'naive-ui'
// // e
// 缓存提示信息实例工厂, 在index 中 初始化, 用途：调用公共提示
export const providerWindow = reactive({
  message: null,
  dialog: null
})

// export const message = ref(null)
// nextTick().then(() => {
//   message.value = useMessage()
// })
// 这里建立事件机制
export const editorEvents = reactive({
  'INIT_CREATE': {},
  'INIT_EDIT': {},
  'INIT_PARTS': {},
  'CHANGE_MOD': {}
})
// 注册事件
export const addEditorEventListener = (e, cb) => {
  const [ e1, e2 = 'default'] = e.split('.')
  if (editorEvents[e1]) {
    editorEvents[e1][e2] = cb
  } else {
    console.error(`未找到对应的事件: ${e}`)
  }
  
}
// 清除事件
export const removeEditorEventListener = (e) => {
  const [ e1, e2 = 'default'] = e.split('.')
  if (editorEvents[e1]) {
    delete editorEvents[e1][e2]
  } else {
    console.error(`未找到对应的事件: ${e}`)
  }
  
}


// 编辑器整体加载
export const editorSpinVisible = ref(false)

// 编辑器动作
export const editorAction = ref('create')

// // 当前编辑代码
// export const code = reactive({
//   template: `<template>
// </template>`,
//   script: `export default {
// }`,
//   css: ''
// });

// 模板基本信息, 主要用途 编辑时记录其他基础信息
export const templateBasic = reactive({
  
})

// 网站数据代码 新建网站时的代码
export const website = reactive({
  version: '', // 模板版本
  components: [], // 所需动态组件
  routes: [],
  dataSource: [], // 所需数据源
  pages: [] // 页面
})
// 赋值website 和templateBasic 初始化编辑器 根据动作
export const initBasicData = (action = 'create', id) => {
  // message.value.success('==222')
  editorAction.value = action
  if (action === 'edit' || action === 'editVersion' || action === 'createBy') {
    editorSpinVisible.value = true
    return queryById(id).then(res => {
      editorSpinVisible.value = false
      const { templateData, ...basic } = res
      const code = JSON.parse(templateData)
      website.version = code.version
      website.routes.push(...(code.routes || []))
      website.dataSource.push(...(code.dataSource || []))
      website.pages.push(...(code.pages || []))
      website.components.push(...(code.components || []))
      // 这里判断 createBy
      if (action === 'createBy') {
        templateBasic.portalId = basic.portalId
        templateBasic.portalName = basic.portalName
        templateBasic.templateCode = basic.templateCode
        templateBasic.templateName = basic.templateName
        templateBasic.terminal = basic.terminal
        templateBasic.startEnable = 0
      } else {
        Object.entries(basic).forEach(([ k, v ]) => {
          templateBasic[k] = v
        })
      }
      // templateBasic.startEnable
      console.log('=====requestQueryTemplate====', res, code, templateBasic);
      // return new Promise()
      // editorEvents['INIT_EDIT'].forEach(d => {
      //   d(res)
      // })
      // 这里触发事件
      Object.entries(editorEvents['INIT_EDIT']).forEach(([, v]) => {
        v()
      })
      // 根据portalId
      // alert(basic.portalId)
      requestParts(basic.portalId)
    })
  } else if (action === 'create' || action === 'createVersion') {
    // 从value赋值
    // 初始化创建
    website.components = PartComponent
    // website.components = [
    //   {
    //     key: 'ComponentTest',
    //     label: '测试组件',
    //     code: componentTest // 
    //   }
    // ]
    website.routes = [{ // 路由
      key: '/',
      label: '/',
      path: '/',
      name: 'home',
      component: 'layout', // pages中的id
      children: [
        {
          key: 'index',
          label: 'index',
          path: 'index',
          name: 'index',
          component: 'index',
        },
        {
          key: 'detail',
          label: 'detail',
          path: 'detail',
          name: 'detail',
          component: 'detail',
        },
        {
          key: 'listPage',
          label: 'listPage',
          path: 'listPage',
          name: 'listPage',
          component: 'listPage',
        },
        // {
        //   key: '404',
        //   label: '404',
        //   path: ':pathMatch(.*)',
        //   component: '404',
        // }
      ]
    }]
    website.pages = [{
        key: 'layout',
        label: 'layout',
        type: 'frame', // 页面类型 frame 是框架类型含有路由加载器 page 为页面
        code: layout // 页面的vue代码 只解析部分规则
      },
      {
        key: 'index',
        label: 'index',
        type: 'page',
        code: index // 页面的vue代码 只解析部分规则
      },
      {
        key: 'detail',
        label: 'detail',
        type: 'page',
        code: detailPage // 页面的vue代码 只解析部分规则
      },
      {
        key: 'listPage',
        label: 'listPage',
        type: 'page',
        code: listPage // 页面的vue代码 只解析部分规则
      },
    ]
    // ----
    if (action === 'createVersion') {
      editorSpinVisible.value = true
      queryById(id).then(res => {
        editorSpinVisible.value = false
        const { templateData, ...basic } = res
        templateBasic.portalId = basic.portalId
        templateBasic.portalName = basic.portalName
        templateBasic.templateCode = basic.templateCode
        templateBasic.templateName = basic.templateName
        templateBasic.terminal = basic.terminal
        templateBasic.startEnable = 0

        requestParts(basic.portalId)
      })
    } else {
      modalVisible.templateBasic = true
    }

    return new Promise((resolve) => { resolve() })
  }
}
// 最终保存
export const sendSave = () => {
  const params = {
    ...templateBasic,
    templateData: JSON.stringify(website),
  }
  let msg,req

  if (editorAction.value === 'create') {
    msg = '创建模板成功'
    req = create
  } else if (editorAction.value === 'createBy') {
    msg = '创建模板成功'
    req = create
  } else if (editorAction.value === 'createVersion') {
    msg = '创建模板成功'
    req = create
  } else if (editorAction.value === 'edit' || editorAction.value === 'editVersion') {
    msg = '编辑模板成功'
    req = edit
  }
  req(params).then(() => {
    // 保存成功
    providerWindow.message.success(msg)
    redirectPage('portal/template.html')
  })
}

// 添加页面文件
export const createPage = (key, type = 'page') => {
  // 判断文件名是否重复
  if (getPageByKey(key)) {
    return false
  }
  website.pages.push({
    key,
    label: key,
    type,
    code: newpage
  })
  return true
}
// 删除页面
export const delPage = (page) => {
  const index = website.pages.indexOf(page)
  if(index >= 0) website.pages.splice(index, 1)
}


// 添加路由
export const createRoute = (name, path, component, parent = website.routes[0].children) => {
  parent.push({
    key: name,
    label: name,
    name,
    path: path,
    component,
  })
}
// 删除路由
export const delRoute = ( route, parent = website.routes[0].children ) => {
  const index = parent.indexOf(route)
  if(index >= 0) parent.splice(index, 1)
}

// 根据key获取页面
export const getPageByKey = (key) => website.pages.find(d => d.key === key)


// 当前正在编辑的页面
export const editingPage = ref(null)

// 层级化 将vue的template 部分进行json层级化
export const editingPageMod = ref([])

// --------- 这里建立伪website

// // 保存到原始数据
// export const getCacheWebSite = (key) => { // 如果不传入 key 则保存所有
//   if (key) {
//     const page = getPageByKey(key) // 从websize中获取
//     if (page && openingPages[key]) {
//       page.code = openingPages[key].code
//       openingPages[key].isSaved = true
//     }
//     return
//   }
//   Object.entries(openingPages).forEach(([ key, code]) => {
//     const page = getPageByKey(key)
//     if (page) {
//       page.code = code.code
//       openingPages[key].isSaved = true
//     }
//   })
// }

// 建通mod
watch(editingPageMod, (n, o) => {
  if (o.length && viewActive.value === 'design') {
    setEditingPageMod()
    // 这里触发事件
    Object.entries(editorEvents['CHANGE_MOD']).forEach(([, v]) => {
      
      // 这里需要传入整体website
      // 这里将当前编辑页面注入到web site中
      const page = getPageByKey(editingPage.value.key)
      page.code = editingPage.value.code
      openingPages[editingPage.value.key].isSaved = true
      v(website)
    })
  }
}, { deep: true })
// 解析
const analysisPageMod = (code) => {
  // 截取 标签部分
  const templateInner = code.match(/^<template>([\s\S]*)<\/template>/)[1]
  // console.log('=====HimalayaParse text======', HimalayaParse(`<xx>
  // <template #hx1>
  // <p>
  //   <a></a>
  //   <a></a>
  // </p>
  // </template>
  // <template #default></template>
  // </xx><xx>
  // <template #hx1></template>
  // <template #default></template>
  // </xx>
  // <p>
  //   <p>
  //     <p>xx</p>
  //   </p>
  //   <p>xx</p>
  // </p>`))
  return HimalayaParse(code, {
    voidTags: [],
    closingTags: [],
    childlessTags: [],
    closingTagAncestorBreakers: {},
    includePositions: false
  })
}

// 设定当前编辑页面 用于顶部tab切换
export const setEditingPage = (key) => {
  if (key) {
    editingPage.value = openingPages[key]
    // 层级化当前页面代码
    // editingPageMod.value = xmlParse(editingPage.value.code.match(/^<template>([\s\S]*)<\/template>/)[1])
    syncCodeToMod();
    // console.log('analysisPageMod==', editingPageMod.value)
  } else {
    editingPage.value = null
  }
}

// 同步当前编辑代码 monaco 代码编辑器中调用
export const setEditingPageCode = (code) => {
  editingPage.value.code = code
  // editingPageMod.value = xmlParse(editingPage.value.code.match(/^<template>([\s\S]*)<\/template>/)[1])
  syncCodeToMod();
  editingPage.value.isSaved = false
}

// 设定代码mod
export const setEditingPageMod = () => {
  syncModToCode();
  editingPage.value.isSaved = false
}

// 从代码同步到模型
export const syncCodeToMod = () => {
  // editingPage.value.code = xmlStringify(editingPageMod.value)
  editingPageMod.value = xmlParse(editingPage.value.code.match(/^<template>([\s\S]*)<\/template>/)[0])
  console.log('=======syncCodeToMod======')
}

// 从模型同步到代码
export const syncModToCode = (code) => {
//   editingPage.value.code = `<template>
//   ${xmlStringify(editingPageMod.value)}
// </template>
//   `
  // 这里产生错误将script style 消失
  // editingPage.value.code = editingPage.value.code.replace()
  
  editingPage.value.code = editingPage.value.code.replace(/^<template>([\s\S]*)<\/template>/, xmlStringify(editingPageMod.value))
}

// 当前打开的页面文件 头部文件页签
export const openingPages = reactive({})

// 根据key开始编辑
export const openPageByKey = (key) => {
  // 
  const p = getPageByKey(key)
  if (p) openPage(p)
}

// 开始编辑页面
export const openPage = (page) => {
  if (!openingPages[page.key]) {
    openingPages[page.key] = {
      ...page,
      isSaved: true
    }
  } 
  // 新打开页面后默认编辑
  setEditingPage(page.key)
}

// 关闭页面
export const closePage = (key) => {
  // 关闭页面后 当前编辑页面
  delete openingPages[key]
  // 如果关闭的是当前开启的页面
  const ops = Object.entries(openingPages)
  if (ops.length) {
    // console.log('watch editingPage=ops=',ops, ops[ops.length - 1][0]);
    setEditingPage(ops[ops.length - 1][0])
  } else {
    setEditingPage(false) // 设定空
  }
}

// export const getopeningPages = () => {

// }
// 

// 保存到原始数据
export const saveToWebSite = (key) => { // 如果不传入 key 则保存所有
  if (key) {
    const page = getPageByKey(key) // 从websize中获取
    if (page && openingPages[key]) {
      page.code = openingPages[key].code
      openingPages[key].isSaved = true
    }
    return
  }
  Object.entries(openingPages).forEach(([ key, code]) => {
    const page = getPageByKey(key)
    if (page) {
      page.code = code.code
      openingPages[key].isSaved = true
    }
  })
}

// ---状态管理---
export const modalVisible = reactive({
  createPage: false, // 创建页面
  createRoute: false, // 创建路由
  templateBasic: false, // 模板名和机构选择
  createDataSource: false, // 数据源
  templateSave: false, // 保存确认窗口
  templateSaveLoading: false // 保存确认窗口
})

// --------请求--------
// 新建
export const requestCreate = () => {
  const params = {
    ...templateBasic,
    templateData: JSON.stringify(website),
  }
  // create(params).then(res => {
    
  // })
  return create(params)
}

// 编辑保存
export const requestEdit = () => {
  const params = {
    ...templateBasic,
    templateData: JSON.stringify(website),
  }
  // create(params).then(res => {
    
  // })
  return edit(params)
}

// 根据id获取模板信息
export const requestQueryTemplate = (id) => {
  queryById(id).then(res => {
    console.log('=====requestQueryTemplate====', res);
  })

}