<script lang="ts" setup>
import { NForm, NInput, NFormItem, NCard,NDivider, NSwitch, NText, NInputNumber,NGradientText,NSelect, NGrid, NFormItemGi, NDatePicker } from "naive-ui";
import { FormModal ,initDialog,} from "./App";
import { FormPermissionEnum } from "../../lib/constant/FormPermissionEnum";
import { timestampToDate } from "../../lib/util/date";
import { NwIcon, NwDic } from '@platform/main';

const { formRef, dataModel, rules, dataPermits ,educationOptions,outerDisciplineOptions} = new FormModal();
</script>
<template>
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding:20px 30px">
        <n-card title="基本信息">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="合同名称:">
            <n-gradient-text type="info">{{ dataModel.contractname }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="9" label="合同编号:">
            <n-gradient-text type="info">{{ dataModel.contractcode }}</n-gradient-text>
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="采购合同ID:" path="contractId" v-if="dataPermits.contractId !== FormPermissionEnum.HIDE"  style="display:none">
            <n-input  v-model:value="dataModel.contractId" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="甲方:" path="partaname" v-if="dataPermits.partaname !== FormPermissionEnum.HIDE"  style="display:none">
            <n-input  v-model:value="dataModel.partaname" />
        </n-form-item-gi>
        </n-grid>
      </n-card>
      <n-card title="发票信息">
        <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="税率:" path="taxrate">
        <NwDic
          dictCode="rate"
          v-model:value="dataModel.taxrate"
          v-model:label="dataModel.taxrateName"
        ></NwDic>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="发票类型:" path="invoiceType">
        <NwDic
          dictCode="invoice_type"
          v-model:value="dataModel.invoiceType"
          v-model:label="dataModel.invoiceTypeName"
        ></NwDic>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="申请日期" path="applyTime" v-if="dataPermits.applyTime !== FormPermissionEnum.HIDE" style="display:none">
                <n-date-picker v-model:formatted-value="dataModel.applyTime" type="date" clearable
                    value-format="yyyy-MM-dd HH:mm:ss" :disabled="dataPermits.applyTime === FormPermissionEnum.READONLY"
                    placeholder="请选择日期" />
        </n-form-item-gi>
        </n-grid>
      </n-card>
        <n-card title="工时信息">
            <n-grid :cols="24" :x-gap="24">
              <n-form-item-gi :span="8" label="工时时薪:" path="workHourAmount" v-if="dataPermits.workHourAmount !== FormPermissionEnum.HIDE">
                <nw-dic  :selectOptions="{ 'consistent-menu-width': false }"  dictCode="hourlyWage"  v-model:value="dataModel.workHourAmount"  v-model:label="dataModel.workHourAmountCode"   size="small" placeholder="请选择工时时薪"/>
            <!-- <n-input-number v-model:value="dataModel.workHourAmount" /> -->
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="加班时薪:" path="overtimeHourAmount" v-if="dataPermits.overtimeHourAmount !== FormPermissionEnum.HIDE">
            <n-input-number v-model:value="dataModel.overtimeHourAmount" />
        </n-form-item-gi>
        <n-form-item-gi :span="8"></n-form-item-gi>
        <n-form-item-gi :span="8" label="工作日加班倍数:" path="workdayOvertimeCoefficient" v-if="dataPermits.workdayOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number  v-model:value="dataModel.workdayOvertimeCoefficient" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="休息日加班倍数:" path="dayOffOvertimeCoefficient" v-if="dataPermits.dayOffOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number v-model:value="dataModel.dayOffOvertimeCoefficient" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="法定休假日加班倍数:" path="legalDayOffOvertimeCoefficient" v-if="dataPermits.legalDayOffOvertimeCoefficient !== FormPermissionEnum.HIDE">
            <n-input-number v-model:value="dataModel.legalDayOffOvertimeCoefficient" />
        </n-form-item-gi>
        
    </n-grid>
    </n-card>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
</template>




