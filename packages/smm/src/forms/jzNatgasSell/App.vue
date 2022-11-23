<template>
  <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" :label-width="160" size="small" :style="{
    padding: '45px'
  }">
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="填报日期" path="tianbaoshijian">
        <n-date-picker v-model:formatted-value="dataModel.tianbaoshijian" value-format="yyyy-MM-dd" type="date" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="填报厂别" path="tianbaochangbie">
        <n-input placeholder="填报厂别" disabled v-model:value="dataModel.tianbaochangbie" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="填报人" path="tianbaoren">
        <n-input placeholder="填报人" disabled v-model:value="dataModel.tianbaoren" />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="河北销售管输气">
        <n-button type="primary" @click="activeNum++" v-if="dataModel.tianbaochangbieId=='239'&&activeNum==0">+
        </n-button>
        <vxe-grid ref="sourceVxeGrid" v-else v-bind="sourceListGridOption" style="
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
              width: 100%;
          ">
          <template #laiyuan_default="{ row, column }">
            <span>{{row.laiyuan_name}}</span>
          </template>
          <template #laiyuan_edit="{ row, column }">
            <n-select placeholder="请选择来源" v-model:value="row.laiyuan_code"
              @update:value="hbxsgsqChangeEvent({ row,column })" :options="hbxsgsq" />
          </template>
          <template #yunxiaoliang_default="{ row, column }">
            <span>{{row.yunxiaoliang}}</span>
          </template>
          <template #yunxiaoliang_edit="{ row, column }">
            <n-input-number placeholder="请输入运销量" @blur="clearActive" v-model:value="row.yunxiaoliang"></n-input-number>
          </template>
          <template #beizhu_default="{ row, column }">
            <span>{{row.beizhu}}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input placeholder="请输入备注" @blur="clearActive" v-model:value="row.beizhu"></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="合计">
        <span class="heji">
          <span>河北销售管输气:</span><span class="num">{{sumNum(dataModel.sourceList||[],'yunxiaoliang')}}</span>
        </span>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="华北油田冀中自产气">
        <vxe-grid ref="detailVxeGrid" v-bind="detailListGridOption" style="
              moz-user-select: -moz-none;
              -moz-user-select: none;
              -o-user-select:none;
              -khtml-user-select:none;
              -webkit-user-select:none;
              -ms-user-select:none;
              user-select:none;
              width: 100%;
          ">
          <template #changzhan_default="{ row, column }">
            <span>{{row.changzhan_quyu_name}}</span>
          </template>
          <template #changzhan_edit="{ row, column }">
            <n-select placeholder="请选择场站" :options="changCZ" v-model.value="row.changzhan_quyu_code"
              @update:value="(v)=>changzhanChangeEvent(v,{ row,column })" />
          </template>
          <template #tianranqileixing_default="{ row, column }">
            <span>{{row.tianranqileixing_name}}</span>
          </template>
          <template #tianranqileixing_edit="{ row, column }">
            <n-select placeholder="选择天然气类型" size="small" v-model:value="row.tianranqileixing_code"
              @update:value="tianranqileixingChangeEvent({ row,column })" :options="natgasType" />
          </template>

          <template #yonghu_default="{ row, column }">
            <span>{{row.yonghu_name}}</span>
          </template>
          <template #yonghu_edit="{ row, column }">
            <n-select placeholder="请选择用户" :options="changYH" v-model.value="row.yonghu_code"
              @update:value="(v)=>yonghuChangeEvent(v,{ row,column })" />
          </template>

          <template #yunxiaoliang_default="{ row, column }">
            <span>{{row.yunxiaoliang}}</span>
          </template>
          <template #yunxiaoliang_edit="{ row, column }">
            <n-input-number placeholder="请输入运销量" @blur="clearActive" v-model:value="row.yunxiaoliang"></n-input-number>
          </template>


          <template #beizhu_default="{ row, column }">
            <span>{{row.beizhu}}</span>
          </template>
          <template #beizhu_edit="{ row, column }">
            <n-input placeholder="请输入备注" @blur="clearActive" v-model:value="row.beizhu"></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="合计">
        <span v-for="t in natgasTypeList" class="heji">
          <span v-if="t" class="label">{{t}}:</span><span class="num"
            v-if="t">{{natgasTypeSum?natgasTypeSum[t]:''}}</span>
        </span>
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <!-- <n-button @click="testshow">Test</n-button> -->
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h, watch, onMounted } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { Db } from '@platform/main'
import { format } from "date-fns";
import { cloneDeep } from 'lodash'
import { dictItemLists, commonStationList, commomPgtCustomList, commonCustomList } from "../../api/index.js"
import {
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NTreeSelect,
  TreeSelectOption,
} from 'naive-ui'
import { request } from '@platform/main'
import { FormModal } from './store'


export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NDatePicker,
    NSelect,
    NTreeSelect
  },
  setup() {
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
    const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0
      let count: number = 0
      list.forEach((item: any) => {
        console.log(item)
        console.log(field)
        if (item[field]) {
          count += Number(item[field])
        }
      })
      return count
    }
    const activeNum = ref<number>(0)
    const detailVxeGrid: Ref<VxeGridInstance | null> = ref(null)
    const sourceVxeGrid: Ref<VxeGridInstance | null> = ref(null)
    const natgasType = ref<Array<any>>([])
    const tianranqileixingChangeEvent = ({ row, column }: any) => {
      row.tianranqileixing_name = natgasType.value.filter(d => d.value == row.tianranqileixing_code)[0].label
    }
    const hbxsgsq = ref<Array<any>>([])
    const hbxsgsqChangeEvent = ({ row, column }: any) => {
      row.laiyuan_name = hbxsgsq.value.filter(d => d.value == row.laiyuan_code)[0].label
    }
    const changCZ = ref<Array<any>>([])
    const changzhanChangeEvent = (v: string, { row, column }: any) => {

      row.changzhan_quyu_code = v
      console.log(changCZ.value)
      console.log(row.changzhan_quyu_code)
      row.changzhan_quyu_name = changCZ.value.filter(d => d.value == row.changzhan_quyu_code)[0].label
    }
    const changYH = ref<Array<any>>([])
    const yonghuChangeEvent = (v: string, { row, column }: any) => {
      console.log(v)
      row.yonghu_code = v
      row.yonghu_name = changYH.value.filter(d => d.value == row.yonghu_code)[0].label
    }
    setRules({
      sumBudgetExecuteAmount: {
        powerCode: 'required',
        nameCh: '测试'
      }
    })
    const sourceListGridOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: true,
      size: 'mini',
      autoResize: true,
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.sourceList,
      showFooter: true,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton type="primary" onClick={function () {
                if (!dataModel.value.sourceList) {
                  dataModel.value.sourceList = []
                }
                dataModel.value.sourceList.push({
                  id: `${new Date().getTime()}`
                })
                $grid.reloadData(dataModel.value.sourceList)
              }}>{{
                default: () => '新增'
              }}</NButton>
            ]
          }
        }
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        autoClear: false
      },
      columns: [
        {
          title: '来源',
          field: 'laiyuan_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: { default: 'laiyuan_default', edit: 'laiyuan_edit' }
        },
        {
          title: '运销量',
          field: 'yunxiaoliang',
          minWidth: 190,
          editRender: {},
          slots: {
            default: 'yunxiaoliang_default', edit: 'yunxiaoliang_edit'
          }
        },
        {
          title: '备注',
          field: 'beizhu',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
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
                    dataModel.value.sourceList!.splice(rowIndex, 1)
                    $table.reloadData(dataModel.value.sourceList)
                  }}
                >{{
                  default: () => '删除'
                }}</NButton>
              ]
            }
          }
        }
      ],
      // footerMethod({ columns, data }) {
      //   const sums: Array<number | string> = []
      //   columns.forEach((column, columnIndex) => {
      //     if (columnIndex === 0) {
      //       sums.push('合计')
      //     } else {
      //       if (column.field === 'yunxiaoliang') {
      //         sums.push(Number(sumNum(data, 'yunxiaoliang')))
      //       } else {
      //         sums.push('-')
      //       }
      //     }
      //   })
      //   // 返回一个二维数组的表尾合计
      //   return [sums]
      // }
    })
    const detailListGridOption = ref<VxeGridProps<any>>({
      rowId: 'id',
      rowKey: false,
      keepSource: false,
      // height: '500px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.detailList,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton type="primary" onClick={function () {
                if (!dataModel.value.detailList) {
                  dataModel.value.detailList = []
                }
                dataModel.value.detailList.push({
                  id: `${new Date().getTime()}`
                })
                $grid.reloadData(dataModel.value.detailList)
              }}>{{
                default: () => '新增'
              }}</NButton>
            ]
          }
        }
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        autoClear: false
      },
      columns: [
        {
          title: '场站',
          field: 'changzhan_quyu_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'changzhan_default',
            edit: 'changzhan_edit'
          }
        },
        {
          title: '天然气类型',
          field: 'tianranqileixing_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'tianranqileixing_default',
            edit: 'tianranqileixing_edit'
          }
        },
        {
          title: '用户',
          field: 'yonghu_name',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'yonghu_default',
            edit: 'yonghu_edit'
          }
        },
        {
          title: '运销量',
          field: 'yunxiaoliang',
          minWidth: 190,
          editRender: {
          },
          slots: {
            default: 'yunxiaoliang_default',
            edit: 'yunxiaoliang_edit'
          }
        },
        {
          title: '备注',
          field: 'beizhu',
          minWidth: 150,
          editRender: {},
          slots: {
            default: "beizhu_default",
            edit: "beizhu_edit",
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
                    dataModel.value.detailList!.splice(rowIndex, 1)
                    $table.reloadData(dataModel.value.detailList)
                  }}
                >{{
                  default: () => '删除'
                }}</NButton>
              ]
            }
          }
        }
      ],
    })

    const natgasTypeList = ref<Array<any>>([])
    interface myObject {
      [key: string]: any
    }
    const natgasTypeSum = ref<myObject>({})

    watch(() => dataModel.value.detailList, (d: any) => {
      if (detailVxeGrid.value) {
        detailVxeGrid.value.loadData(d)
        calcYX()
      }


    })
    watch(() => dataModel.value.sourceList, (d: any) => {
      if (sourceVxeGrid.value) {
        sourceVxeGrid.value.loadData(d)
      }
    })

    onMounted(() => {
      Db.get('userInfo').then((res: any) => {
        if (!dataModel.value.tianbaochangbie) {
          dataModel.value.tianbaochangbie = res.parentDeptName
          dataModel.value.tianbaochangbieId = res.parentDeptId
          dataModel.value.tianbaorendanwei = res.orgFullName
          dataModel.value.tianbaorendanweiId = res.orgFullId
          dataModel.value.tianbaoren = res.userNameCh
          dataModel.value.tianbaorenId = res.id
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd")
        }
        console.log('用户信息', res)


      })
      commomPgtCustomList().then(res => {
        console.log(res, '来源++++++++')
        hbxsgsq.value = res.map((d: any) => {
          return {
            label: d.pgtCustomName,
            value: d.pgtCustomCode
          }
        })
      })
      commonStationList().then(res => {
        console.log(res, '场站............')
        changCZ.value = res.map((d: any) => {
          return {
            label: d.stationName,
            value: d.stationCode
          }
        })
      })
      commonCustomList().then(res => {
        console.log(res, '用户............')
        changYH.value = res.map((d: any) => {
          return {
            label: d.customName,
            value: d.customCode
          }
        })
        // changYH.value = cloneDeep(res).map((d: any) => {
        //   d.disabled = d.level < 3;
        //   return d;
        // })
      })
      dictItemLists('NATGAS_TYPE').then(res => {
        natgasType.value = res.map((d: any) => {
          return {
            value: d.dictItemCode,
            label: d.dictItemName
          }
        })
      })
    })

    const clearActive = () => {
      sourceVxeGrid.value && sourceVxeGrid.value.clearEdit()
      detailVxeGrid.value && detailVxeGrid.value.clearEdit()
      calcYX()
    }
    const calcYX = () => {
      if (dataModel.value.detailList) {
        natgasTypeList.value = Array.from(new Set(dataModel.value.detailList.map(d => d.tianranqileixing_name || "")))
        natgasTypeList.value.forEach((d: string) => {
          if (dataModel.value.detailList) {
            natgasTypeSum.value[d] = sumNum(dataModel.value.detailList.filter((e: any) => {
              return d == e.tianranqileixing_name
            }), 'yunxiaoliang')
          }
        })
        console.log(natgasTypeSum.value, natgasTypeList.value)
      }
    }
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
      sourceListGridOption,
      detailListGridOption,
      detailVxeGrid,
      sourceVxeGrid,
      hbxsgsq,
      hbxsgsqChangeEvent,
      changCZ,
      changYH,
      changzhanChangeEvent,
      tianranqileixingChangeEvent,
      natgasType,
      yonghuChangeEvent,
      clearActive,
      natgasTypeList,
      natgasTypeSum,
      calcYX,
      activeNum,
      sumNum

    }
  }
})

</script>

<style scoped>
.heji {
  font-weight: 600;
  margin-right: 15px;

}

.heji .label {
  margin-right: 8px;
}
</style>
