<template>
    <n-layout  class="nw-layout-full" content-style="height: 100%">
      
      <n-layout-header class="nw-layout-header" >
      </n-layout-header>

      <n-layout-content>
        <n-spin :show="false">
          <n-scrollbar>
            <div
              v-for="item in list"
              :key="item.id"
              :class="{
                'bizmenu-item': true,
                'active': props.value === item.code
              }"
              @click="handle(item)"
            >
              <div class="icon">
                <NwIcon :name="item.icon" :size="16" />
              </div>
              <div class="text">
                {{item.name}}
              </div>
            </div>
          </n-scrollbar>
        </n-spin>
      </n-layout-content>
    </n-layout>

</template>
<script lang="tsx">
import { ref, reactive, nextTick, h, computed, onMounted } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSelect,
  NSwitch,
  NSpace,
  NTree,
  NScrollbar
} from 'naive-ui'

import { NwIcon, request } from '@platform/main'

import { queryApp,  } from '../../api/index'


export default {
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSwitch,
    NSpace,
    NTree,
    NScrollbar
  },
  props:{
    value: {
      type: String
    }
  },
  setup(props: any, context: any){
    const isLoading = ref<boolean>(false)
    const list = ref<Array<any>>([])
    const load = () => {
      isLoading.value = true
      request({
        url: `/main/mdmBizMenu/list`,
        method: 'post',
        data: {}
      }).then(res => {
        console.log('====res===', res)
        list.value = res
      }).finally(() => {
        
        isLoading.value = false
      })
    }
    load()
    return {
      props,
      list,
      handle (d: any) {
        context.emit('update:value', d.code, d)
      }
    }
  }
}
</script>

<style lang='less' >
.n-spin-container {
    height: 100%;
  .n-spin-content {
    height: 100%;
  }
}
.bizmenu-item {
  display: flex;
  align-items: center;
  margin: 10px 10px 0 20px;
  height: 26px;
  font-size: 14px;
  color: var(--gray1);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px 10px;
  >.text {

    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  &:hover {
    box-shadow: 0px 0px 2px 2px var(--gray5);
  }
  &.active {
    box-shadow: 0px 0px 2px 2px var(--gray3);
  }
  >.icon {
    display: flex;
    align-items: center;
    flex: 0 0 16px;
    margin-right: 6px;
  }
}
</style>