import {
    createApp as vCreateApp, h, defineComponent, onBeforeMount, defineAsyncComponent, getCurrentInstance } from 'vue'
import type { CreateAppFunction, Component } from 'vue'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import VXETable from 'vxe-table'
import mitt from 'mitt'

// import '../../theme/index.less'
import { getStyleElement } from '../../theme/common'

import '../../theme/index.less'
import { 
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NGlobalStyle,
    useMessage,
    useDialog
} from 'naive-ui'
import { Utils, Cookies, Db } from '@platform/main'

import RootFragment from './rootFragment/index.vue'
// 业务页面加载
const queryPage = async () => {

}

// 回到登录
const jumpToLogin = () => {
    window.location.href = '/web-main/pages/login.html'
}
// : CreateAppFunction<Element>
const createApp = (component: Component, isLayout: boolean = false) => {
    
    const LoadingComponent = defineComponent({
        provide: {},
        render: () => <div style="display:flex;height:100%;justify-content: center;align-items: center;" >
            <img src="/loading.svg" />
        </div>
    })

    return vCreateApp(defineAsyncComponent({
        loader: async () => {
            // 这里生成样式静态变量
            document.head.appendChild(getStyleElement())

            // 赋值apiBaseUrl
            window.apiBaseURL = window.localStorage.getItem('apiBaseURL') || ''
            window.websocketURL = window.localStorage.getItem('websocketURL') || ''
            window.fileServerUrl = window.localStorage.getItem('fileServerUrl') || ''
            window.ueServerUrl = window.localStorage.getItem('ueServerUrl') || ''
            
            if (!window.apiBaseURL) {
                jumpToLogin()
            }
            // token 验证
            if (!Cookies.get('token')) {
                jumpToLogin()
            }
            // // 获取用户信息
            await Db.get('userInfo').then((res: any) => {
                if (!res) {
                    jumpToLogin()
                }
            })
            // 判断是否为业务页面
            const params = Utils.parseQuery(window.location.search.substring(1))
            // const FnItem: Array<any> = []
            let FnItem: any = {}
            if (params && params['menuId']) {
                // 如果是具有权限的页面则获取功能信息
                const cptsMap = await Db.get('cpts').then((res: any) => res)
                FnItem = cptsMap[params['menuId']]
            }
            // RootFragment
            return defineComponent({
                provide: {
                    FnItem,
                    Emitter: mitt()
                },
                render: () => <RootFragment isLayout={isLayout}>
                    {{
                        default: () => [
                            <Root>
                                {{
                                    default: () => [
                                        h(component)
                                    ]
                                }}
                            </Root>
                        ]
                    }}
                </RootFragment>,
                setup: (props, context) => {
                    // 这里进行验证
                    return {}
                }
            })
            // 这里进行验证
            // return defineComponent({
            //     provide: {
            //         FnItem
            //     },
            //     render: () => <NConfigProvider class="content" themeOverrides={theme} >
            //         {{
            //             default: () => [
            //                 <NGlobalStyle />,
            //                 <NMessageProvider>
            //                 {{
            //                     default: () => [
            //                         <NNotificationProvider>
            //                             {{
            //                                 default: () => [
            //                                     <NDialogProvider>
            //                                         {{
            //                                             // default: () => [
            //                                             //     h(component)
            //                                             // ],
                                                        
            //                                             default: () => [
            //                                                 <Root>
            //                                                     {{
            //                                                         default: () => [
            //                                                             h(component)
            //                                                         ]
            //                                                     }}
            //                                                 </Root>
            //                                             ],
            //                                         }}
            //                                     </NDialogProvider>
            //                                 ]
            //                             }}
            //                         </NNotificationProvider>
            //                     ]
            //                 }} 
            //             </NMessageProvider>]
            //         }}
            //     </NConfigProvider>,
            //     setup: (props, context) => {
            //         // 这里进行验证
                    
            //         return {}
            //     }
            // })
        },
        loadingComponent: LoadingComponent
    })).use(VXETable);
}

const Root = defineComponent({
    setup: (props, context) => {
        const instance: any = getCurrentInstance();
        (window as any).NaiveMessage = useMessage();
        (window as any).NaiveDialog = useDialog();
        return () => {
            return instance!.slots.default()
        }
    }
})
export {
    createApp
}