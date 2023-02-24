import { ref, provide, nextTick } from 'vue'

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

// 是否有侧栏
export const isShowSider = ref<boolean>(false)

// 错误
export const ErrorMsg = ref({
    flag: false,
    icon: 'icon-y-empty',
    text: ''
})

export const FrameVisible = ref<boolean>(true)

// appinfo
// 注册哈希监听------------------
export const registerListener = () => {

    init()
    window.addEventListener('hashchange', (e) => {
        // 这里触发 功能頁面加載
        // console.log('=======', window.location.hash)
        // alert(1)
        FrameVisible.value = false
        init()

    })

}
// 根据hash加载

export const init = async function () {
    isShowSider.value = false
    ErrorMsg.value.flag = false
    ErrorMsg.value.icon = 'icon-y-empty'
    ErrorMsg.value.text = ''
    FrameUrl.value = ''


    const [layoutType, p1, p2, p3, p4] = window.location.hash.substring(1).split('/')

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

        // 赋值
        const app = await Db.get('bizMenuInfo').then((d: any) => d.find((x: any) => x.appCode === p1))
        let menuCode: string = ''

        // 这里需要区分 p3 进入有侧栏菜单的页面
        console.log(app, 'appappappapp')
        // 是否进入二级菜单
        if (p3 === '@t3') {
            isShowSider.value = true
            MenuCode.value = p4
            MenuOptions.value = app.menus.find((d: any) => d.key === p2).sonMenus
            // 
            console.log('=@t3==', app.menus.find((d: any) => d.key === p2))
            console.log(MenuCode.value, 'MenuCode.valueMenuCode.value')
            menuCode = MenuCode.value


            // 这里产生默认选定菜单
            if (p4) {
                FrameUrl.value = app.pages[p4]
            } else {
                // 获取默认页面
                // 从 MenuOptions.value 中
                const resu: any = (mlist: Array<any>) => {
                    const mp = mlist.find((d: any) => d.type === 1)
                    if (!mp) {
                        // mlist.forEach(d => {
                        //     if (d.children) {
                        //         resu(d.children)
                        //     }
                        // })
                        for (let i in mlist) {
                            return resu(mlist[i].children)
                        }
                        return false
                    } else {
                        return mp
                    }
                }
                const mf = resu(MenuOptions.value)
                if (mf) {
                    const [layoutType, p1, p2, p3] = window.location.hash.substring(1).split('/')
                    window.location.hash = `${layoutType}/${p1}/${p2}/${p3}/${mf.key}`
                }
            }

        } else if (p3 && p4) {
            // 这里需要拼接一级菜单的数据参数
            menuCode = p4
            FrameUrl.value = Utils.addParamtoUrl(app.pages[p4], `pm=${p3}`)

        } else if (p2 && app.pages[p2]) {
            menuCode = p2
            FrameUrl.value = app.pages[p2]

        } else {
            ErrorMsg.value.flag = true
            ErrorMsg.value.icon = 'icon-y-empty'
            ErrorMsg.value.text = '未配置页面'
        }
        try {
            app.menus.forEach((menu: any) => {
                if (menu.key == menuCode) {
                    AppInfo.value = menu
                    throw Error()
                }
                if (menu.sonMenus) {
                    menu.sonMenus.forEach((menu: any) => {
                        if (menu.key == menuCode) {
                            AppInfo.value = menu
                            throw Error()
                        }

                    });
                }
            });
        } catch (error) {

        }
        console.log(AppInfo.value, 'AppInfo')
        // 这里判断是否进入2级菜单


    } else if (layoutType === 'iframe-inner') {
        const [title, url] = window.decodeURI(window.atob(p2)).split('$$')
        FrameUrl.value = url
    }
    console.log(AppInfo.value, 'AppInfo')

    // 
    console.log('=====获取菜单完成====')
    // 这里获取

    FrameVisible.value = true
}

// 跳转赋值菜单
export const setMenuHash = (code: string) => {
    // FrameUrl.value = url
    // 这里不应该直接赋值url
    const [layoutType, p1, p2, p3] = window.location.hash.substring(1).split('/')
    window.location.hash = `${layoutType}/${p1}/${p2}/${p3}/${code}`
}


