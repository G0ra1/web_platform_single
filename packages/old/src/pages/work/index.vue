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
            {{active.name}}
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
          <n-list class="app-list">
            
            <n-list-item
              v-for="item in systemItems"
              :key="item.code"
              :class="{
                active: item.code === active.code
              }"
              @click="handleSystem(item)"
            >
              <template #prefix>
                <nw-icon
                  :name="item.icon"
                  :size="24"
                />
              </template>
              <template #suffix>
                (10)
              </template>
              {{item.name}}
            </n-list-item>
          </n-list>
        </n-layout-sider>
        <n-layout-content
          class="app-area"
          :native-scrollbar="false"
        >
          <div class="app-area-group" v-if="resourceItems.filter(d => !d.children).length" >
            <ul class="app-area-ul">
              <li
                v-for="item in resourceItems.filter(d => !d.children)"
                :key="item.code"
                @click="handleRes(item)"
              >
                <nw-icon
                  :name="item.icon"
                  :size="58"
                />
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="app-area-group" v-for="item in resourceItems.filter(d => d.children)" :key="item.code" >
            <n-h6 prefix="bar">
              {{item.name}}
            </n-h6>
            <ul class="app-area-ul">
              <li
                v-for="box in item.children"
                :key="box.code"
                @click="handleRes(box)"
              >
                <nw-icon
                  :name="box.icon"
                  :size="58"
                />
                <span>{{box.name}}</span>
              </li>
            </ul>
          </div>
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
  import {
    getAuthSys,
    getAuthRes
  } from './api'

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
      // 这里请求子系统
      // const systemItems = [
      //   {
      //     code: 'zuijinshiyong',
      //     name: '最近使用',
      //     icon: 'icon-zuijin'
      //   },
      //   {
      //     code: 'mdm',
      //     name: '主数据系统',
      //     icon: 'icon-zhushuju'
      //   },
      //   {
      //     code: 'portal',
      //     name: '门户系统',
      //     icon: 'icon-menhu'
      //   },
      //   {
      //     code: 'process',
      //     name: '工作流系统',
      //     icon: 'icon-gongzuoliu'
      //   },
      //   {
      //     code: 'expense',
      //     name: '报销系统',
      //     icon: 'icon-baoxiao'
      //   },
      //   {
      //     code: 'budget',
      //     name: '预算系统',
      //     icon: 'icon-yusuan'
      //   },
      //   {
      //     code: 'client',
      //     name: '客商系统',
      //     icon: 'icon-yusuan'
      //   },
      //   {
      //     code: 'client',
      //     name: '客商系统',
      //     icon: 'icon-yusuan'
      //   },
      // ]
      const active = ref({}) // 当前选择的子系统
      const systemItems = ref([]) // 子系统列表
      const resourceItems = ref([])
      getAuthSys().then(async res => {
        // 获取子系统
        systemItems.value = res.list
        console.log('====getAuthSys===', res);
        return res.list[0]
      }).then(async res => {
        // 默认选择第一个
        active.value = res
        return getAuthRes(res.code)
      }).then(res => {
        resourceItems.value = res.list
        console.log('=resourceItems==', resourceItems)
      })
      return {
        active,
        systemItems,
        resourceItems,
        handleSystem (item) {
          active.value = item
          getAuthRes(item.code).then(res => {
            resourceItems.value = res.list
            console.log('=resourceItems==', resourceItems)
          })
        },
        handleRes (item) {
          window.open(`/html/${item.system}/${item.code}.html`,'_blank')
        }
      }
    }
  })
</script>
<style lang='less'>
.app-list {
  &.n-list {
    >.n-list-item {
      padding: 12px 25px;
      cursor: pointer;
      //#4e97ff
      &.active {
        background:#3f8fff;
        color: #fff;
        >.n-list-item__prefix {
          color: #fff
        }
      }
      >.n-list-item__prefix {
        display: flex;
        justify-content: center;
        color: #4e97ff
      }
    }
  }
}
.app-area {
  &-group {
    padding: 20px;
  }
  &-ul {
    li{
      // float: left;
      width: 184px;
      height: 72px;
      line-height: 72px;
      display: inline-flex;
      cursor: pointer;
      // padding-left: 12px;
      // margin-right: 16px;
      margin-bottom: 24px;
      overflow: hidden;
      span {
        display: inline-block;
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
  }
}
</style>