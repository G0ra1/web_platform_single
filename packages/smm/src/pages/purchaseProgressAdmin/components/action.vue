<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="大宗物资原材料价格日常维护" content="你确认"
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
          <n-form :model="model" ref="formRef" style="height: 800px;overflow: auto;" :rules="rules">
            <n-grid x-gap="8" :cols="1" v-if="current == 1">
              <n-grid-item>
                <n-form-item label="年份" path="itemTime">
                  <n-date-picker style="width: 100%;" :disabled="basicDisabled" v-model:formatted-value="model.itemTime"
                    value-format="yyyy" type="year" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="大类" path="materialsTypeName">
                  <NwDic :disabled="basicDisabled" multiple dictCode="materials_type" placeholder="请选择大类"
                    v-model:value="model.materialsTypeCode" v-model:label="model.materialsTypeName">
                  </NwDic>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="项目名称" path="projectName">
                  <n-input placeholder="请输入项目名称" :disabled="basicDisabled" v-model:value="model.projectName"></n-input>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="要求完成时间" path="finishTime">
                  <n-date-picker style="width: 100%;" :disabled="basicDisabled"
                    v-model:formatted-value="model.finishTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="组长单位" path="unitName">
                  <ChooseDept :isShowSearch="true" :disabled="basicDisabled" :orgUserName="model.unitName"
                    :value="model.unitId" @update:callback="
                      (e) => {
                        model.unitId = e.map(d => d.id).join(',')
                        model.unitName = e.map(d => d.orgName).join(',')
                      }
                    "></ChooseDept>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="采购方式" path="procurementMethodName">
                  <NwDic :disabled="basicDisabled" multiple dictCode="procurement_method" placeholder="请选择采购方式"
                    v-model:value="model.procurementMethodCode" v-model:label="model.procurementMethodName">
                  </NwDic>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="浮动范围(%)" path="floatRange">
                  <n-input-number style="width:100%" :disabled="basicDisabled" placeholder="请输入浮动范围"
                    v-model:value="model.floatRange">
                  </n-input-number>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="调价机制" path="pricingMechanism">
                  <n-input placeholder="请输入调价机制" :disabled="basicDisabled" v-model:value="model.pricingMechanism">
                  </n-input>
                </n-form-item>
              </n-grid-item>
            </n-grid>
            <n-grid x-gap="8" :cols="1" v-if="current == 2">
              <n-grid-item>
                <n-form-item label="结果公告" path="resultPublic">
                  <n-input placeholder="请输入结果公告" v-model:value="model.resultPublic"></n-input>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="价格调整公告" path="explanation">
                  <n-input placeholder="请输入价格调整公告" v-model:value="model.explanation"></n-input>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="延期公告" path="postponePublic">
                  <n-input placeholder="请输入延期公告" v-model:value="model.postponePublic"></n-input>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="其他事项" path="others">
                  <n-input placeholder="请输入其他事项" v-model:value="model.others"></n-input>
                </n-form-item>
              </n-grid-item>
            </n-grid>
            <n-grid x-gap="8" :cols="1" v-if="current == 3">
              <n-grid-item>
                <n-form-item label="项目负责人" path="projectName">
                  <n-input-group @click="selectUser()">
                    <n-input v-model:value="model.projectLeader" class="selectedInput" disabled />
                    <n-button ghost>
                      <NwIcon name="icon-n-n-add" size="15" style="color: #828282; cursor: pointer" />
                    </n-button>
                  </n-input-group>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="当前进展" path="currentProgressName">
                  <NwDic :disabled="dateModelDisabled" dictCode="current_progress" placeholder="请选择当前进展"
                    v-model:value="model.currentProgressCode" v-model:label="model.currentProgressName">
                  </NwDic>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案提交时间（一体化平台）" path="onePlatformSubmitTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.onePlatformSubmitTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案审批完成时间（一体化平台）" path="onePlatformFinishTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.onePlatformFinishTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="方案提交时间（招标管理平台）" path="inviteBidsSubmitTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.inviteBidsSubmitTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>

              <n-grid-item>
                <n-form-item label="方案审批完成时间（招标管理平台）" path="inviteBidsFinishTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.inviteBidsFinishTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标文件确认时间" path="inviteBidsConfirmTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.inviteBidsConfirmTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标公告时间" path="inviteBidsPublicTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.inviteBidsPublicTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="开标时间" path="tenderOpenTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.tenderOpenTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标结果公示时间" path="inviteBidsResultPublicTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.inviteBidsResultPublicTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="招标结果完成审批时间" path="resultFinishTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.resultFinishTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="评审报告提交时间（一体化平台）" path="assessSubmitTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.assessSubmitTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="评审报告审批完成时间（一体化平台）" path="assessFinishTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.assessFinishTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="结果公告时间" path="resultPublicTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.resultPublicTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="目录上载时间" path="catalogUploadTime">
                  <n-date-picker :disabled="dateModelDisabled" style="width: 100%;"
                    v-model:formatted-value="model.catalogUploadTime" value-format="yyyy-MM-dd" type="date" />
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="产品构成">
                  <NwIcon v-if="!dateModelDisabled" name="icon-n-n-add" @click="selectMaterials" size="15"
                    style="color: #828282; cursor: pointer;position: absolute;top: -25px;left: 62px;z-index: 99;" />
                  <vxe-grid ref="detailVxeGrid" v-bind="detailListGridOption" style="width: 100%;">
                    <template #expenditurePattern_default="{ row, column }">
                      <span>{{ row.expenditurePattern }}</span>
                    </template>
                    <template #expenditurePattern_edit="{ row, column }">
                      <n-input-number :disabled="dateModelDisabled" placeholder="请输入大宗商品价格"
                        v-model:value="row.expenditurePattern">
                      </n-input-number>
                    </template>
                  </vxe-grid>
                </n-form-item>
              </n-grid-item>
              <n-grid-item>
                <n-form-item label="备注" path="explanation2">
                  <n-input :disabled="dateModelDisabled" placeholder="请输入备注"
                    v-model:value="model.explanation2"></n-input>
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
import { creatApp, editApp, suppCommodityItemList, details, getNewest } from '../api/index.js'
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
    materialsPick
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
    const dateModelDisabled = ref(true)
    const selectMaterials = () => {
      materialsPickRef.value.show(dzsply.value)
    }
    const setMaterials = (materials) => {
      dzsply.value = materials
      nextTick(() => {
        detailVxeGrid.value?.reloadData(dzsply.value)
      })
    }
    const sonFn = (e = {}, n) => {
      basicDisabled.value = n != 1
      current.value = n
      showModalRef.value = true
      if (e.id) {
        details(e.id).then(res => {
          basicDisabled.value = res.permissionStatus != 1 || !res.permissionStatus
          dateModelDisabled.value = res.permissionStatus != 2
          modelRef.value = {
            ...res,
            materialsTypeCode: res.materialsTypeCode?.split(','),
            materialsTypeName: res.materialsTypeName?.split(','),
            procurementMethodName: res.procurementMethodName?.split(','),
            procurementMethodCode: res.procurementMethodCode?.split(','),
          }
          if (res.purchaseProductMixList.length > 0) {
            dzsply.value = res.purchaseProductMixList
            nextTick(() => {
              detailVxeGrid.value?.reloadData(dzsply.value)
            })
          }
          if (res.purchaseProgressDetailList.length > 0) {
            modelRef.value = { ...res.purchaseProgressDetailList[0], ...modelRef.value, }
          }
          console.log(modelRef.value, 'modelRef.valuemodelRef.valuemodelRef.value')
        })
      }
      Db.get('userInfo').then(res => {
        if (!modelRef.value.deptName) {
          console.log(res, '用户信息')
          modelRef.value.deptName = res.parentDeptName
          modelRef.value.deptNameId = res.parentDeptId
        }
      })
      if (!modelRef.value.itemTime) {
        modelRef.value.itemTime = format(new Date(), "yyyy")
      }
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
      dateModelDisabled,
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
        if (modelRef.value.catalogUploadTime) {

          let b = dzsply.value?.every(d => d.expenditurePattern > 0)
          if (!b) {
            message.warning('清完善费用构成')
            return
          }
        }
        const fn = !modelRef.value.id ? creatApp : editApp
        let data = {
          ...modelRef.value,
          materialsTypeCode: modelRef.value.materialsTypeCode?.join(','),
          materialsTypeName: modelRef.value.materialsTypeName?.join(','),
          procurementMethodName: modelRef.value.procurementMethodName?.join(','),
          procurementMethodCode: modelRef.value.procurementMethodCode?.join(','),
          purchaseProductMixList: dzsply.value,
          purchaseProgressDetailList: [{ ...modelRef.value, id: null }]
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