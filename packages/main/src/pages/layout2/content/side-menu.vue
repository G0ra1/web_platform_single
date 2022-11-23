<template>
  <div class="app-menu">
    <n-scrollbar class="content">
      <n-menu
        :indent="8"
        :options="MenuOptions"
        :value="MenuCode"
        @update:value="handleMenu"
        :theme-overrides="{
          itemHeight: '32px',
          borderRadius:'2px'
        }"
      />
    </n-scrollbar>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, h, Component, ref, computed, inject } from 'vue'
import {
  NIcon,
  NMenu,
  NScrollbar,
  useMessage
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { collapseTransitionLight } from 'naive-ui/es/collapse-transition/styles'
import { AppInfo, MenuCode, MenuOptions, setMenuHash } from './store'

// f
// const menuOptions: MenuOption[] = [
//   {
//     label: '鱼',
//     key: 'fish',
//     children: [
//       {
//         label: '红烧',
//         key: 'braise',
//         children: [
//           {
//             label: '加辣',
//             key: 'spicy'
//           }
//         ]
//       },
//       {
//         label: '清蒸',
//         key: 'steamed',
//         children: [
//           {
//             label: '不要葱',
//             key: 'no-green-onion'
//           }
//         ]
//       }
//     ]
//   }
// ]

export default defineComponent({
  components: {
    NMenu,
    NScrollbar,
  },
  setup() {

    return {
      AppInfo,
      MenuCode,
      MenuOptions,
      handleMenu(code: string) {
        // alert(code)
        setMenuHash(code)
      }
    }
  }
})
</script>
<style lang="less">
.app-menu {
  display: flex;
  flex-direction: column;
  flex: 1;

  >.title {
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 18px;
    font-weight: bold;
    text-indent: 10px;
  }

  >.content {
    flex: 1;

    .n-menu-item-content-header {
      padding-left: 15px;
    }
  }
}
</style>