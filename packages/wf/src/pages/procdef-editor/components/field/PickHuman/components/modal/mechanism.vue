<template>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    :on-after-enter="onAfterEnter"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-jigou" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        {{option.modalTitle}}
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    
    <vxe-grid
      class="nw-vxe-grid"
      ref="gridRef"
      v-bind="gridOption"
      :loading="isLoading"
      style="
        padding-top: 5px;
        border: 1px solid #ccc;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
      "
    />
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

import {
  Grid as VxeGrid
} from 'vxe-table'

import { NwIcon } from '@platform/main'
import { queryOrg } from '../../../../../api/index'

import {
  getExtensionRootEl,
  createElement
} from '../../../../../util/index'

import {
  actionElBusinessObject,
  getRootElement
} from '../../../../../store/bpmn'
import { get } from 'lodash'

// 20220121 这里需要优化 1、查询 2、异步加载
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
  emits: ["callback"],
  setup(props, context){
    const option = ref({actionOrgType: []})
    const gridRef = ref(null)

    const gridData = ref([])
    // 是否加载中
    const isLoading = ref(true)
    // 模态展示
    const visible = ref(false)

    const loadData = () => {
      isLoading.value = true
      queryOrg({
        isDefault: 0,
        status: 1,
        orgType: option.value.orgType
      }).then((res) => {
        isLoading.value = false
        gridData.value = res
      })
    }
    // 
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: '350px',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      border: true,
      treeConfig: {
        // children: 'children',
        indent: 20,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        expandAll: true, // 是否展开所有
        // expandRowKeys: ['root'],
        //lazy: true, // 是否懒加载
        children: 'kids'
      },
      tableMenu: {
         
      },
      scrollY: {
        enabled: true
      },
      data: gridData,
      columns: [
        {
          field: 'name',
          treeNode: true,
          showOverflow: true,
          slots: {
            default: ({ row }) => {
              // return row.orgName
              if (option.value.actionOrgType.includes(row.orgType)) {

                return [<div style="display:flex; justify-content: space-between;">
                { row.orgName }
                <NButton
                  size="small"
                  type="info"
                  onClick={() => {
                    console.log('=====callback===',row)
                    context.emit('callback', row.id, row.orgName)
                    visible.value = false
                  }}
                >{{
                  default: () => '选择'
                }}</NButton>
                </div>]

              } else {
                return row.orgName
              }
            }
          }
        }
      ]
    })
    return {
      option,
      props,
      gridRef,
      isLoading,
      gridOption,
      visible,
      // 这里回显 字段field
      show (_option = {
        modalTitle: '机构选择',
        orgType: 1,
        actionOrgType: [1]
      }) {
        gridData.value = []
        option.value = _option
        visible.value = true
      },
      onAfterEnter () {
        // gridRef.value.refreshColumn()
        nextTick().then(() => {
          loadData()
        })
        // 
      }
      
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../../style/vxe-table-tree.less";
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