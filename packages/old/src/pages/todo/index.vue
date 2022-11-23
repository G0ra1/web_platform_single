<template>
  <div class="main-layout" >
    <!-- <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">海淀桥</n-layout-sider>
        <n-layout-content content-style="padding: 24px;">平山道</n-layout-content>
      </n-layout>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout> -->
    <n-layout position="absolute">
      <n-layout-header
        bordered
        class="main-layout-header"
      >

        <n-layout has-sider >
          <n-layout-sider
            :width="230"
            bordered
            class="header-search"
          >
            <n-input
              size="small"
              placeholder="输入查询的应用"
            >
              <template #prefix >
                <nw-icon name="icon-sousuo" :size="20" color="#ccc" />
              </template>
            </n-input>
          </n-layout-sider>
          <n-layout-content class="header-title" >
            审批
          </n-layout-content>
        </n-layout>
      </n-layout-header>
      <n-layout
        has-sider
        class="main-layout-body"
      >
        <n-layout-sider
          :width="230"
          bordered
          class="app-list"
          :native-scrollbar="false"
        >
          <n-list class="todo-list">
            <n-list-item
              v-for="item in systemItems"
              :key="item.code"
              :class="{
                active: item.code === active
              }"
            >
              <template #prefix>
                <nw-icon
                  :name="item.icon"
                  :size="24"
                />
              </template>
              {{item.name}}
            </n-list-item>
          </n-list>
        </n-layout-sider>
        <n-layout-content
          class="app-area"
          :native-scrollbar="false"
        >
          <!--代办的列表-->

        </n-layout-content>
      </n-layout>
     
    </n-layout>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NMessageProvider,
    NNotificationProvider,
    NConfigProvider,
    NSpin,
    NInput,
    NInputGroup,
    NButton,
    NList,
    NListItem,
    NSelect,
    NH6,
    NSpace
  } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'

  export default defineComponent({
    components: {
      NLayout,
      NLayoutHeader,
      NLayoutSider,
      NLayoutContent,
      NLayoutFooter,
      NMessageProvider,
      NNotificationProvider,
      NConfigProvider,
      NSpin,
      NInput,
      NInputGroup,
      NButton,
      NwIcon,
      NList,
      NListItem,
      NSelect,
      NH6,
      NSpace
    },
    setup () {
      const systemItems = [
        {
          code: 'mdm',
          name: '主数据系统',
          icon: 'icon-zhushuju'
        },
        {
          code: 'portal',
          name: '门户系统',
          icon: 'icon-menhu'
        },
        {
          code: 'process',
          name: '工作流系统',
          icon: 'icon-gongzuoliu'
        },
        {
          code: 'expense',
          name: '报销系统',
          icon: 'icon-baoxiao'
        }
      ]
      const aa = ref([])
      const active = ref('mdm')
      return {
        active,
        systemItems,
        aa,
        onv (p) {
          aa.value = p
          console.log(p);
        },
        test () {
          aa.value = ['2']
        }
      }
    }
  })
</script>
<style lang='less'>
.todo-list {
  &.n-list {
    >.n-list-item {
      padding: 12px 25px;
      //#4e97ff
      // &.active {
      //   background:#3f8fff;
      //   color: #fff;
      //   >.n-list-item__prefix {
      //     color: #fff
      //   }
      // }
      // >.n-list-item__prefix {
      //   display: flex;
      //   justify-content: center;
      //   color: #4e97ff
      // }
    }
  }
}
</style>