<template>
  <n-layout has-sider class="nw-layout-full">
    <n-layout-sider
      bordered
      width="225"
      content-style="padding: 5px;"
      style="margin-right: -1px"
    >
      <h3 style="margin: 0; padding-left: 10px;">任务中心</h3>
      <n-menu :options="menuOptions" @update:value="handleUpdateValue" default-value="todo" />
    </n-layout-sider>
    <n-layout class="nw-layout-full">
      <router-view />
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="drawerActive" width="100%" content-style="overflow:hidden">
    <iframe ref="iframeRef" :src="iframeUrl" style="border: 0;width: 100%;height: 100%;overflow: hidden" />
  </n-drawer>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h, defineComponent, ref, reactive, getCurrentInstance, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { NwIcon } from '@platform/main';
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
  NMenu,
  NConfigProvider

} from "naive-ui";
import { drawerActive, iframeUrl } from '../store/index.js'

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NMenu,
    useMessage,
    NConfigProvider,
    NwIcon
  },
  setup(props, context) {
    const route = useRoute()
    const message = useMessage();
    const pageTitle = ref("我的待办")
    const menuOptions = [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/todo",
          }
        }, { default: () => "我的待办" }),
        key: "todo",
        name: "我的待办"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/draft",
          }
        }, { default: () => "我的草稿" }),
        key: "draft",
        name: "我的草稿"
      },

      {
        label: () => h(RouterLink, {
          to: {
            path: "/havedone",
          }
        }, { default: () => "我的已办" }),
        key: "havedone",
        name: "我的已办"
      },
      // {
      //   label: () => h(RouterLink, {
      //     to: {
      //       path: "/forwarded",
      //     }
      //   }, { default: () => "我的转办" }),
      //   key: "forwarded",
      //   name:"我的转办"
      // },
      // {
      //   label: () => h(RouterLink, {
      //     to: {
      //       path: "/delegationTask",
      //     }
      //   }, { default: () => "委托的待办" }),
      //   key: "delegationTask",
      //   name:"委托的待办"
      // },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/induplicate",
          }
        }, { default: () => "收到的传阅" }),
        key: "induplicate",
        name: "收到的传阅"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/outduplicate",
          }
        }, { default: () => "发出的传阅" }),
        key: "outduplicate",
        name: "发出的传阅"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/receive-notify",
          }
        }, { default: () => "收到的知会" }),
        key: "receive-notify",
        name:"收到的知会"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/send-notify",
          }
        }, { default: () => "发出的知会" }),
        key: "send-notify",
        name:"发出的知会"
      }
      // {
      //   label: () => h(RouterLink, {
      //     to: {
      //       path: "/wfmydrafttask",
      //     }
      //   }, { default: () => "发起的流程" }),
      //   key: "wfmydrafttask",
      //   name:"发起的流程"
      // },
    ]
    watch(() => route.path, (to) => {
      // console.log('监听到变化')
      // console.log(to)
      // console.log(to.split('/')[1])
      // console.log(menuOptions.filter(d=>d.key == to.split('/')[1])[0].name)
      pageTitle.value = menuOptions.filter(d => d.key == to.split('/')[1])[0].name
    })
    return {
      drawerActive,
      iframeUrl,
      route,
      menuOptions,
      pageTitle,
      handleUpdateValue(key, item) {
        console.log(menuOptions)
        // message.info("[onUpdate:value]: " + JSON.stringify(key));
        // message.info("[onUpdate:value]: " + JSON.stringify(item));
      }
    };
  }
});
</script>
<style lang="less">
.nw-wfpage.n-layout>.n-layout-scroll-container>.n-layout-header {
  height: 54px;
  background-color: #fff;
}

.nw-wfpage {
  .my-wf-sider {
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.08);
    background-color: #e6e9f0;
    padding-bottom: 5px;

    .n-layout-sider-scroll-container {
      background-color: #fff;
    }
  }

  .nw-wfpage-layout {
    height: ~"calc(100% - 55px)";
  }

  .n-menu .n-menu-item::before {
    left: 0 !important;
    right: 0 !important;
  }
}

.n-menu .n-menu-item-content .n-menu-item-content-header {
  transition: color 0s var(--n-bezier), opacity 0s var(--n-bezier);
}

.n-menu .n-menu-item.n-menu-item--selected .n-menu-item-content .n-menu-item-content-header:hover {
  color: #3f8fff;
}
</style>