import { h, createApp as basicCreateApp, defineComponent, provide, ref } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { get } from 'lodash'
import db from '/@/utils/db.js'
import cookies from '/@/utils/cookies.js'
import { parseQuery } from '/@/utils/index.js'
import { createMenuOption } from '/@/utils/index.js'
import { setUserInfo, setMenuHeader, setMenuSide, setSystem } from '/@/store/account.js'
import redirectPage from '/@/plugins/redirect-page'
import 'xe-utils'
import 'vxe-table/lib/style.css'
import '/src-common/style/nw-modal.less'
// import 'element-plus/packages/theme-chalk/src/base.scss'
import '/@/style/index.less'
import VXETable from 'vxe-table'
// import '/@/mock'
import NwPower from '/@/components/nw-btn-power/index.vue'
import NwWf from '/@/components/nw-btn-power-wf/index.vue'
import NwBtnWf from '/@/components/nw-btn-wf/index.vue'


import { 
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NGlobalStyle,
} from 'naive-ui'

import {
  getAuthResSingle,
  getAuthMenu

} from '/@/api'
// import routes from '/@/router/routes.js'

// 初始化创建App，其中含有初始化用户以及
/**
 * 从db中获取用户信息载入到store
 * 从db中获取菜单信息分别生成route和menu option 载入到store
 *  */
export async function createApp(v, route = [], pageFlag = true, isLayout = false) {
  // 这里判断是否含有token
  // if (!cookies.get('token')) {
  //   redirectPage(`login.html`)
  //   return;
  // }

  return basicCreateApp({
    render: () => <NConfigProvider class="content" abstract >
      {{
          default: () => [
              <NMessageProvider>
              {{
                  default: () => [
                      <NNotificationProvider>
                          {{
                              default: () => [
                                  <NDialogProvider>
                                      {{
                                          default: () => [
                                              h(v)
                                          ]
                                      }}
                                  </NDialogProvider>
                              ]
                          }}
                      </NNotificationProvider>
                  ]
              }} 
          </NMessageProvider>]
      }}
  </NConfigProvider>,
  }).use(VXETable)
}