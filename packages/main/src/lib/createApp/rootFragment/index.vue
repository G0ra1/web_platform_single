
<template>
  <n-config-provider
  :themeOverrides="ThemeConfig"
  :locale="zhCN" 
  :date-locale="dateZhCN"

  :style="{
    height: '100%',
    width: '100%',
    padding: props.isLayout ? '0' : '1px',
    boxSizing: 'border-box'
  }">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <template v-if="isShowTitle" >
            <div class="layout">
              <div class="header-title" >
                <span class="icon-border"><nw-icon :name="menuRef.icon || menuRef.icon2" /></span>
                <span class="text">{{ menuRef.name }}</span>
              </div>
              <div class="content">
                <slot />
              </div>
            </div>
          </template>
          <template v-else>
            <slot />
          </template>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'

import '../../../theme/default/index.less'
import '../../../theme/theme1/index.less'
import '../../../theme/theme2/index.less'
// import { getStyleElement } from '../../../theme/common'
import { setTheme, ThemeClassName, ThemeConfig } from '../../../theme'

import { Utils, Db } from '@platform/main'
import NwIcon from '../../../components/nw-icon/index.vue'
import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NGlobalStyle,
  zhCN,
  dateZhCN
} from 'naive-ui'

export default defineComponent({
  props: {
    isLayout: {
      type: Boolean
    }
  },
  components: {
    NwIcon,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NGlobalStyle,

  },
  setup(props) {
    // 切换
    setTheme(window.localStorage.getItem('theme') || 'default')
    // setTimeout(() => {
    //   setTheme('theme1')
    // }, 5000)
    const menuRef = ref<any>({})
    // 这里获取mentId
    const params = Utils.parseQuery(window.location.search.substring(1))
    if (params.menuId) {
      // 获取到menuId 根据menuId获取菜单名和图标
      Db.get('bizMenuInfo').then((apps: Array<any>) => {
        
        apps.find(d => {
          const menu: any = d.pageMenus[params.menuId]
          if (menu) {
            menuRef.value = menu
            return true
          }
          return false
        })
      })
    }
    return {
      menuRef,
      props,
      ThemeClassName,
      ThemeConfig,
      isShowTitle: !!params.menuId, // 当页面url含有menuId时展现标题行
      zhCN,
      dateZhCN
    }
  }
})

</script>
<style lang="less" scoped>
.layout {
  padding: 12px;
  box-shadow: 0px 0px 2px 0px rgb(143, 143, 143);
  height: 100%;
  .header-title {
      display: flex;
      align-items: center;
      height: 45px;
      font-size: 14px;
      background: #F8F8F8;
      padding-left: 20px;
      
      >.text {
        margin-left: 5px;
      }
  }
  .content {
    height: calc(100% - 72px);
    padding: 5px 0;
  }
  
}
</style>