import { ref, provide } from 'vue'

import { Utils, Db, Page } from '@platform/main'

type MenuItem = {
    id: string,
    menuName: string,
    appCode: string,
    menuCode: string,
    type: 0 | 1 | 2 | 3 | 4,
    key: string,
    label: string
}

export const menuItems = ref<Array<MenuItem>>([])

// 应用code
export const ActiveApp = ref<any>({})

// 一级菜单code
export const ActiveMenu = ref<any>({})
export const ActiveMenuData = ref<any>('')
export const ActiveMenuDataStr = ref<string>('')
export const ActiveMenuDataRequest = ref<string>('')

// 是否进入二级菜单
export const EnableMenuLevel2 = ref<boolean>(false)
export const ActiveMenuLevel2 = ref<any>({})

export const registerListener = () => {
    activeTick()
    window.addEventListener('hashchange', (e) => {
        // 这里触发 功能頁面加載
        console.log('=======', window.location.hash)
        activeTick()
    })

}

// 菜单响应
export const activeTick = async () => {

    const [layoutType, p1, p2, p3, p4] = window.location.hash.substring(1).split('/')

    ActiveApp.value = {}
    ActiveMenu.value = {}
    EnableMenuLevel2.value = false
    // p1 应用名称 p2 一级菜单code p3 一级菜单选择数据 p4 二级菜单code
    if (layoutType === 'app') {
        // 赋值
        const app = await Db.get('bizMenuInfo').then((d: any) => d.find((x: any) => x.appCode === p1))
        if (!app) return;
        // 赋值当前活动的
        ActiveApp.value = app

        console.log('-=-app=-', app)
        // p2 一级菜单key
        if (p2) {
            // 这里获取活动的一级菜单
            ActiveMenu.value = app.menus.find((d: any) => d.key === p2)
            // 进入到子菜单 p3 一级菜单选取的数据
            if (p3 === '@t3') {
                menuItems.value = app ? app.menus : []
            } else if (p3) {
                ActiveMenuData.value = Page.getMenuParam(p3)
                ActiveMenuDataStr.value = p3
                
                // 获取
                // const filter = window.parent.PageMenuFilters[`${p1}-${p2}`]

                // menuItems.value = ActiveMenu.value!.sonMenus
                // 这里记录的一级菜单点击的整行数据
                const MenuRow = await Db.get(`MenuRow-${p1}-${p2}`)
                const MenuFilter = await Db.get(`MenuFilter-${p1}-${p2}`)
                if (MenuRow && MenuFilter) {
                    const fn = Function(`return ${MenuFilter}`)()
                    menuItems.value = ActiveMenu.value!.sonMenus.filter((sm: any) => fn(sm, MenuRow))
                } else {
                    menuItems.value = ActiveMenu.value!.sonMenus
                }
                if (!menuItems.value.length) return;
                // p4 二级菜单
                if (p4) {
                    // 获取
                    ActiveMenuLevel2.value = menuItems.value.find((d: any) => d.key === p4)

                    ActiveMenuDataRequest.value = app.formListUrl[p2] || ''

                    EnableMenuLevel2.value = true
                } else {
                    window.location.hash = `#app/${ActiveApp.value.appCode}/${ActiveMenu.value.key}/${p3}/${menuItems.value[0].key}`
                }
            } else {
                // 赋值菜单
                // console.log('-=- app ? app.menus : []=',  app ? app.menus : [])
                menuItems.value = app ? app.menus : []
                // EnableMenuLevel2.value = true
            }
        } else {
            // alert(app.menus[0].key)
            // 这里需要区分类型
            if (app.menus[0].type === 3) {
                window.location.hash = `#app/${ActiveApp.value.appCode}/${app.menus[0].key}/@t3`
            } else {
                window.location.hash = `#app/${ActiveApp.value.appCode}/${app.menus[0].key}`
            }
            
        }

    }

}

// 触发菜单
export const handleMenu = (menu: MenuItem) => {
    console.log('===menu====', menu)
    // 这里需要区分菜单类型
    // menuCode
    // 这里判断菜单级别
    if (EnableMenuLevel2.value) {
        window.location.hash = `#app/${ActiveApp.value.appCode}/${ActiveMenu.value.key}/${ActiveMenuDataStr.value}/${menu.key}`
    } else if (menu.type === 0 || menu.type === 1) {
        window.location.hash = `#app/${ActiveApp.value.appCode}/${menu.key}`
    } else if (menu.type === 3) {
        // 菜单分类 没有配置页面的一级菜单
        window.location.hash = `#app/${ActiveApp.value.appCode}/${menu.key}/@t3`
    }
    
}

// 点击上一级

export const handleParentMenu = () => {
    
    window.location.hash = `#app/${ActiveApp.value.appCode}/${ActiveMenu.value.key}`
}