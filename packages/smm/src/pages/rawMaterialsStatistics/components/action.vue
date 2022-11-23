<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="大宗物资原材料价格日常维护" content="你确认"
    positive-text="确认" negative-text="取消" style="width:800px;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">

        <n-grid x-gap="8" :cols="1">
          <n-grid-item>
            <n-form-item label="填报时间" path="fillTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.fillTime"
                value-format="yyyy-MM-dd HH:mm:ss" type="datetime" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="说明" path="explanation">
              <n-input placeholder="请输入说明" @blur="clearActive" v-model:value="model.explanation">
              </n-input>
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="价格维护录入">
              <vxe-grid ref="detailVxeGrid" v-bind="detailListGridOption" style="width: 100%;
          ">
                <template #commodityItemPrice_default="{ row, column }">
                  <span>{{row.commodityItemPrice}}</span>
                </template>
                <template #commodityItemPrice_edit="{ row, column }">
                  <n-input-number placeholder="请输入大宗商品价格" @blur="clearActive" v-model:value="row.commodityItemPrice">
                  </n-input-number>
                </template>
              </vxe-grid>
            </n-form-item>
          </n-grid-item>
          <!-- <n-grid-item>
            <n-form-item label="大宗商品名称" path="commodityItemName">
              <n-select placeholder="请选择大宗商品名称" v-model:value="model.commodityItemName"
                @update:value="dzsplyChangeEvent" :options="dzsply" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="大宗商品计量单位" path="commodityItemUnit">
              <n-input size="small" disabled placeholder="大宗商品计量单位" v-model:value="model.commodityItemUnit" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="大宗商品价格" path="commodityItemPrice">
              <n-input size="small" placeholder="大宗商品价格" v-model:value="model.commodityItemPrice" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="排序" path="sn">
              <n-input-number size="small" style="width:100%" disabled placeholder="请输入排序" v-model:value="model.sn" />
            </n-form-item>
          </n-grid-item> -->

        </n-grid>
      </n-form>
    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
        <n-button size="small" type="info" @click="onPositiveClick" :disabled="btloading">保存</n-button>
      </div>
    </template>

  </n-modal>
</template>
<script lang='jsx'>
import { defineComponent, ref, reactive, onMounted, nextTick, h } from 'vue'
import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NButton,
  NSpin,
  NTag,
  useMessage,
  NImage,
  NText,
  NP,
  NSwitch,
  NInputNumber,
  NDatePicker
} from 'naive-ui'
import { creatApp, editApp, suppCommodityItemList, details } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage, Db } from '@platform/main';
import { format } from "date-fns";


export default defineComponent({
  components: {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NButton,
    NSpin,
    NTag,
    NImage,
    NText,
    NP,
    NwDic,
    NwIcon,
    NwIconPick,
    MenuPick,
    NwPickPage,
    NSwitch,
    NInputNumber,
    NDatePicker
  },
  props: {

  },
  setup(props, context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const detailVxeGrid = ref()
    const formRef = ref()
    const isLoading = ref(false)
    const platformDictCodes = ref([])
    const message = useMessage();
    const sonFn = (e = {}) => {
      showModalRef.value = true
      if (e.id) {
        details(e.id).then(res => {
          if (res.detailList) {
            dzsply.value = res.detailList
            nextTick(() => {
              detailVxeGrid.value.reloadData(dzsply.value)
            })
          }
        })
      }
      if (e.detailList) {
        dzsply.value = e.detailList
      }
      modelRef.value = e
      Db.get('userInfo').then(res => {
        if (!modelRef.value.deptName) {
          console.log(res, '用户信息')
          modelRef.value.deptName = res.parentDeptName
          modelRef.value.deptNameId = res.parentDeptId
        }
      })
      if (!modelRef.value.fillTime) {
        modelRef.value.fillTime = format(new Date(), "yyyy-MM-dd HH:mm:ss")
      }
      nextTick(() => {
        detailVxeGrid.value.reloadData(dzsply.value)
      })

    }
    const dzsply = ref([])
    const dzsplyChangeEvent = (v) => {
      modelRef.value.valuecommodityItemName = dzsply.value.filter(d => d.value == v)[0].label
      modelRef.value.commodityItemUnit = dzsply.value.filter(d => d.value == v)[0].commodityItemUnit
      modelRef.value.sn = dzsply.value.filter(d => d.value == v)[0].sn
    }

    const detailListGridOption = ref({
      rowId: 'rowId',
      rowKey: false,
      keepSource: false,
      height: '500px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dzsply.value,
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        autoClear: false
      },
      columns: [
        {
          title: '排序',
          field: 'sn',
          minWidth: 100,
        },
        {
          title: ' 材料名',
          field: 'commodityItemName',
          showOverflow: 'title',
          minWidth: 200,

        },
        {
          title: '单位',
          field: 'commodityItemUnit',
          showOverflow: 'title',
          minWidth: 200,

        },
        {
          title: '价格',
          field: 'commodityItemPrice',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'commodityItemPrice_default',
            edit: 'commodityItemPrice_edit'
          }
        },
      ],
    })
    onMounted(() => {
      suppCommodityItemList({}).then(res => {
        console.log(res, '来源++++++++')
        dzsply.value = res.map(d => {
          return {
            commodityItemName: d.commodityItemName,
            commodityItemUnit: d.commodityItemUnit,
            sn: d.sn
          }
        })

      })
    })
    const rules = ref({
      commodityItemName: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请选择大宗商品名称'
      },
      commodityItemPrice: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请输入大宗商品价格'
      },
      sn: {
        required: true,
        trigger: ['focus', 'input'],
        type: 'number',
        message: '请输入排序'
      }
    })
    return {
      showModal: showModalRef,
      message,
      model: modelRef,
      formRef,
      isLoading,
      rules,
      sonFn,
      dzsply,
      dzsplyChangeEvent,
      detailVxeGrid,
      detailListGridOption,
      getFormMessage(d, n) {
        modelRef.value.formId = n.id
        modelRef.value.formUrl = n.pageUrl
        modelRef.value.formTargetUrl = n.targetUrl
      },
      platformDictCodes,
      onPositiveClick() {
        const fn = !modelRef.value.id ? creatApp : editApp
        let data = {
          ...modelRef.value,
          detailList: dzsply.value,
        }
        formRef.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
            fn(data).then((res) => {
              if (res) {
                context.emit('update:callback');
                showModalRef.value = false
              }
            }).finally(r => {
              isLoading.value = false
            })
          }
        })

      },
      onNegativeClick() {

        showModalRef.value = false
      },

    }
  },
  methods: {
  }
})
</script>
<style scoped lang="less">

</style>