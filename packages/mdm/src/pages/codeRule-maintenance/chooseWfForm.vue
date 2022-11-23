<template>
  <n-modal class="nw-modal" v-model:show="visible" preset="dialog" style="width: 650px; padding: 0" :show-icon="true"
    :mask-closable="true" :closable="true">
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择工作流表单
      </div>
    </template>
    <n-spin :show="isLoading">
      <vxe-toolbar>
        <template #buttons>
          <vxe-form :data="formData" @submit="getList()" @reset="resetEvent" size="mini">
            <vxe-form-item title="表单名称" field="formNameCh" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.formNameCh" placeholder="请输入表单名称" clearable></vxe-input>
              </template>
            </vxe-form-item>

            <vxe-form-item>
              <template #default>
                <vxe-button type="submit" status="primary">查询</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-toolbar>

      <vxe-table resizable highlight-current-row ref="aTable" row-id="id" height="340px" size="mini" :data="forms">
        <vxe-table-column field="formNameCh" title="表单名称"></vxe-table-column>
        <vxe-table-column field="formName" title="表单编码"></vxe-table-column>
        <vxe-table-column field="" title="操作">
          <template v-slot="{ row }">
            <!-- <vxe-button type="text" 
                    @click="()=>{
                      alreadyObj = row
                    }" 
                    v-if="( alreadyObj.formName !== row.formName)"  
                    status="primary"
                >选择</vxe-button>
                <vxe-button type="text" 
                  @click="()=>{
                    alreadyObj = {}
                  }" 
                  v-if="(alreadyObj.formName && alreadyObj.formName == row.formName)"  status="warning">取消</vxe-button> -->
            <vxe-button type="info" size='small' v-if="alreadyObj.formName !== row.formName" @Click="() => {
              handleModalComplete(row)
            }">
              选择
            </vxe-button>
            <vxe-button type="warning" size='small' v-if="(alreadyObj.formName && alreadyObj.formName == row.formName)"
              @Click="() => {
                alreadyObj.value = {}
              }">取消</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </n-spin>

    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button size="small" @click="visible = false">取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
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
  NSwitch
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  getProcDefInfoBy
} from './api'
import { get } from 'lodash'

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
    NSwitch
  },
  props: {
  },
  setup(props, context) {
    // 流程节点表单数据
    const forms = ref([])
    const visible = ref(false)
    const alreadyObj = ref({})
    const formData = ref({})
    const isLoading = ref(false)
    const isAddedByProcdefId = (formName) => {
      return forms.value.map(d => d.formName).includes(formName)
    }
    const getList = (camundaProcdefId) => {
      isLoading.value = true
      getProcDefInfoBy(camundaProcdefId).then((res) => {
        forms.value = [{
          formNameCh: '工作流表单',
          formName: 'gzl',
          formId: 188888888,
          formType: 2
        }]
        res.wfFormDefs.map(d => {
          forms.value.push({ ...d, formType: 1 })
          return d
        })
        isLoading.value = false
      })
    }
    return {
      visible,
      getList,
      alreadyObj,
      isLoading,
      forms,
      formData,
      isAddedByProcdefId,
      show(selectedForms = {}) {
        // 重置
        alreadyObj.value = { ...selectedForms }
        forms.value = []
        visible.value = true
        getList(selectedForms.camundaProcdefId)

      },

      handleModalComplete(obj) {
        context.emit('update:callback', { ...alreadyObj.value, ...obj });
        visible.value = false
      },

    }
  }
}
</script>

<style lang='less' scoped>
.nw-modal {
  &.n-dialog>.n-dialog__close {
    top: -15px;
    right: 4px;
  }

  &.n-dialog>.n-dialog__title {
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

/deep/ .form-active {
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