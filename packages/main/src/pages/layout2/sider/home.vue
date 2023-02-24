<template>
  <n-popover
    v-if="menuOptions.length"
    :overlap="false"
    placement="right-start"
    trigger="hover"
    :show-arrow="false"
    >
        <template #trigger>
          <n-badge :value="messageNum" :max="99">
            <div
                :class="{
                    'wrapper-menu-item': true,
                    'action':  props.isActive
                }"
            >
                <nw-icon name="icon-n-n-menhu" :size="24" />
                门户
            </div>
            </n-badge>
        </template>
        <n-menu
          :options="menuOptions"

          :value="''"
          @update:value="handleMenu"
          
        />
        <!-- <div>
            <div>App资源管理</div>
            <div>角色权限管理</div>
            <div>工作流管理</div>
            <div>门户管理</div>
        </div> -->
    </n-popover>
</template>

<script lang="tsx">
import { h, ref, defineComponent } from 'vue'
import { NMenu, NPopover, } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, Db } from '@platform/main'
import { get } from 'lodash'

import { ActiveApp } from './store'
// const menuOptions: MenuOption[] = [
  
//   {
//     label: '应用资源管理',
//     key: 'app',
//   },
//   {
//     label: '主数据管理',
//     key: 'mdm',
//   },
//   // {
//   //   label: '角色权限管理',
//   //   key: 'rule',
//   // },
//   {
//     label: '工作流管理',
//     key: 'wf',
//   },
//   // {
//   //   label: '门户管理',
//   //   key: 'portalframe',
//   // }
// ]

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NMenu,
    NPopover,
    NwIcon
  },
  setup (props) {
    const menuOptions = ref([])

    Db.get('portalInfo').then((portals: Array<any>) => {
      menuOptions.value = get(portals, 'menus', [])
    })
    return {
      props,
      menuOptions,
      handleMenu (d: string) {
        window.location.hash = `#portalframe/${d}`
      }
    }
  }
})
</script>

