<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1200px; padding: 0;"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    :on-after-enter="onAfterEnter"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-y-form" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        编辑表达式
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <div style="height: 700px;">
      <d-splitter
        class="nw-layout-content-splitter"
        splitBarSize="1px"
      >
        <template v-slot:DSplitterPane>
          <d-splitter-pane class="splitter-bpmn-view" size="700px" minSize="330px" @sizeChange="sizeChange">
            <!-- graph -->
            <div ref="splitterLeft" style="position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            height: 100%;
            ">
            <graph
              ref="graphRef"
              :option="{
                width: 400,
                height: 300
              }"
            />
            <n-drawer :to="splitterLeft" v-model:show="drawerActive" placement="bottom">
              <n-drawer-content >
                <express-text ref="expressText" :value="expressionCache" />
              </n-drawer-content>
            </n-drawer>
            </div>
          </d-splitter-pane>
          <d-splitter-pane class="splitter-bpmn-attrs" minSize="300px" >
            <n-spin :show="isLoading">
              <calc />
            </n-spin>
          </d-splitter-pane>
        </template>
      </d-splitter>
    </div>
    <!-- <n-layout has-sider class="nw-modal-layout" >
      <n-layout-content>
        
      </n-layout-content>
    </n-layout> -->
    <div class="nw-modal-action">
      <!-- <div >
drawerActive
      </div> -->
      <n-switch
        size="small"
        v-model:value="drawerActive"
      />
      <div>
        <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="handleModalComplete"
        >确定</n-button>
        <n-button  size="small"
        @click="visible = false" >取消</n-button>
      </div>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, provide  } from 'vue'
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
  NDrawer,
  NDrawerContent
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { detailForm } from '../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../store/bpmn'
import { get, cloneDeep } from 'lodash'
import Graph from './graph/index.vue'
import Calc from './calc/index.vue'
import data from './graph/expDataDemo.js'
import { expressionCache, clearEditing, treeFun } from '../../../store/cache-expression'

import ExpressText from './express-text/index.vue'
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
    NDrawer,
    NDrawerContent,
    Graph,
    Calc,
    ExpressText
  },
  props:{
  },
  emits: [ 'callback' ],
  setup(props, context){
    
    const expressText = ref(null)
    const splitterLeft = ref(null)
    nextTick().then(() => {
      // 加载树形数据
      console.log('splitterLeft===', splitterLeft)
    })
    const drawerActive = ref(false)
    const graphRef = ref(null)
    // 流程节点表单数据
    const forms = ref([])
    // 参数列表
    // const fromFields = computed(() => actionForm.value ? selectedFormMap.value[actionForm.value.id].fields : [])
    const fromFields = computed(() => {
      // alert(1)
      return actionForm.value ? get(selectedFormMap.value, `[${actionForm.value.id}].fields`, []) : []})
    // 设置参数的form
    const actionForm = ref(null)

    // 备用已选择的map
    const selectedFormMap = ref({})
    // 是否加载中
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)


    // 获取bpmn元素数据
    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms')

    // const netwisdForms = getExtensionRootEl(props.element, 'netwisd:Forms').values

    // console.log('netwisdForms==', netwisdForms)
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')
    //

    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      const expressionObj = cloneDeep(expressionCache.value)
      context.emit('callback', JSON.stringify(expressionObj), treeFun(expressionCache.value), expressionObj);
      visible.value = false
    }
    // 删除xml form
    const handleDelForm = (el) => {

    }
    // 清除所有
    const handleClearForm = () => {

    }

    return {
      expressionCache,
      expressText,
      splitterLeft,
      drawerActive,
      graphRef,
      props,
      isLoading,

      actionForm,
      visible,
      // 这里回显没有做---------
      show (expressionObj = {}) {
        clearEditing()
        expressionCache.value = cloneDeep(expressionObj)
        visible.value = true
        nextTick().then(() => {
          // 加载树形数据
          graphRef.value.render()
        })
      },
      handleModalComplete,
      handleClearForm,
      sizeChange () {
        // gridFormRef.value.refreshColumn()
        // gridFormItemRef.value.refreshColumn()
      },
      onAfterEnter() {
        // graphRef.value.render()
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../style/vxe-table.less";
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}

:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}
</style>