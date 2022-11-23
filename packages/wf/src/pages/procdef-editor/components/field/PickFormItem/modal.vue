<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-y-form" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        字段配置
      </div>
    </template>
    <vxe-grid
      class="nw-vxe-grid"
      ref="gridFormItemRef"
      v-bind="gridFormItemOption"
    />
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
import { detailForm } from '../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../store/bpmn'
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
  props:{
  },
  setup(props, context){

    const resultFields = ref([])

    // 设置参数的form
    const actionForm = ref(null)
    const actionWf = ref(false)

    // 是否加载中
    const isLoading = ref(false)
    // 模态展示
    const visible = ref(false)

    const gridFormItemRef = ref(null)

    // 主备选表
    const gridFormItemOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: resultFields,
      columns: [
        {
          field: 'nameCh',
          title: '字段名称'
        },
        {
          field: "javaName",
          title: "字段编码",
        },
        {
          field: "javaType",
          title: "类型",
          width: 70,
          showOverflow: true
        },
        {
          field: "powerCode",
          title: "权限",
          width: 120,
          showOverflow: true,
          slots: {
            default: ({row}) => {
              return [
                <NSelect
                  theme-overrides={{
                    peers: {
                      InternalSelection: {
                        heightSmall: '20px'
                      }
                    }
                  }}
                  value={row.powerCode}
                  onUpdateValue={(e) => row.powerCode = e}
                  size="small"
                  style="border: none;display:flex"
                  options={[
                    {
                      label: '编辑',
                      value: 'edit'
                    },
                    {
                      label: '只读',
                      value: 'readonly'
                    },
                    {
                      label: '必填',
                      value: 'required'
                    },
                    {
                      label: '不可见',
                      value: 'hide'
                    },
                  ]}
                />
              ]
            }
          }
        }
      ]
    })
    // 选择完成，赋值到xml
    const handleModalComplete = () => {
      const _netwisdForm = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form')
      _netwisdForm.values.splice(0)

      const _res = resultFields.value.filter(d => d.powerCode !== 'edit').map(d => {
        return createElement('netwisd:Field', {
            javaName: d.javaName,
            nameCh: d.nameCh,
            javaType: d.javaType,
            powerCode: d.powerCode
          })
      })
      _netwisdForm.values.push(..._res)
      context.emit('update:callback')
      visible.value = false
    }

    return {
      props,
      isLoading,
      gridFormItemRef,
      gridFormItemOption,
      actionForm,
      actionWf,
      visible,
      // 这里回显没有做---------
      show (selectedForms = []) {
        visible.value = true
        // 当前节点字段
        const currentFields = getExtensionRootEl(actionElBusinessObject.value, 'netwisd:Form').values || []
        // 所有节点字段
        const allFields = getExtensionRootEl(getRootElement(), 'netwisd:Form').values || []

        resultFields.value = allFields.map(d => {

          const field = currentFields.find(f => f.javaName === d.javaName)

          // 这里
          return {
            javaName: d.javaName,
            nameCh: d.nameCh,
            javaType: d.javaType,
            powerCode: field ? field.powerCode : 'edit'
          }
        })
      },
      handleModalComplete,
      sizeChange () {
        gridFormItemRef.value.refreshColumn()
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
</style>