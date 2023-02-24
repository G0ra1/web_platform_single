
<template>
  <n-button @click="showModal = true">
    <template #icon>
      <nw-icon name="icon-n-y-grid" />
    </template>
  </n-button>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择表头显示内容" content="你确认"
    positive-text="确认" negative-text="取消" style="width: 1040px">

    <n-spin :show="spinShow">
      <n-grid x-gap="12" class="control-grid" :cols="3">
        <n-gi span="2">
          <n-card title="可选属性">
            <n-checkbox v-model:checked="checkAllValue" :indeterminate="checkAllIndeterminate"
              @update:checked="checkAll" label="全选" />

            <n-checkbox-group style="margin-top: 10px;" v-model:value="checkedAttributes"
              :default-value="checkedAttributes">
              <n-grid :y-gap="8" :cols="4">
                <n-gi v-for="row in defaultColumns" :key="row.field">
                  <n-checkbox v-if="row.field" :disabled="row.disabled" :value="row.field" :label="row.title" />
                </n-gi>
              </n-grid>
            </n-checkbox-group>
          </n-card>
        </n-gi>
        <n-gi span="1">
          <n-card title="已选属性">
            <columnCtrl :data="defaultColumns" :checked="checkedAttributes" @callback="ctrlCallBack"></columnCtrl>
          </n-card>
        </n-gi>
      </n-grid>
    </n-spin>

    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">恢复默认值</n-button>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="onPositiveClick">确定</n-button>
    </template>
  </n-modal>

</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'

import { NwIcon, RequestPaging, VxeHelper, request, Page } from '@platform/main'

import { NButton, NPopover, NSpin, NModal, NGrid, NGi, NCard, NCheckboxGroup, NSpace, NCheckbox } from 'naive-ui'

import { cloneDeep } from 'lodash'

import columnCtrl from "./columnCtrl.vue";

export default defineComponent({
  props: {
    bindOptions: {
      type: Object,
      default: () => ({})
    },
    gridEvents: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    NButton,
    NPopover,
    NSpin,
    NModal,
    NGrid,
    NGi,
    NCard,
    NCheckboxGroup,
    NSpace,
    NCheckbox,
    columnCtrl,
    NwIcon
  },
  emits: ['update:bindOptions', 'update:gridEvents'],
  setup(props, context) {
    const showModal = ref<boolean>(false)
    const spinShow = ref<boolean>(false)
    const checkAllIndeterminate = ref<boolean>(false)
    const checkedAttributes = ref<Array<string | number>>(props.bindOptions.columns.filter((row: any) => {
      return row.visible !== false
    }).map((row: any) => {
      return row.field
    }))
    const defaultColumns: any = cloneDeep(props.bindOptions.columns)
    const changeColumns = ref<Array<any>>([])
    const checkAllValue = ref<boolean>(defaultColumns.length === checkedAttributes.value.length)
    props.gridEvents.resizableChange = (d: any) => {
      console.log(d.$columnIndex)
      console.log(d.resizeWidth)
      props.bindOptions.columns[d.$columnIndex].width = d.resizeWidth
      console.log(props.bindOptions.columns)
    }
    context.emit('update:gridEvents', cloneDeep(props.gridEvents))
    watch(() => checkedAttributes.value, (nd) => {
      checkAllIndeterminate.value = nd.length !== defaultColumns.length
      if (nd.length !== defaultColumns.length) checkAllValue.value = false
      if (nd.length == 0) { checkAllIndeterminate.value = false; checkAllValue.value = false }
      if (nd.length === defaultColumns.length) checkAllValue.value = true
    })
    return {
      showModal,
      spinShow,
      checkAllIndeterminate,
      checkAllValue,
      checkedAttributes,
      defaultColumns,
      changeColumns,
      onPositiveClick() {
        props.bindOptions.columns = changeColumns.value
        showModal.value = false
        console.log(changeColumns.value, 'changeColumns.value')
        context.emit('update:bindOptions', cloneDeep(props.bindOptions))
      },
      checkAll(checked: boolean) {
        if (checked) {
          defaultColumns.forEach((row: any) => {
            if (!row.disabled) row.visible = true
          });
          checkedAttributes.value = defaultColumns.filter((row: any) => { return row.field }).map((row: any) => { return row.field })
        } else {
          defaultColumns.forEach((row: any) => {
            if (!row.disabled) row.visible = false
          });
          checkedAttributes.value = defaultColumns.filter((row: any) => { return row.disabled }).map((row: any) => { return row.field })
        }
      },
      ctrlCallBack(columns: any) {
        changeColumns.value = columns
      }
    }
  }
})

</script>

<style lang="less">
.control-grid {
  box-sizing: border-box;
  height: 576px;
  padding: 10px;
  border-bottom: 1px solid #c6c6c6;

  .n-card {
    height: 100%;
  }

  .n-card>.n-card-header .n-card-header__main {
    font-size: 16px;
    font-weight: 500;
  }

}
</style>
