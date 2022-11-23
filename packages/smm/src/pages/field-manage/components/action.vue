<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="大宗物资原材料价格公示内容调整" content="你确认"
    positive-text="确认" negative-text="取消" style="width:100%;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
          <n-steps vertical v-model:current="current">
            <n-step title="基本信息" description="填写基本信息" />
            <n-step title="公告信息" description="填写公告信息" />
            <n-step title="相关时间" description="填写相关时间信息" />
          </n-steps>
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          <n-form :model="model" ref="formRef" label-placement="left" :label-width="260"
            style="height: 800px;overflow: auto;" :rules="rules">
            <n-grid x-gap="8" :cols="1" v-if="current == 1">
              <n-grid-item>
                <n-form-item label="年份" path="itemTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.item_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="大类" path="materialsTypeName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.materials_type_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="项目名称" path="projectName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.project_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="要求完成时间" path="finishTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.finish_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="组长单位" path="unitName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.unit_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="采购方式" path="procurementMethodName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.procurement_method_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="浮动范围(%)" path="floatRange">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.float_range" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="调价机制" path="pricingMechanism">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.pricing_mechanism" />
                </n-form-item>
              </n-grid-item>
            </n-grid>
            <n-grid x-gap="8" :cols="1" v-if="current == 2">
              <n-grid-item>
                <n-form-item label="结果公告" path="resultPublic">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.result_public" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="价格调整公告" path="explanation">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.explanation" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="延期公告" path="postponePublic">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.postpone_public" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="其他事项" path="others">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.others" />
                </n-form-item>
              </n-grid-item>
            </n-grid>
            <n-grid x-gap="8" :cols="1" v-if="current == 3">
              <n-grid-item>
                <n-form-item label="项目负责人" path="projectName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.project_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="当前进展" path="currentProgressName">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.current_progress_name" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案提交时间（一体化平台）" path="onePlatformSubmitTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.one_platform_submit_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案审批完成时间（一体化平台）" path="onePlatformFinishTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.one_platform_finish_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案提交时间（招标管理平台）" path="inviteBidsSubmitTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.invite_bids_submit_time" />
                </n-form-item>
              </n-grid-item>

              <n-grid-item>
                <n-form-item label="方案审批完成时间（招标管理平台）" path="inviteBidsFinishTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.invite_bids_finish_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标文件确认时间" path="inviteBidsConfirmTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.invite_bids_confirm_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标公告时间" path="inviteBidsPublicTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.invite_bids_public_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="开标时间" path="tenderOpenTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.tender_open_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标结果公示时间" path="inviteBidsResultPublicTime">
                  <n-switch :checked-value="1" :unchecked-value="0"
                    v-model:value="model.invite_bids_result_public_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标结果完成审批时间" path="resultFinishTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.result_finish_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="评审报告提交时间（一体化平台）" path="assessSubmitTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.assess_submit_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="评审报告审批完成时间（一体化平台）" path="assessFinishTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.assess_finish_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="结果公告时间" path="resultPublicTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.result_public_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="目录上载时间" path="catalogUploadTime">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.catalog_upload_time" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="备注" path="explanation2">
                  <n-switch :checked-value="1" :unchecked-value="0" v-model:value="model.explanation2" />
                </n-form-item>
              </n-grid-item>
            </n-grid>
          </n-form>
        </n-layout-content>
      </n-layout>

    </n-spin>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default" style="margin-right: 5px" @click="showModal = false">取消</n-button>
        <n-button size="small" type="info" @click="onPositiveClick" :disabled="btloading">保存</n-button>
      </div>
    </template>
  </n-modal>
  <EmployeePickModal ref="employeePickRef" @update:callback="getUsers" :multiple="true"></EmployeePickModal>
  <materialsPick ref="materialsPickRef" @callback="setMaterials"></materialsPick>
</template>
<script lang='jsx'>
import { defineComponent, ref, reactive, onMounted, nextTick, h, watch } from 'vue'
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
  NDatePicker,
  NDrawer,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NSteps,
  NStep,
  NInputGroup
} from 'naive-ui'
import { creatApp, editApp, suppCommodityItemList, query, getNewest } from '../api/index.js'
import materialsPick from './materialsPick/index.vue'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage, Db, ChooseDept, EmployeePickModal } from '@platform/main';
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
    NDatePicker,
    ChooseDept,
    NDrawer,
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NSteps,
    NStep,
    NInputGroup,
    EmployeePickModal,
    materialsPick,
  },
  props: {

  },
  setup(props, context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const formRef = ref()
    const isLoading = ref(false)
    const platformDictCodes = ref([])
    const message = useMessage();
    const current = ref(1)
    const employeePickRef = ref(null);
    const detailVxeGrid = ref()
    const materialsPickRef = ref()
    const basicDisabled = ref(false)
    const selectMaterials = () => {
      materialsPickRef.value.show(dzsply.value)
    }
    const setMaterials = (materials) => {
      dzsply.value = materials
      nextTick(() => {
        detailVxeGrid.value?.reloadData(dzsply.value)
      })
    }
    const originData = ref([])
    const sonFn = (e = {}, n) => {
      query({}).then(res => {
        let m = {}
        res.map(d => {
          m[d.fieldId] = d.isShow
        })
        originData.value = res
        modelRef.value = m
        showModalRef.value = true
        console.log(modelRef.value, 'modelRef.valuemodelRef.valuemodelRef.value')
      })
    }
    const dzsply = ref([])
    const dzsplyChangeEvent = (v) => {
      modelRef.value.valuecommodityItemName = dzsply.value.filter(d => d.value == v)[0].label
      modelRef.value.commodityItemUnit = dzsply.value.filter(d => d.value == v)[0].commodityItemUnit
      modelRef.value.sn = dzsply.value.filter(d => d.value == v)[0].sn
    }
    const selectUser = () => {
      let user = [];
      if (modelRef.value.projectLeader) {
        let userNameChs = modelRef.value.projectLeader.split(",");
        let userNames = modelRef.value.projectLeader.split(",");
        let userIds = modelRef.value.projectLeaderId.split(",");
        for (let index = 0; index < userNameChs.length; index++) {
          user.push({
            userNameCh: userNameChs[index],
            userName: userNames[index],
            id: userIds[index],
          });
        }
        employeePickRef.value.sonFn(user);
      } else {
        employeePickRef.value.sonFn(user);
      }
    };
    const getUsers = (user) => {
      modelRef.value.projectLeader = user.map((d) => d.userNameCh).join(",");
      modelRef.value.projectLeaderId = user.map((d) => d.id).join(",");
    };
    const detailListGridOption = ref({
      rowId: 'rowId',
      rowKey: false,
      keepSource: false,
      height: '300px',
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
          title: '产品构成',
          field: 'productMix3',
          showOverflow: 'title',
          minWidth: 200,

        },
        {
          title: '费用构成',
          field: 'expenditurePattern',
          showOverflow: 'title',
          minWidth: 200,
          editRender: {},
          slots: {
            default: 'expenditurePattern_default',
            edit: 'expenditurePattern_edit'
          }
        },
      ],
    })
    watch(() => current.value, (d) => {
      nextTick(() => {
        detailVxeGrid.value?.reloadData(dzsply.value)
      })
    })
    onMounted(() => {
      // getNewest({}).then(res => {
      //   console.log(res, '11111111111')
      //   if (res) {
      //     dzsply.value = res.detailList.map(d => {
      //       return {
      //         ...d,
      //         productMix3: d.commodityItemName,
      //         expenditurePattern: d.commodityItemPrice,
      //       }
      //     })
      //   }
      // })
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
      current,
      rules,
      sonFn,
      dzsply,
      employeePickRef,
      selectUser,
      getUsers,
      basicDisabled,
      dzsplyChangeEvent,
      detailVxeGrid,
      detailListGridOption,
      materialsPickRef,
      selectMaterials,
      setMaterials,
      getFormMessage(d, n) {
        modelRef.value.formId = n.id
        modelRef.value.formUrl = n.pageUrl
        modelRef.value.formTargetUrl = n.targetUrl
      },
      platformDictCodes,
      onPositiveClick() {
        const fn = editApp
        let data = originData.value.map(d => {
          d.isShow = modelRef.value[d.fieldId]
          return d
        })
        fn(data).then((res) => {
          if (res) {
            context.emit('update:callback');
            showModalRef.value = false
          }
        }).finally(r => {
          isLoading.value = false
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