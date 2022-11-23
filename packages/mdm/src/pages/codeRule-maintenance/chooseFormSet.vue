<template>
  <n-modal class="nw-modal" v-model:show="visible" preset="dialog" style="width: 650px; padding: 0" :show-icon="true"
    :mask-closable="true" :closable="true">
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        表单设置
      </div>
    </template>
    <n-spin :show="isLoading">
      <vxe-toolbar>
        <template #buttons>
          <vxe-form :data="formData" @submit="getList()" @reset="resetEvent" size="mini">
            <vxe-form-item title="字段名称" field="formNameCh" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.formNameCh" placeholder="" clearable></vxe-input>
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
        <vxe-table-column field="nameCh" title="字段名称"></vxe-table-column>
        <vxe-table-column field="name" title="字段编码"></vxe-table-column>
        <vxe-table-column field="" title="操作">
          <template v-slot="{ row }">
            <vxe-button type="text" @click="() => {
              alreadyObj.javaName = row.javaName
            }" v-if="(alreadyObj.javaName !== row.javaName)" status="primary">选择</vxe-button>
            <vxe-button type="text" @click="() => {
              alreadyObj.javaName = ''
            }" v-if="(alreadyObj.javaName && alreadyObj.javaName == row.javaName)" status="warning">取消
            </vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </n-spin>

    <div class="nw-modal-action">
      <n-button type="info" size="small" style="margin-right: 5px" @click="handleModalComplete">确定</n-button>
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

import { detail } from './api'

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
    const page = reactive({
      current: 1,
      size: 20,
      totalResult: 0
    })
    const getList = () => {
      isLoading.value = true
      query({
        page: { current: page.current, size: page.size },
        ...formData.value
      }).then((res) => {
        forms.value = res.records
        page.totalResult = res.total
        isLoading.value = false
      })
    }
    const handlePageChange = ({ currentPage, pageSize }) => {
      page.current = currentPage
      page.size = pageSize
      getList()
    }
    return {
      handlePageChange,
      page,
      visible,
      getList,
      alreadyObj,
      isLoading,
      forms,
      formData,
      show(selectedForms = {}) {
        // 重置

        visible.value = true
        isLoading.value = true
        detail(selectedForms.formId).then((res) => {
          forms.value = res.fieldList
          isLoading.value = false
        })
        alreadyObj.value = { ...selectedForms }
      },

      handleModalComplete() {
        context.emit('update:callback', { ...alreadyObj.value });
        visible.value = false
      },
      sizeChange() {
        gridFormRef.value.refreshColumn()
        gridFormItemRef.value.refreshColumn()
      }
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