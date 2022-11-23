<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="大宗物资原材料价格日常维护" content="你确认"
    positive-text="确认" negative-text="取消" style="width:800px;" ref="xmodal">
    <n-spin :show="isLoading">
      <n-form :model="model" ref="formRef" :rules="rules">

        <n-grid x-gap="8" :cols="1">
          <n-grid-item>
            <n-form-item label="大类" path="materialsTypeName">
              <span>{{model.materialsTypeName}}</span>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="项目名称" path="projectName">
              <span>{{model.projectName}}</span>
            </n-form-item>
          </n-grid-item>
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
              <NwDic :disabled="dataModelDisabled" dictCode="current_progress" placeholder="请选择当前进展"
                v-model:value="model.currentProgressCode" v-model:label="model.currentProgressName">
              </NwDic>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="方案提交时间（一体化平台）" path="onePlatformSubmitTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.onePlatformSubmitTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="方案审批完成时间（一体化平台）" path="onePlatformFinishTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.onePlatformFinishTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="方案提交时间（招标管理平台）" path="inviteBidsSubmitTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.inviteBidsSubmitTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>

          <n-grid-item>
            <n-form-item label="方案审批完成时间（招标管理平台）" path="inviteBidsFinishTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.inviteBidsFinishTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="招标文件确认时间" path="inviteBidsConfirmTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.inviteBidsConfirmTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="招标公告时间" path="inviteBidsPublicTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.inviteBidsPublicTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="开标时间" path="tenderOpenTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.tenderOpenTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="招标结果公示时间" path="inviteBidsResultPublicTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.inviteBidsResultPublicTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="招标结果完成审批时间" path="resultFinishTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.resultFinishTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="评审报告提交时间（一体化平台）" path="assessSubmitTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.assessSubmitTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="评审报告审批完成时间（一体化平台）" path="assessFinishTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.assessFinishTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="结果公告时间" path="resultPublicTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.resultPublicTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="目录上载时间" path="catalogUploadTime">
              <n-date-picker style="width: 100%;" v-model:formatted-value="model.catalogUploadTime"
                value-format="yyyy-MM-dd" type="date" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="产品构成">
              <vxe-grid ref="detailVxeGrid" v-bind="detailListGridOption" style="width: 100%;">
                <template #expenditurePattern_default="{ row, column }">
                  <span>{{row.expenditurePattern}}</span>
                </template>
                <template #expenditurePattern_edit="{ row, column }">
                  <n-input-number placeholder="请输入大宗商品价格" v-model:value="row.expenditurePattern">
                  </n-input-number>
                </template>
              </vxe-grid>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="备注" path="explanation2">
              <n-input placeholder="请输入备注" v-model:value="model.explanation2"></n-input>
            </n-form-item>
          </n-grid-item>

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
  <EmployeePickModal ref="employeePickRef" @update:callback="getUsers" :multiple="true"></EmployeePickModal>
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
  NDatePicker,
  NInputGroup
} from 'naive-ui'
import { creatApp, editApp, suppCommodityItemList, details, getNewest } from '../api/index.js'
import { NwIcon, NwDic, NwIconPick, MenuPick, NwPickPage, Db, EmployeePickModal } from '@platform/main';
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
    EmployeePickModal,
    NInputGroup
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
    const dzsply = ref([])
    const employeePickRef = ref(null);
    const sonFn = (e = {}) => {
      showModalRef.value = true
      if (e.id) {
        details(e.id).then(res => {
          if (res.purchaseProductMixList.length > 0) {
            dzsply.value = res.purchaseProductMixList
            nextTick(() => {
              detailVxeGrid.value.reloadData(dzsply.value)
            })
          }
          if (res.purchaseProductMixList.length > 0) {
            modelRef.value = { ...modelRef.value, ...res.purchaseProgressDetailList[0] }
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
    onMounted(() => {
      getNewest({}).then(res => {
        console.log(res, '11111111111')
        if (res) {
          dzsply.value = res.detailList.map(d => {
            return {
              ...d,
              productMix3: d.commodityItemName,
              expenditurePattern: d.commodityItemPrice,
            }
          })
        }
      })
    })
    const rules = ref({
      commodityItemName: {
        required: true,
        trigger: ['focus', 'input'],
        message: '请选择大宗商品名称'
      },
      expenditurePattern: {
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
      employeePickRef,
      selectUser,
      getUsers,
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