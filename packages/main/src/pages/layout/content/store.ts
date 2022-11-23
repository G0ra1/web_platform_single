import { ref, provide } from 'vue'

import { Utils, Db } from '@platform/main'


// 这里定义菜单类型
type AppInst = {
    [a: string]: any
}

// 框架类型  app框架  frame框架
type LayoutTypeInst = 'app' | 'frame'
export const LayoutType = ref<string>('app')

// app 信息
export const AppCode = ref<string>('')
// menu 信息
export const MenuCode = ref<string>('')

// app 对象
export const AppInfo = ref<AppInst>({})

// 侧栏菜单配置项
export const MenuOptions = ref([])

// 当前app所有页面链接map
const PageMap = ref<any>({})

// Frame 加载 url
export const FrameUrl = ref('')

// 错误
export const ErrorMsg = ref({
    flag: false,
    icon: 'icon-y-empty',
    text: ''
})

// appinfo
// 注册哈希监听------------------
export const registerListener = () => {
    window.addEventListener('hashchange', (e) => {
        // 这里触发 功能頁面加載
        console.log('=======', window.location.hash)
        init()
    })

}
// 根据hash加载

export const init = async function () {
    ErrorMsg.value.flag = false
    ErrorMsg.value.icon = 'icon-y-empty'
    ErrorMsg.value.text = ''

    // FrameUrl.value = ''

    const [layoutType, p1, p2] = window.location.hash.substring(1).split('/')

    // 判断 layoutType
    if (!layoutType) {
        ErrorMsg.value.flag = true
        ErrorMsg.value.icon = 'icon-y-check'
        ErrorMsg.value.text = '请选择应用模块'
        return
    }
    // 这里判断类型
    LayoutType.value = layoutType
    if (layoutType === 'portalframe') {
        await Db.get('portalInfo').then((portals: any) => {
            // 如果没有获取到应用则取消
            if (!portals) {
                return false
            }
            if (portals.pages[p1]) {
                // FrameUrl.value = pageUrl
                // 这里对
                FrameUrl.value = portals.pages[p1]
                return true
            } else {
                // 访问默认页面
                // FrameUrl.value = (Object.values(portals.pages)[0] as string)
                window.location.hash = `#portalframe/${Object.keys(portals.pages)[0]}`
                return false
            }
        })


    } else if (layoutType === 'frame') {
        // p1: type
        if (p1 === 'portalframe') {
            FrameUrl.value = '/web-old/html/portal/template-render.html?portalid=144774667764026982#/index'
        } else if (p1 === 'date-manage') {
            FrameUrl.value = '/web-smm/pages/scheduleManagement.html'
        } else if (p1 === 'task') {
            FrameUrl.value = '/web-wf/pages/workflow-table.html#/todo'
        }

    } else if (layoutType === 'app') {
        // if (layoutType !== LayoutType.value) {
        //     LayoutType.value = layoutType
        //     FrameUrl.value = ''
        // }
        // p1: appCode
        // p2: menuCode
        // 如果类型是app
        // 应用改变时

        if (AppCode.value !== p1) {
            AppCode.value = p1
            // 获取新的app
            const flag = await Db.get('bizMenuInfo').then((apps: Array<AppInst>) => {
                // 如果没有获取到应用则取消
                if (!apps) {
                    return false
                }
                const app = apps.find((d: AppInst) => d.appCode === AppCode.value)
                if (app) {
                    AppInfo.value = {
                        appName: app.appName,
                        appCode: app.appCode,
                        defPage: `` // 默认页面
                    }

                    // 菜单
                    MenuOptions.value = app.menus || []

                    PageMap.value = app.pages || {}
                    // 这里对
                    return true
                } else {

                    return false
                }
            })

            if (!flag) {
                // 找不到应用
                ErrorMsg.value.flag = true
                ErrorMsg.value.text = '没有找到应用信息'
            }
        }

        // 判断menuCode
        if (MenuCode.value !== p2) {
            MenuCode.value = p2
            // 从MenuOptions 获取url
            const pageUrl = PageMap.value[MenuCode.value]
            // alert(pageUrl)
            if (pageUrl) {
                FrameUrl.value = pageUrl
            } else {
                // 错误 读取默认页面
                FrameUrl.value = ''
            }

        }


    }

    // 
    console.log('=====获取菜单完成====')
    // 这里获取
}

// 跳转赋值菜单
export const setMenuHash = (code: string) => {
    // FrameUrl.value = url
    // 这里不应该直接赋值url
    // MenuCode.value = code

    window.location.hash = `#app/${AppCode.value}/${code}`
}


