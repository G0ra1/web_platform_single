<template>
  <n-form :model="dataModel" :rules="rules" ref="formRef" label-placement="left" :label-width="90" size="small"
    :style="{ padding: '28px 82px' }">
    <n-grid :cols="12" :x-gap="24">
      <n-form-item-gi :span="6" label="仓库类型" path="houseType">
         <NwDic dictCode="asset_warehouse" v-model:value="dataModel.houseType" v-model:label="dataModel.houseTypeName">
        </NwDic>
      </n-form-item-gi>
      <n-form-item-gi :span="6" label="仓库名称" path="warehouseName">
        <n-input placeholder="请输入仓库名称" v-model:value="dataModel.warehouseName" />
      </n-form-item-gi>
      <!-- <n-form-item-gi :span="6" label="仓库编码" path="taskCode">
        <n-input
          placeholder="请输入仓库编码"
          v-model:value="dataModel.taskCode"
        />
      </n-form-item-gi> -->
      <n-form-item-gi :span="6" label="责任主体" path="orgName">
        <!-- <n-input
          placeholder="请输入责任主体"
          v-model:value="dataModel.orgName"
        /> -->
        <span style="color: rgba(29, 124, 237, 1)">{{
            dataModel.orgName
        }}</span>
      </n-form-item-gi>
      <n-form-item-gi :span="6" label="责任部门" path="deptName">
        <!-- <n-input
          placeholder="请输入责任部门"
          v-model:value="dataModel.deptName"
        /> -->
        <span style="color: rgba(29, 124, 237, 1)">{{
            dataModel.deptName
        }}</span>
      </n-form-item-gi>
      <n-form-item-gi :span="6" label="责任人" path="respondUserName">
        <n-input-group @click="selectUser('respondUserName')">
          <n-input v-model:value="dataModel.respondUserName" class="selectedInput" disabled />
          <n-button ghost :disabled="brules['respondUserName'] === 'readonly'">
            <NwIcon name="icon-sousuo1" :size="15" style="color: #828282; cursor: pointer" />
          </n-button>
        </n-input-group>
      </n-form-item-gi>
      <!-- 三级仓库 -->

      <n-form-item-gi :span="12" label="地点" path="address">
        <n-input placeholder="请输入地点" v-model:value="dataModel.address" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="备注" v-if="brules['remark'] !== 'hide'" path="title">
        <n-input :disabled="brules['remark'] === 'readonly'" type="textarea" placeholder="请输入备注"
          v-model:value="dataModel.remark" />
      </n-form-item-gi>
    </n-grid>
    <goodsShelf v-if="dataModel.houseType == '1'" ref="goodsShelfRef" :warehouseName="dataModel.warehouseName">
    </goodsShelf>
  </n-form>
  <employeePick ref="employeePick" @update:callback="getUsers" :multiple="false" :showSide="false"
    :propsOrgId="dataModel.deptId"></employeePick>
</template>
<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import {
  useMessage,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInputGroup,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NInputGroupLabel,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NRate,
  NButton,
} from "naive-ui";
import { dataModel, brules, rules, goodsShelfRef } from "./store.js";
import employeePick from "../../components/employeePick/index.vue";
import goodsShelf from "../../pages/warehouse-manage/goodsShelf.vue";
import { NwIcon, NwDic } from '@platform/main'
export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInputGroup,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NInputGroupLabel,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NRate,
    employeePick,
    NwIcon,
    NButton,
    goodsShelf,
    NwDic
  },
  setup() {
    const formRef = ref(null);
    const pOptions = ref([]);

    const employeePick = ref(null);
    const selectUser = (type) => {
      employeePick.value.sonFn();
    };
    const getUsers = ([user = {}]) => {
      console.log(user, "useruseruseruseruser");
      dataModel.value.respondUserId = user.id || "";
      dataModel.value.respondUserName = user.userNameCh || "";
    };

    watch(dataModel, (d) => { });
    onMounted(() => {
      console.log(dataModel);
    });
    return {
      dataModel,
      brules,
      rules,
      pOptions,
      formRef,
      rules: {},
      employeePick,
      selectUser,
      getUsers,
      goodsShelfRef,
    };
  },
});
</script>
<style>
.selectedInput.n-input.n-input--disabled .n-input__input-el {
  cursor: pointer;
}
</style>
