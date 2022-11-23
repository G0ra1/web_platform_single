import { ref, provide } from 'vue'

import { Utils, Db } from '@platform/main'


// 这里定义菜单类型
type AppInst = {
    [a: string]: any
}

// 应用列表
export const AppItems = ref<Array<AppInst>>([])

// 当前活动
export const ActiveApp = ref<string>('')

// appinfo
// 注册哈希监听------------------
export const registerListener = () => {
    window.addEventListener('hashchange', (e) => {
        // 这里触发 功能頁面加載
        // console.log('===222====', window.location.hash)
        activeTick()
    })
    
}

// 根据hash加载
export const activeTick = () => {
    const [ layoutType, p1 ] = window.location.hash.substring(1).split('/')
    if (layoutType === 'app') {
        ActiveApp.value = p1 // appCode
    } else if (layoutType === 'portalframe') {
        ActiveApp.value = 'portalframe'
    }
}

// 获取应用列表
export const init = async function () {

    await Db.get('bizMenuInfo').then((apps: Array<AppInst>) => {
        AppItems.value = apps.filter(d => d.appType === 'service')
    })

}

// 跳转赋值菜单
export const setMenuHash = (app: any) => {
    // FrameUrl.value = url
    // 这里不应该直接赋值url
    // MenuCode.value = code
    // 这里获取默认页面
    if (app.menus.length > 0) {
        window.location.hash = `#app/${app.appCode}/${app.menus[0].key}`
    } else {
        window.location.hash = `#app/${app.appCode}`
    }
    // window.location.hash = `#app/${AppCode.value}/${code}`
}


