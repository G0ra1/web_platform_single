<template>
  <div class="studyBox">
    <n-layout style="height:100%">
      <n-layout-header style="height: 64px; width:70%;margin:auto" bordered>
        <div style="width:25%;height:64px;display:inline-block;"></div>
        <div  style="width:50%;height:64px;display:inline-block;position:absolute;line-height:64px">
          <n-menu mode="horizontal"  :options="menuOptions" default-value="homePage"/>
        </div>
        <div  style="width:25%;height:100%;display:inline-block;position:relative;left:50%"></div>
        
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; ">
        <n-layout-content
          ref="contentRef"
          :native-scrollbar="false"
        >
          <router-view /> 
          
        </n-layout-content>
      </n-layout>
     
    </n-layout>
  </div>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h,defineComponent, ref, reactive, getCurrentInstance,watch  } from "vue";
import { RouterLink,useRoute } from "vue-router";
import { NwIcon } from '@platform/main'

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
  NDivider,
  NConfigProvider
  
} from "naive-ui";
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
    NwIcon,
    NDivider
  },
  setup(props,context) {
    const route = useRoute()
    const message = useMessage();
    const pageTitle = ref("首页")
    console.log(RouterLink,'RouterLinkRouterLink')
    const menuOptions = [
      {
        label: () => h(RouterLink, {
          to: {
            path: "/homePage",
          }
        }, { default: () => "首页" }),
        key: "homePage",
        name:"首页"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/class",
          }
        }, { default: () => "课程" }),
        key: "class",
        name:"课程"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/special",
          }
        }, { default: () => "专题" }),
        key: "special",
        name:"专题"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/personalCenter",
          }
        }, { default: () => "个人中心" }),
        key: "personalCenter",
        name:"个人中心"
      },
      {
        label: () => h(RouterLink, {
          to: {
            path: "/mySpecial",
          }
        }, { default: () => "我的学习" }),
        key: "mySpecial",
        name:"我的学习"
      },
     
     
    ]
    watch(() => route.path,(to) => {

     // pageTitle.value = menuOptions.filter(d=>d.key == to.split('/')[1])[0].name
    })
    return {
      route,
      menuOptions,
      pageTitle,
     
    };
  }
});
</script>
<style lang="less" scoped>

.studyBox{
   height: 100vh
}
/deep/ .n-scrollbar > .n-scrollbar-container > .n-scrollbar-content {
  height: 100%;
}

</style>