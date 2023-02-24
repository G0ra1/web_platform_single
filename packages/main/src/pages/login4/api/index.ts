import { Request, Aes, Cookies, Db, Utils } from '@platform/main'
import sysMenu from './sys'
import demoMenu from './demo'

import { AxiosError } from "axios";
// 一般
export async function login (loginType: 'userlogin' | 'ssologin' | 'hblogin',form?: any) {
    // 设置风格
    window.localStorage.setItem('theme', 'default')
    Db.clear()
    let reqData

    if (loginType === 'userlogin') {
        const fd = new FormData()
        fd.append('username', form.username)
        fd.append('password', Aes.encrypt(form.password))

        reqData = await new Request(
            '/sys/login',
            'post',
            fd
        ).send().then(async res => {
            window.localStorage.setItem('ssologin', `${res.token_type} ${res.access_token}`)
            return res
        }).catch(error => {
            return error;
        })
    } else if (loginType === 'ssologin') {
        const params = Utils.parseQuery(window.location.search.substring(1))
        reqData = await new Request(
            `/main/api/jxLogin?ssoUserLoginName=${params.ssoUserLoginName}`,
            'get'
        ).send().then(async res => {
            
            window.localStorage.setItem('ssologin', `${res.token_type} ${res.access_token}`)
            return res
        }).catch(error => {
            return error;
        })
    } else if (loginType === 'hblogin') {
        const params = Utils.parseQuery(window.location.search.substring(1))
        reqData = await new Request(
            `/main/api/hbLogin?hbToken=${params.hbToken}`,
            'get'
        ).send().then(async res => {
            window.localStorage.setItem('ssologin', params.hbToken)

            return res
        }).catch(error => {
            return error;
        })
    }
    
    // 

    if (reqData.constructor === AxiosError) {
        throw reqData
    }

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

    // 所有应用
    const AppItems: Array<any> = (resources || []).filter((d: any) => d.bizMenuCode !== 'incloud-old').map((d: any) => {

        if (d.type !== 'group') {
            return {
                appName: d.bizMenuName,
                appCode: d.bizMenuCode,
                appType: 'service',
                type: d.type,
                icon: d.bizMenuIcon,
                url: d.url,
                sort: d.sort
            }
        }

        const menus: any = []

        const sonmenus: any = []

        const pages: any = {}

        const pageMenus: any = {}
        // 记录一级页面数据接口
        const formListUrl: any = {}

        d.mdmMenuVos.forEach((d: any) => {
            // 一级菜单
            if (d.level === 1) {

                menus.push({
                    id: d.id,
                    key: d.menuCode,
                    label: d.menuName,
                    type: d.menuType
                })
                // 这里记录一级菜单 框架页面你的接口
                // if ()
                if (d.menuType === 0) {
                    formListUrl[d.menuCode] = d.formListUrl
                }
                // 这里

            } else if (d.level === 2 && d.menuType !== 2) {
                // 二级菜单
                sonmenus.push({
                    id: d.id,
                    key: d.menuCode,
                    label: d.menuName,
                    parentId: d.parentId
                })
            } else if (d.menuType === 2) {
                // 功能
                // cpts[d.buttonCode] = d
                if (!cptsMap[d.parentId]) {
                    cptsMap[d.parentId] = {}
                }
                // cptsMap[d.parentId].push(d)
                // buttonCode
                cptsMap[d.parentId][d.buttonCode] = d
            }

            
            // if (d.formTargetUrl) {
            //     const i = d.formTargetUrl.indexOf('?')
            //     const n = d.formTargetUrl.length
            //     d.formTargetUrl[d.formTargetUrl.length - 1]

            //     if (i >= 0 && i !== (n - 1)) {
            //         // 如果已经含有了参数
            //         pages[d.menuCode] = `${d.formTargetUrl}&menuId=${d.id}`
            //     } else if (i >= 0 && i === (n - 1)) {
            //         // 
            //         pages[d.menuCode] = `${d.formTargetUrl}menuId=${d.id}`
            //     } else {
            //         pages[d.menuCode] = `${d.formTargetUrl}?menuId=${d.id}`
            //     }
            // }
            if (d.formTargetUrl) {
                
                pages[d.menuCode] = Utils.addParamtoUrl(d.formTargetUrl, `menuId=${d.id}`)
                // console.log(pages[d.menuCode])
                pageMenus[d.id] = {
                    name: d.menuName,
                    icon: d.menuIcon,
                    icon2: d.bizMenuIcon,
                    code: d.menuCode
                }
            }
        })
        // 获取二级以上菜单和页面
        const allMenus = d.mdmMenuVos.filter((d: any) => d.level > 1 && (d.menuType === 1 || d.menuType === 3))
        menus.forEach((m: any) => {
            // 处理一级菜单配置了页面的
            if (m.type === 0) {
                m.sonMenus = sonmenus.filter((m2: any) => m2.parentId === m.id)
            } else if (m.type === 3) {
                // 处理 d.type === 3
                // 这里需要递归生成子菜单
                const _cache: any = {
                    [`${m.id}`]: {
                        ...m,
                        children: []
                    }
                }
                allMenus.forEach((d: any) => {
                    // 本节点表单
                    if (!_cache[d.id]) {
                        const menu: any = {
                            id: d.id,
                            label: d.menuName,
                            key: d.menuCode,
                            type: d.menuType
                        }
                        if (d.menuType === 3) menu.children = []
                        _cache[d.id] = menu
                    }
        
                    // _cache[d.id] = 
                    if (d.parentId === m.id) {
                        _cache[m.id].children.push(_cache[d.id])
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
                m.sonMenus = _cache[m.id].children
                // 这里记录一个默认页面
                
            }
            
        })
        
        return {
            appName: d.bizMenuName,
            appCode: d.bizMenuCode,
            appType: 'service',
            type: 'group',
            icon: d.bizMenuIcon,
            sort: d.sort,
            menus,
            pages,
            pageMenus,
            formListUrl
        } 
    })

    // 记录菜单信息
    // const AppItems2 = (resources || []).map((d: any) => {
    //     // 生成menus  menuType：  0 菜单、1页面、 2按钮
    //     const menus: any = [] // d.mdmMenuVos.filter((m: any)=> m.menuType === 0 || m.menuType === 1)

    //     // 获取页面映射
    //     const pages: any = {}

    //     // 
    //     const menus1:Array<any> = []
    //     d.mdmMenuVos.forEach((d: any) => {
    //         if (d.level === 1) {
    //             menus1.push(d)
    //         }

    //         if (d.formTargetUrl) {
    //             const i = d.formTargetUrl.indexOf('?')
    //             const n = d.formTargetUrl.length
    //             d.formTargetUrl[d.formTargetUrl.length - 1]

    //             if (i >= 0 && i !== (n - 1)) {
    //                 // 如果已经含有了参数
    //                 pages[d.menuCode] = `${d.formTargetUrl}&menuId=${d.id}`
    //             } else if (i >= 0 && i === (n - 1)) {
    //                 // 
    //                 pages[d.menuCode] = `${d.formTargetUrl}menuId=${d.id}`
    //             } else {
    //                 pages[d.menuCode] = `${d.formTargetUrl}?menuId=${d.id}`
    //             }
    //         }
    //     })

    //     // d.mdmMenuVos.forEach((d: any) => {
    //     //     if (d.menuType === 0) {
    //     //         // 含有子页面的
    //     //         menus.push(d)
    //     //     } else if (d.menuType === 1) {
    //     //         // 这里组合url时 要带参menu id
    //     //         // 判断是否有? 待办
    //     //         if (d.formTargetUrl) {
    //     //             const i = d.formTargetUrl.indexOf('?')
    //     //             const n = d.formTargetUrl.length
    //     //             d.formTargetUrl[d.formTargetUrl.length - 1]

    //     //             if (i >= 0 && i !== (n - 1)) {
    //     //                 // 如果已经含有了参数
    //     //                 pages[d.menuCode] = `${d.formTargetUrl}&menuId=${d.id}`
    //     //             } else if (i >= 0 && i === (n - 1)) {
    //     //                 // 
    //     //                 pages[d.menuCode] = `${d.formTargetUrl}menuId=${d.id}`
    //     //             } else {
    //     //                 pages[d.menuCode] = `${d.formTargetUrl}?menuId=${d.id}`
    //     //             }
    //     //         }
    //     //         menus.push(d)
    //     //     } else if (d.menuType === 2) {
    //     //         // cpts[d.buttonCode] = d
    //     //         if (!cptsMap[d.parentId]) {
    //     //             cptsMap[d.parentId] = {}
    //     //         }
    //     //         // cptsMap[d.parentId].push(d)
    //     //         // buttonCode
    //     //         cptsMap[d.parentId][d.buttonCode] = d
    //     //     }
            
    //     // })
    //     // menus 转换层叠
    //     // const _cache: any = {
    //     //     '0': {
    //     //         id: 'root',
    //     //         label: 'root',
    //     //         key: 'root',
    //     //         children: []
    //     //     }
    //     // }
    //     // menus.forEach((d: any) => {

    //     //     // 本节点表单
    //     //     if (!_cache[d.id]) {
    //     //         const menu: any = {
    //     //             id: d.id,
    //     //             label: d.menuName,
    //     //             key: d.menuCode,
    //     //             type: d.menuType
    //     //         }
    //     //         if (d.menuType === 0) menu.children = []
    //     //         _cache[d.id] = menu
    //     //     }

    //     //     // _cache[d.id] = 
    //     //     if (d.parentId === '0') {
    //     //         _cache['0'].children.push(_cache[d.id])
    //     //     } else if(!_cache[d.parentId]) {
    //     //         // 缓存中没有找到对应父级对象
    //     //         const menu = menus.find((m: any) => m.id === d.parentId)
    //     //         _cache[d.parentId] = {
    //     //             id: menu.id,
    //     //             label: menu.menuName,
    //     //             key: menu.menuCode,
    //     //             type: menu.menuType,
    //     //             children: [
    //     //                 _cache[d.id]
    //     //             ]
    //     //         }
    //     //     } else {
    //     //         _cache[d.parentId].children.push(_cache[d.id])
    //     //     }
    //     // })

    //     // console.log('------_cache-------', _cache[0].children, JSON.stringify(_cache[0].children));

    //     // 
    //     // 生成pages
    //     return {
    //         appName: d.appName,
    //         appCode: d.appCode,
    //         appType: 'service',
    //         icon: d.appIcon,
    //         menus: _cache[0].children,
    //         pages: pages,
    //         // cpts: cpts
    //     }

    // })
    
    // 记录App

    // 这里需要同步
    // console.log(AppItems)
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