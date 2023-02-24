<script lang="ts" setup>
import {
  NForm,
  NInput,
  NFormItem,
  NDivider,
  NSwitch,
  NText,
  NInputNumber,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NSteps,
  NStep,
  NDatePicker,
  NInputGroup,
  NButton,
  FormInst,
  NGrid,
  NGridItem,
  NSpace,
} from "naive-ui";
import { ref, reactive, nextTick, watch } from "vue";
import {
  FormModal,
  current,
  basicDisabled,
  dateModelDisabled,
  dzsply,
} from "./App";
import { VxeGridProps } from "vxe-table";
import {
  NwIcon,
  NwDic,
  NwIconPick,
  MenuPick,
  NwPickPage,
  Db,
  ChooseDept,
  EmployeePickModal,
} from "@platform/main";
import materialsPick from "./materialsPick/index.vue";
import {
  creatApp,
  editApp,
  suppCommodityItemList,
  details,
  getNewest,
} from "../api/index.js";

import { FormPermissionEnum } from "../common/constant/FormPermissionEnum";
const { formRef, dataModel, rules, dataPermits } = new FormModal();
const materialsPickRef = ref();
const showModalRef = ref(false);
const employeePickRef = ref();
const detailVxeGrid = ref();
const getUsers = (user: Array<any>) => {
  dataModel.value.projectLeader = user.map((d: any) => d.userNameCh).join(",");
  dataModel.value.projectLeaderId = user.map((d: any) => d.id).join(",");
};
/*const dzsplyChangeEvent = (v: any) => {
  modelRef.value.valuecommodityItemName = dzsply.value.filter(
    (d) => d.value == v
  )[0].label;
  modelRef.value.commodityItemUnit = dzsply.value.filter(
    (d) => d.value == v
  )[0].commodityItemUnit;
  modelRef.value.sn = dzsply.value.filter((d) => d.value == v)[0].sn;
}; */
const selectUser = () => {
  let user = <Array<any>>[];
  if (dataModel.value.projectLeader) {
    let userNameChs = dataModel.value.projectLeader.split(",");
    let userNames = dataModel.value.projectLeader.split(",");
    let userIds = dataModel.value.projectLeaderId.split(",");
    for (let index = 0; index < userNameChs.length; index++) {
      user.push({
        userNameCh: userNameChs[index],
        userName: userNames[index],
        id: userIds[index],
      });
    }
    employeePickRef.value?.sonFn(user);
  } else {
    employeePickRef.value?.sonFn(user);
  }
};
const selectMaterials = () => {
  materialsPickRef.value.show(dzsply.value);
};
const setMaterials = (materials: Array<any>) => {
  dzsply.value = materials;
  nextTick(() => {
    detailVxeGrid.value?.reloadData(dzsply.value);
  });
};
const detailListGridOption = reactive<VxeGridProps>({
  rowId: "rowId",
  rowKey: false,
  keepSource: false,
  height: "300px",
  size: "mini",
  showOverflow: false,
  highlightHoverRow: true,
  border: true,
  data: dzsply.value,
  editConfig: {
    trigger: "click",
    mode: "cell",
    showStatus: true,
    autoClear: false,
  },
  columns: [
    {
      title: "产品构成",
      field: "productMix3",
      showOverflow: "title",
      minWidth: 200,
    },
    {
      title: "费用构成",
      field: "expenditurePattern",
      showOverflow: "title",
      minWidth: 200,
      editRender: {},
      slots: {
        default: "expenditurePattern_default",
        edit: "expenditurePattern_edit",
      },
    },
  ],
});
watch(
  () => current.value,
  (d: number) => {
    console.log(d);
    nextTick(() => {
      console.log(
        detailVxeGrid.value,
        "detailVxeGrid.valuedetailVxeGrid.valuedetailVxeGrid.value"
      );
      detailVxeGrid.value?.reloadData(dzsply.value);
    });
  }
);
</script>
<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 24px;">
      <n-steps vertical v-model:current="current">
        <n-step title="基本信息" description="填写基本信息" />
        <n-step title="公告信息" description="填写公告信息" />
        <n-step title="相关时间" description="填写相关时间信息" />
      </n-steps>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px; height: 100vh;">
      <n-form
        ref="formRef"
        :model="dataModel"
        :rules="rules"
        size="medium"
        require-mark-placement="right-hanging"
        style="padding: 20px 30px"
      >
        <div x-gap="8" :cols="1" v-if="current == 1">
          <n-form-item
            label="年份"
            path="itemTime"
            v-if="dataPermits.itemTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              style="width: 100%"
              :disabled="basicDisabled"
              v-model:formatted-value="dataModel.itemTime"
              value-format="yyyy"
              type="year"
            />
          </n-form-item>
          <n-form-item
            label="大类"
            path="materialsTypeName"
            v-if="dataPermits.materialsTypeName !== FormPermissionEnum.HIDE"
          >
            <NwDic
              :disabled="basicDisabled"
              multiple
              dictCode="materials_type"
              placeholder="请选择大类"
              :value="dataModel.materialsTypeCode?.split(',')"
              v-model:valueText="dataModel.materialsTypeCode"
              v-model:labelText="dataModel.materialsTypeName"
            >
            </NwDic>
          </n-form-item>
          <n-form-item
            label="项目名称"
            path="projectName"
            v-if="dataPermits.projectName !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="项目名称"
              v-model:value="dataModel.projectName"
              :disabled="basicDisabled"
            />
          </n-form-item>
          <n-form-item
            label="要求完成时间"
            path="finishTime"
            v-if="dataPermits.finishTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              style="width: 100%"
              :disabled="basicDisabled"
              v-model:formatted-value="dataModel.finishTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="组长单位"
            path="unitName"
            v-if="dataPermits.unitName !== FormPermissionEnum.HIDE"
          >
            <ChooseDept
              :isShowSearch="true"
              :disabled="basicDisabled"
              :orgUserName="dataModel.unitName"
              :value="dataModel.unitId"
              @update:callback="
                (e: any) => {
                  dataModel.unitId = e.map((d: any) => d.id).join(',');
                  dataModel.unitName = e.map((d: any) => d.orgName).join(',');
                }
              "
            ></ChooseDept>
          </n-form-item>
          <n-form-item
            label="采购方式"
            path="procurementMethodName"
            v-if="dataPermits.procurementMethodName !== FormPermissionEnum.HIDE"
          >
            <NwDic
              :disabled="basicDisabled"
              multiple
              dictCode="procurement_method"
              placeholder="请选择采购方式"
              :value="dataModel.procurementMethodCode?.split(',')"
              v-model:valueText="dataModel.procurementMethodCode"
              v-model:labelText="dataModel.procurementMethodName"
            >
            </NwDic>
          </n-form-item>
          <n-form-item
            label="浮动范围(%)"
            path="floatRange"
            v-if="dataPermits.floatRange !== FormPermissionEnum.HIDE"
          >
            <n-input-number
              placeholder="浮动范围"
              v-model:value="dataModel.floatRange"
              :disabled="basicDisabled"
            />
          </n-form-item>
          <n-form-item
            label="调价机制"
            path="pricingMechanism"
            v-if="dataPermits.pricingMechanism !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="调价机制"
              v-model:value="dataModel.pricingMechanism"
              :disabled="basicDisabled"
            />
          </n-form-item>
        </div>
        <div x-gap="8" :cols="1" v-if="current == 2">
          <n-form-item
            label="结果公告"
            path="resultPublic"
            v-if="dataPermits.resultPublic !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="结果公告"
              v-model:value="dataModel.resultPublic"
              :disabled="basicDisabled"
            />
          </n-form-item>
          <n-form-item
            label="价格调整公示"
            path="priceAdjustment"
            v-if="dataPermits.priceAdjustment !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="价格调整公示"
              v-model:value="dataModel.priceAdjustment"
              :disabled="basicDisabled"
            />
          </n-form-item>
          <n-form-item
            label="延期公告"
            path="postponePublic"
            v-if="dataPermits.postponePublic !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="延期公告"
              v-model:value="dataModel.postponePublic"
              :disabled="basicDisabled"
            />
          </n-form-item>
          <n-form-item
            label="其他事项"
            path="others"
            v-if="dataPermits.others !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="其他事项"
              v-model:value="dataModel.others"
              :disabled="basicDisabled"
            />
          </n-form-item>
        </div>
        <div x-gap="8" :cols="1" v-if="current == 3">
          <n-form-item
            label="项目负责人"
            path="projectLeader"
            v-if="dataPermits.projectLeader !== FormPermissionEnum.HIDE"
            ><n-input-group @click="selectUser">
              <n-input
                v-model:value="dataModel.projectLeader"
                class="selectedInput"
                disabled
              />
              <n-button ghost>
                <NwIcon
                  name="icon-n-n-add"
                  :disabled="dateModelDisabled"
                  size="15"
                  style="color: #828282; cursor: pointer"
                />
              </n-button>
            </n-input-group>
          </n-form-item>
          <n-form-item
            label="当前进展"
            path="currentProgressName"
            v-if="dataPermits.currentProgressName !== FormPermissionEnum.HIDE"
          >
            <NwDic
              :disabled="dateModelDisabled"
              dictCode="current_progress"
              placeholder="请选择当前进展"
              v-model:value="dataModel.currentProgressCode"
              v-model:label="dataModel.currentProgressName"
            >
            </NwDic>
          </n-form-item>
          <n-form-item
            label="方案提交时间（一体化平台）"
            path="onePlatformSubmitTime"
            v-if="dataPermits.onePlatformSubmitTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.onePlatformSubmitTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="方案审批完成时间（一体化平台）"
            path="onePlatformFinishTime"
            v-if="dataPermits.onePlatformFinishTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.onePlatformFinishTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="方案提交时间（招标管理平台）"
            path="inviteBidsSubmitTime"
            v-if="dataPermits.inviteBidsSubmitTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.inviteBidsSubmitTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="方案审批完成时间（招标管理平台）"
            path="inviteBidsFinishTime"
            v-if="dataPermits.inviteBidsFinishTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.inviteBidsFinishTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="招标文件确认时间"
            path="inviteBidsConfirmTime"
            v-if="dataPermits.inviteBidsConfirmTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.inviteBidsConfirmTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="招标公告时间"
            path="inviteBidsPublicTime"
            v-if="dataPermits.inviteBidsPublicTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.inviteBidsPublicTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="开标时间"
            path="tenderOpenTime"
            v-if="dataPermits.tenderOpenTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.tenderOpenTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="招标结果公示时间"
            path="inviteBidsResultPublicTime"
            v-if="
              dataPermits.inviteBidsResultPublicTime !== FormPermissionEnum.HIDE
            "
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.inviteBidsResultPublicTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="招标结果完成审批时间"
            path="resultFinishTime"
            v-if="dataPermits.resultFinishTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.resultFinishTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="评审报告提交时间（一体化平台）"
            path="assessSubmitTime"
            v-if="dataPermits.assessSubmitTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.assessSubmitTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="评审报告审批完成时间（一体化平台）"
            path="assessFinishTime"
            v-if="dataPermits.assessFinishTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.assessFinishTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="结果公告时间"
            path="resultPublicTime"
            v-if="dataPermits.resultPublicTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.resultPublicTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item
            label="目录上载时间"
            path="catalogUploadTime"
            v-if="dataPermits.catalogUploadTime !== FormPermissionEnum.HIDE"
          >
            <n-date-picker
              :disabled="dateModelDisabled"
              style="width: 100%"
              v-model:formatted-value="dataModel.catalogUploadTime"
              value-format="yyyy-MM-dd"
              type="date"
            />
          </n-form-item>
          <n-form-item label="产品构成">
            <NwIcon
              :disabled="dateModelDisabled"
              name="icon-n-n-add"
              @click="selectMaterials"
              size="15"
              style="
                color: #828282;
                cursor: pointer;
                position: absolute;
                top: -25px;
                left: 62px;
                z-index: 99;
              "
            />
            <vxe-grid
              ref="detailVxeGrid"
              v-bind="detailListGridOption"
              style="width: 100%"
            >
              <template #expenditurePattern_default="{ row, column }">
                <span>{{ row.expenditurePattern }}</span>
              </template>
              <template #expenditurePattern_edit="{ row, column }">
                <n-input-number
                  :disabled="dateModelDisabled"
                  placeholder="请输入大宗商品价格"
                  v-model:value="row.expenditurePattern"
                >
                </n-input-number>
              </template>
            </vxe-grid>
          </n-form-item>

          <n-form-item
            label="备注"
            path="explanation"
            v-if="dataPermits.explanation !== FormPermissionEnum.HIDE"
          >
            <n-input
              placeholder="备注"
              v-model:value="dataModel.explanation"
              :disabled="dateModelDisabled"
            />
          </n-form-item>
        </div>
      </n-form>
    </n-layout-content>
  </n-layout>
  <EmployeePickModal
    ref="employeePickRef"
    @update:callback="getUsers"
    :multiple="true"
  ></EmployeePickModal>
  <materialsPick
    ref="materialsPickRef"
    @callback="setMaterials"
  ></materialsPick>

  <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>
