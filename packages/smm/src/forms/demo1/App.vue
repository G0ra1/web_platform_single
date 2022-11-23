<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="160"
    size="small"
    :style="{
        padding: '45px'
    }"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="预算执行金额" path="sumBudgetExecuteAmount">
        <n-input-number placeholder="Input" v-model:value="dataModel.sumBudgetExecuteAmount" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="抵扣进项税" path="sumDeductionTaxAmount">
        <n-input-number placeholder="Input" v-model:value="dataModel.sumDeductionTaxAmount" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="扣减金额" path="sumDeductionAmount">
        <n-input-number placeholder="Input" v-model:value="dataModel.sumDeductionAmount" />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="预算" >
        <vxe-grid
          v-bind="gridOption"
          style="
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
          "
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <n-button @click="testshow">Test</n-button>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'
import { FormModal } from './store'


export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton
  },
  setup () {
    const {
      formRef,
      dataModel,
      rules,
      brules,
      setValue,
      getValue,
      validate,
      setRules
    } = new FormModal()
    setRules({
      sumBudgetExecuteAmount: {
        powerCode: 'required',
        nameCh: '测试'
      }
    })
    return {
      formRef,
      dataModel,
      rules,
      brules,
      validate,
      testshow: () => {

        getValue().then(d => {
          console.log(d)
        })

        validate().then(d => {

        })

      },
      gridOption: ref<VxeGridProps<any>>({
        rowId: 'id',
        rowKey: false,
        keepSource: true,
        // height: '500px',
        size: 'mini',
        showOverflow: false,
        highlightHoverRow: true,
        border: true,
        data: dataModel.value.testprocBudgetinfoList,
        
        toolbarConfig: {
          slots: {
            buttons: ({ $grid  }: any) => {
              return [
                <NButton type="primary" onClick={function () {
                  if (!dataModel.value.testprocBudgetinfoList) {
                    dataModel.value.testprocBudgetinfoList = []
                  }
                  dataModel.value.testprocBudgetinfoList.push({
                    id: `${new Date().getTime()}`
                  })
                  $grid.reloadData(dataModel.value.testprocBudgetinfoList)
                }}>{{
                    default: () => '新增'
                  }}</NButton>
              ]
            }
          }
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        },
        columns: [
          // { type: 'checkbox', width: 40 },
          {
              title: '报销类型',
              field: 'expenseType',
              showOverflow: 'title',
              minWidth: 200,
              // editRender: {
              //   name: 'input',
              //   attrs: { placeholder: '报销类型' }
              // }
              editRender: {
                name: '$select',
                options: [
                  { label: '类型1', value: 1 },
                  { label: '类型2', value: 2 }
                ],
                attrs: { placeholder: '报销类型' }
              }
          },
          {
              title: '报销名称',
              field: 'expenseName',
              minWidth: 190,
              editRender: {
                name: 'input',
                attrs: { placeholder: '报销名称' }
              }
          },
          {
              title: '报销单号',
              field: 'expenseBizKey',
              minWidth: 150,
              editRender: {
                name: 'input',
                attrs: { placeholder: '报销单号' }
              }
          },
          {
              title: '预算数',
              field: 'budgetAmount',
              minWidth: 150,
              editRender: {
                name: 'input',
                attrs: { placeholder: '报销单号' }
              }
          },
          {
            title: '操作',
            width: 70,
            fixed: 'right',
            slots: {
              default: ({ $table, rowIndex }: any) => {
                return [
                  <NButton
                    size="small"
                    type="error"
                    onClick={function () {
                      dataModel.value.testprocBudgetinfoList!.splice(rowIndex, 1)
                      $table.reloadData(dataModel.value.testprocBudgetinfoList)
                    }}
                  >{{
                    default: () => '删除'
                  }}</NButton>
                ]
              }
            }
          }
        ]
      })
    }
  }
})

</script>

<style scoped>
</style>
