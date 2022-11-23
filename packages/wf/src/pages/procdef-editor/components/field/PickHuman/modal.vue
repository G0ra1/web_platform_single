<template>

  <n-config-provider
  abstract
  :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1000px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-bumen2" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择人员规则
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <div >
      <n-tabs
        class="nw-tabs"
        size="small"
        type="card"
        :tabs-padding="5"
      >
        
        <n-tab-pane name="exp" >
          <template #tab>
            表达式
            <n-tag v-if="UserExpressionCache.length" type="error" size="small" round style="margin-left: 3px;" >
              {{UserExpressionCache.length}}
            </n-tag>
          </template>
          <exp />
          <!-- <div style="height: 100%; background: red"></div> -->
        </n-tab-pane>
        <!-- <n-tab-pane name="mechanism" >
          <template #tab>
            机构
          </template>
          <mechanism />
        </n-tab-pane>
        <n-tab-pane name="dept" >
          <template #tab>
            部门
          </template>
          <dept />
        </n-tab-pane>
        <n-tab-pane name="user" >
          <template #tab>
            人员
          </template>
          <users />
        </n-tab-pane> -->
    </n-tabs>
      <!-- <d-splitter
        class="nw-layout-content-splitter"
        splitBarSize="1px"
        style="height: 450px"
      >
        <template v-slot:DSplitterPane>
          <d-splitter-pane class="splitter-bpmn-view" size="600px" minSize="330px" @sizeChange="sizeChange">

            
          </d-splitter-pane>
          <d-splitter-pane class="splitter-bpmn-attrs" minSize="200px" >
            <n-spin :show="isLoading" class="nw-spin-full">
              <multiple-grid />
            </n-spin>
          </d-splitter-pane>
        </template>
      </d-splitter> -->
    </div>
    <!-- <n-layout has-sider class="nw-modal-layout" >
      <n-layout-content>
        
      </n-layout-content>
    </n-layout> -->
    <div class="nw-modal-action">
      <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button>
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
    </div>
  </n-modal>
  </n-config-provider>
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
  NBadge,
  NSpin,
  NModal,
  NSelect,
  NSwitch,
  NTabs,
  NTabPane,
  NTag
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import {
  detailForm,
  queryExp
} from '../../../api/index'

import {
  getExtensionRootEl,
  getExtensionRootEls,
  bpmnFactory,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject,
  getRootElement,
  getActionEBO // 获取原生ebo
} from '../../../store/bpmn'


import {
  UserExpressionCache,
  MechanismCache,
  DeptCache,
  UsersCache
} from '../../../store/cache-human'
// import { get, cloneDeep } from 'lodash'
import Exp from './humanType/express.vue'
import Mechanism from './humanType/mechanism.vue'
import Dept from './humanType/dept.vue'
import Users from './humanType/users.vue'

import theme from './humanType/theme'

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
    NBadge,
    NwIcon,
    NSwitch,
    NTabs,
    NTabPane,
    Exp,
    Mechanism,
    Dept,
    Users,
    NTag
  },
  props:{
  },
  setup(props, context){
    // 流程节点表单数据

    // 设置参数的form
    const actionForm = ref(null)

    // 是否加载中
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      console.log('=====UserExpressionCache=====', UserExpressionCache)
      // context.emit('update:callback', UserExpressionCache);
      // 组合 UserExpressionCache
      const res = [
        ...UserExpressionCache.value
      ]
      if (MechanismCache.value.bizId) res.push(MechanismCache.value)
      if (DeptCache.value.bizId) res.push(DeptCache.value)
      if (UsersCache.value.bizId) res.push(UsersCache.value)
      context.emit('update:callback', res);
      visible.value = false
    }

    // 删除xml form
    const handleDelForm = (el) => {

    }
    // 清除所有
    const handleClearForm = () => {

    }
    return {
      theme,
      props,
      isLoading,

      actionForm,
      visible,
      // 这里回显没有做---------
      async show () {
        visible.value = true
        // 赋值字段回显
        // 这里克隆
        
        const HumanExps = getExtensionRootEl(getActionEBO(), 'netwisd:HumanExps')
        // console.log('====HumanExps====', HumanExps, cloneDeep(HumanExps))
        // 将人员表达式转换为xml 进行赋值
        const HumanExpsXML = await bpmnFactory()._model.toXML(HumanExps).then(d => d.xml)
        
        // 复制后转换为对象
        const HumanExpsClone = await bpmnFactory()._model.fromXML(HumanExpsXML, 'netwisd:HumanExps').then(r => r.rootElement)
        
        // const HumanExpsClone = cloneDeep(HumanExps)

        if (!HumanExpsClone.values) HumanExpsClone.values = []
        // console.log(HumanExpsClone)
        // 即将要添加的表达式
        UserExpressionCache.value = HumanExpsClone.values.filter(d => (d.bizType === 'mdmExpression' || d.bizType === 'innerExpression'))

        MechanismCache.value = HumanExpsClone.values.find(d => d.bizType === 'organ') || createElement('netwisd:HumanExp', {
            expreName: '',
            bizId: '',
            bizText: '',
            bizType: 'organ',
        })
        DeptCache.value = HumanExpsClone.values.find(d => d.bizType === 'dept') || createElement('netwisd:HumanExp', {
            expreName: '',
            bizId: '',
            bizText: '',
            bizType: 'dept',
        })
        UsersCache.value = HumanExpsClone.values.find(d => d.bizType === 'empl') || createElement('netwisd:HumanExp', {
            expreName: '',
            bizId: '',
            bizText: '',
            bizType: 'empl',
        })
      },
      handleModalComplete,
      handleClearForm,
      sizeChange () {
      },
      UserExpressionCache,
      MechanismCache,
      DeptCache,
      UsersCache
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
    justify-content: flex-end;
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

.nw-spin-full {
  height: 100%;
  
  :deep(.n-spin-content) {
    height: 100%
  }
}

.nw-tabs {
  padding-top: 5px;
  :deep(&.n-tabs) {
    // display: flex;
    // padding-top: 5px;
    // flex-direction: column;
    .n-tab-pane {
      height: 480px;
      // flex: 1;
      // padding: 5px;
    }
  }
}
</style>