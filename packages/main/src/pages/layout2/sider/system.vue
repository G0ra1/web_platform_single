<template>
  <n-popover
    :overlap="false"
    placement="right-start"
    trigger="hover"
    :show-arrow="false"
    >
        <template #trigger>
            
            <div
                :class="{
                    'wrapper-menu-item-last': true,
                    'wrapper-menu-item': true,
                }"
                @click=""
            >
                <nw-icon name="icon-n-n-sys" :size="32" />
            </div>
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
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

const menuOptions: MenuOption[] = [
  
  {
    label: '应用资源管理',
    key: 'app',
  },
  {
    label: '平台组织用户',
    key: 'mdm',
  },
  // {
  //   label: '角色权限管理',
  //   key: 'rule',
  // },
  {
    label: '工作流管理',
    key: 'wf',
  },
  // {
  //   label: '门户管理',
  //   key: 'portalframe',
  // }
]

export default defineComponent({
  components: {
    NMenu,
    NPopover,
    NwIcon
  },
  setup () {
    return {
      collapsed: ref(true),
      menuOptions,
      renderMenuLabel (option: MenuOption) {
        if ('href' in option) {
          return h(
            'a',
            { href: option.href, target: '_blank' },
            option.label as string
          )
        }
        return option.label as string
      },
      renderMenuIcon (option: MenuOption) {
        // 渲染图标占位符以保持缩进
        if (option.key === 'sheep-man') return true
        // 返回 falsy 值，不再渲染图标及占位符
        if (option.key === 'food') return null
        return <NwIcon name="icon-n-n-sys" />
      },
      expandIcon () {
        return <span></span>
      },
      handleMenu (d: string) {
        window.location.hash = `#app/${d}`
      }
    }
  }
})
</script>

