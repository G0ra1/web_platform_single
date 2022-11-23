<template>
  <div class="value-input" style="display:flex;align-items: center;">
      <n-input
        size="small"
        :value="props.text"
        disabled
        placeholder=""
      />
      <n-button
      :disabled="props.disabled"
      size="small"
      type="info"
      @click="handleModal"
      style="margin-left: 4px;"
      >选择</n-button>
    
  </div>


  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 400px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-openway-caidan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择编排分类
      </div>
    </template>
    <n-layout class="nw-page" ref="pageRef">
    <n-layout-header>
      <h1>OpenAPI</h1>
      <div class="nw-page-header-right">
      </div>
    </n-layout-header>
    <n-layout-content>

      <n-layout class="nw-table" ref="tbody">
        <n-layout-header class="nw-table-header">
          <div class="nw-table-header-left">
            
          </div>
          <div class="nw-table-header-right">
            <Search />
          </div>
        </n-layout-header>

        <n-layout has-sider class="nw-table-content">
          <n-layout-sider width="250">
            <!-- <vxe-grid
              v-bind="gridTreeOptions"
              ref="gridComponent"
              class="mytable-scrollbar"
            >
            </vxe-grid> -->
            <SideTree
              @callback="sideTreeCallback"
            />
          </n-layout-sider>
          <n-layout-content ref="gridContent">
            <vxe-grid
              v-bind="gridOptions"
              ref="tableRef"
              class="mytable-scrollbar"
            >
            </vxe-grid>
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-layout-content>
  </n-layout>
  <n-drawer
    v-model:show="InterfaceDetail.visible"
    placement="right"
    width="100%"
    :trap-focus="false"
    :block-scroll="false"
    :to="gridContent && gridContent.$el"
  >
    <n-drawer-content >
      <Detail />
    </n-drawer-content>
  </n-drawer>

    <div style="height: 400px">
    </div>
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSelect,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import TreeGrid from '../tree-grid/index.vue'
import { queryById } from '../../api/index'

import Detail from '../detail/index.vue'

import SideTree from '../tree-grid/index.vue'

import Search from '../search/index.vue'

export default {
  components: {
    NConfigProvider,
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
    NSelect,
    NwIcon,
    TreeGrid
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const text = ref('')
    const visible = ref(false)
    const handleModal = () => {
      visible.value = true
      // MechanismModalRef.value.show()
    }
    if (props.value) {
      // queryById(props.value).then(d => {
      //   console.log('===============', d)
      // })
      if (props.text) {
        text.value = props.text
      } else {
        
      }
    }
    return {
      text,
      visible,
      props,
      handleModal,
      callback (f, d, t) {
        if (f) {
          context.emit('update:value', d)
          context.emit('update:text', t)
          text.value = t
          nextTick().then(() => {
            visible.value = false
          })
        }
      },

      theme: {
                  
        Button: {
          heightSmall: '22px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
        Dialog: {
          // color: '#2b2b2b',
          // titleTextColor: '#ccc',
          iconMargin: '0 3px 0 0',
          titleFontSize: '14px',
          titleFontWeight: 'bold',
          titleTextColor: '#5e5e5e',
          iconSize: '14px',
          padding: '2px 5px',
          closeSize: '14px',
          closeMargin: '5px',
          contentMargin: '0',
          // textColor: '#ccc'
        },
        Modal: {
          boxShadow: '1px 0px 7px 1px #00000060',
          // textColor: '#ccc'
        }
      }
    }

  }
}
</script>

<style lang='less'>
</style>