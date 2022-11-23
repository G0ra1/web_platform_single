import { Request, Aes, Cookies, Db } from '@platform/main'
import sysMenu from './sys'
import demoMenu from './demo'
// 一般
export async function login (form: any) {
    Db.clear()
    const fd = new FormData()
    fd.append('username', form.username)
    fd.append('password', Aes.encrypt(form.password))

    const reqData = await new Request(
        '/sys/login',
        'post',
        fd
    ).send().then(async data => {
        

        return data
    })
    Cookies.remove("token");
    Cookies.remove("tokenType");
    Cookies.set("token", reqData.access_token);
    Cookies.set("tokenType", reqData.token_type);
    // 这里写入db 用户信息
    const {
        resources,
        portalInfo,
        ...userInfo
    } = reqData.loginUser

    await Db.set('userInfo', userInfo)

    // cpts 要在外部建立独立变量
    // 功能
    const cptsMap: any = {}
    // 记录菜单信息
    const AppItems = (resources || []).filter((d: any) => d.bizMenuCode !== 'incloud-old').map((d: any) => {
        // 生成menus  menuType：  0 菜单、1页面、 2按钮
        const menus: any = [] // d.mdmMenuVos.filter((m: any)=> m.menuType === 0 || m.menuType === 1)

        // 获取页面映射
        const pages: any = {}

        d.mdmMenuVos.forEach((d: any) => {
            // 菜单类型
            if (d.menuType === 0 || d.menuType === 3) {
                menus.push(d)
            } else if (d.menuType === 1) {
                // 这里组合url时 要带参menu id
                // 判断是否有? 待办
                if (d.formTargetUrl) {
                    const i = d.formTargetUrl.indexOf('?')
                    const n = d.formTargetUrl.length
                    d.formTargetUrl[d.formTargetUrl.length - 1]

                    if (i >= 0 && i !== (n - 1)) {
                        // 如果已经含有了参数
                        pages[d.menuCode] = `${d.formTargetUrl}&menuId=${d.id}`
                    } else if (i >= 0 && i === (n - 1)) {
                        // 
                        pages[d.menuCode] = `${d.formTargetUrl}menuId=${d.id}`
                    } else {
                        pages[d.menuCode] = `${d.formTargetUrl}?menuId=${d.id}`
                    }
                }
                menus.push(d)
            } else if (d.menuType === 2) {
                // cpts[d.buttonCode] = d
                if (!cptsMap[d.parentId]) {
                    cptsMap[d.parentId] = {}
                }
                // cptsMap[d.parentId].push(d)
                // buttonCode
                cptsMap[d.parentId][d.buttonCode] = d
            }
            
        })
        // menus 转换层叠
        const _cache: any = {
            '0': {
                id: 'root',
                label: 'root',
                key: 'root',
                children: []
            }
        }
        menus.forEach((d: any) => {

            // 本节点表单
            if (!_cache[d.id]) {
                const menu: any = {
                    id: d.id,
                    label: d.menuName,
                    key: d.menuCode,
                    type: d.menuType
                }
                if (d.menuType === 0 || d.menuType === 3) menu.children = []
                _cache[d.id] = menu
            }

            // _cache[d.id] = 
            if (d.parentId === '0') {
                _cache['0'].children.push(_cache[d.id])
            } else if(!_cache[d.parentId]) {
                // 缓存中没有找到对应父级对象
                const menu = menus.find((m: any) => m.id === d.parentId)
                _cache[d.parentId] = {
                    id: menu.id,
                    label: menu.menuName,
                    key: menu.menuCode,
                    type: menu.menuType,
                    children: [
                        _cache[d.id]
                    ]
                }
            } else {
                _cache[d.parentId].children.push(_cache[d.id])
            }
        })

        // console.log('------_cache-------', _cache[0].children, JSON.stringify(_cache[0].children));

        // 
        // 生成pages
        return {
            appName: d.bizMenuName,
            appCode: d.bizMenuCode,
            appType: 'service',
            icon: d.bizMenuIcon,
            menus: _cache[0].children,
            pages: pages,
            // cpts: cpts
        }

    })
    
    // 这里需要同步
    await Db.set('bizMenuInfo', [
        ...AppItems,
        // ...demoMenu,
        ...sysMenu
    ])

    const portalMenus: Array<any> = []
    
    const portalPages: any = {};

    (portalInfo || []).forEach((d: any) => {
        portalMenus.push({
            label: d.portalName,
            key: d.id
        })
        portalPages[d.id] = `/web-old/html/portal/template-render.html?portalid=${d.id}#/index`
    })

    // 这里设置门户
    await Db.set('portalInfo', {
        menus: portalMenus,
        pages: portalPages
    })
    // await Db.set('portalInfo', {
    //     menus: [
    //         {
    //             label: '门户1',
    //             key: 'code1'
    //         }
    //     ],
    //     pages: {
    //         'code1': ''
    //     }

    // })

    
    // 记录 frame页面
    // await Db.set('customHtml', [
    //     // 
    //     {
    //         key: 'home',
    //         icon: 'icon-n-n-home',
    //         label: '门户首页',
    //         url: '/web-old/html/portal/template-render.html?portalid=144774667764026982#/index'
    //     },
    //     {
    //         key: 'data-manage',
    //         icon: 'icon-n-n-date',
    //         label: '日程管理',
    //         url: 'http://localhost:3000/web-smm/pages/scheduleManagement.html'
    //     },
    // ])
    // 记录功能信息
    await Db.set('cpts', cptsMap)

    return 
}